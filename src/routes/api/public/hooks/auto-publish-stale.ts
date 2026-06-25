import { createFileRoute } from "@tanstack/react-router";

async function checkAuth(request: Request): Promise<Response | null> {
  const header = request.headers.get("authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : header;
  if (!provided) return new Response("Unauthorized", { status: 401 });
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("verify_cron_secret", { _provided: provided });
  if (error) return new Response("Server error", { status: 500 });
  if (!data) return new Response("Unauthorized", { status: 401 });
  return null;
}

export const Route = createFileRoute("/api/public/hooks/auto-publish-stale")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauth = await checkAuth(request);
        if (unauth) return unauth;
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { scanForbiddenClaims, findCannibalization } = await import(
            "@/lib/blog/clean"
          );
          const now = new Date().toISOString();
          // Candidates: drafts whose auto_publish_at has elapsed.
          const { data: candidates, error: candErr } = await supabaseAdmin
            .from("blog_posts")
            .select("id,slug,title,content_md,topic,internal_meta")
            .eq("status", "draft")
            .is("reviewed_at", null)
            .lte("auto_publish_at", now);
          if (candErr) throw candErr;

          // Pre-load already-published posts for the cannibalization gate.
          const { data: publishedRows } = await supabaseAdmin
            .from("blog_posts")
            .select("slug,title,topic")
            .eq("status", "published");
          const published = (publishedRows ?? []).map((p) => ({
            slug: p.slug,
            title: p.title,
            topic: p.topic ?? null,
          }));

          const publishedIds: { id: string; slug: string }[] = [];
          const heldIds: { id: string; slug: string; reason: string }[] = [];

          for (const row of candidates ?? []) {
            const forbidden = scanForbiddenClaims(row.content_md ?? "");
            const cannibal = findCannibalization(
              { slug: row.slug, title: row.title, topic: row.topic ?? null },
              published,
            );
            if (forbidden || cannibal) {
              const reason = forbidden
                ? `forbidden claim: "${forbidden}"`
                : `cannibalizes published slug "${cannibal}"`;
              const prev = (row.internal_meta as any) ?? {};
              await supabaseAdmin
                .from("blog_posts")
                .update({
                  auto_publish_at: null, // stop retry loop; require human review
                  internal_meta: {
                    ...prev,
                    governance: {
                      held_at: now,
                      reason,
                      needs_human_review: true,
                    },
                  } as any,
                })
                .eq("id", row.id);
              heldIds.push({ id: row.id, slug: row.slug, reason });
              continue;
            }
            const { error: pubErr } = await supabaseAdmin
              .from("blog_posts")
              .update({ status: "published", published_at: now })
              .eq("id", row.id);
            if (pubErr) {
              console.error("[auto-publish-stale] publish failed", row.slug, pubErr.message);
              continue;
            }
            publishedIds.push({ id: row.id, slug: row.slug });
          }

          const data = publishedIds;
          try {
            const slugs = (data ?? []).map((r: any) => r.slug).filter(Boolean);
            if (slugs.length) {
              const { submitToIndexNow, blogPostUrls } = await import("@/lib/seo/indexnow.server");
              const urls = Array.from(new Set(slugs.flatMap((s: string) => blogPostUrls(s))));
              await submitToIndexNow(urls);
            }
          } catch (e: any) {
            console.warn("[indexnow] auto-publish ping skipped:", e?.message ?? e);
          }
          return Response.json({
            ok: true,
            published: publishedIds.length,
            ids: publishedIds,
            held: heldIds.length,
            held_items: heldIds,
          });
        } catch (e: any) {
          console.error("[auto-publish-stale]", e);
          return Response.json({ ok: false, error: e?.message ?? "error" }, { status: 500 });
        }
      },
    },
  },
});