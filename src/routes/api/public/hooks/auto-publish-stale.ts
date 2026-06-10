import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/hooks/auto-publish-stale")({
  server: {
    handlers: {
      POST: async () => {
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