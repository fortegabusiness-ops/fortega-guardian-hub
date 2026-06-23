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

export const Route = createFileRoute("/api/public/hooks/indexnow-submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauth = await checkAuth(request);
        if (unauth) return unauth;
        try {
          const body = await request.json().catch(() => ({}));
          const { submitToIndexNow, blogPostUrls } = await import("@/lib/seo/indexnow.server");

          let urls: string[] = [];

          if (Array.isArray(body?.urls)) {
            urls = body.urls.filter((u: unknown) => typeof u === "string");
          } else if (body?.mode === "sitemap" || body?.all === true) {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
            const { data } = await supabaseAdmin
              .from("blog_posts")
              .select("slug")
              .eq("status", "published")
              .limit(10000);
            const slugs = (data ?? []).map((r: any) => r.slug).filter(Boolean);
            urls = [
              "https://fortega.ca/",
              "https://fortega.ca/blog",
              "https://fortega.ca/services",
              "https://fortega.ca/industries",
              "https://fortega.ca/locations",
              "https://fortega.ca/about",
              "https://fortega.ca/contact",
              ...slugs.flatMap((s: string) => blogPostUrls(s)),
            ];
          }

          await submitToIndexNow(urls);
          return Response.json({ ok: true, submitted: urls.length });
        } catch (e: any) {
          console.error("[indexnow-submit]", e);
          return Response.json({ ok: false, error: e?.message ?? "error" }, { status: 500 });
        }
      },
    },
  },
});