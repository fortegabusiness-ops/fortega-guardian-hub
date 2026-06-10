import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "node:crypto";

function checkAuth(request: Request): Response | null {
  const secret = process.env.CRON_SECRET;
  if (!secret) return new Response("Server misconfigured", { status: 500 });
  const header = request.headers.get("authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : header;
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return new Response("Unauthorized", { status: 401 });
  }
  return null;
}

export const Route = createFileRoute("/api/public/hooks/auto-publish-stale")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauth = checkAuth(request);
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
          return Response.json({ ok: true, published: data?.length ?? 0, ids: data });
        } catch (e: any) {
          console.error("[auto-publish-stale]", e);
          return Response.json({ ok: false, error: e?.message ?? "error" }, { status: 500 });
        }
      },
    },
  },
});