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
          const now = new Date().toISOString();
          const { data, error } = await supabaseAdmin
            .from("blog_posts")
            .update({ status: "published", published_at: now })
            .eq("status", "draft")
            .is("reviewed_at", null)
            .lte("auto_publish_at", now)
            .select("id,slug");
          if (error) throw error;
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
          return Response.json({ ok: true, published: data?.length ?? 0, ids: data });
        } catch (e: any) {
          console.error("[auto-publish-stale]", e);
          return Response.json({ ok: false, error: e?.message ?? "error" }, { status: 500 });
        }
      },
    },
  },
});