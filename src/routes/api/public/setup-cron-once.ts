import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/setup-cron-once")({
  server: {
    handlers: {
      POST: async () => {
        try {
          const secret = process.env.CRON_SECRET;
          if (!secret) return Response.json({ ok: false, error: "no CRON_SECRET" }, { status: 500 });
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data, error } = await supabaseAdmin.rpc("setup_blog_cron", { _secret: secret });
          if (error) throw error;
          return Response.json({ ok: true, result: data });
        } catch (e: any) {
          return Response.json({ ok: false, error: e?.message ?? "error" }, { status: 500 });
        }
      },
    },
  },
});