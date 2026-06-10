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

export const Route = createFileRoute("/api/public/hooks/generate-daily-draft")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauth = await checkAuth(request);
        if (unauth) return unauth;
        try {
          const { createAIDraft } = await import("@/lib/blog/posts.functions");
          const result = await createAIDraft();
          return Response.json({ ok: true, ...result });
        } catch (e: any) {
          console.error("[generate-daily-draft]", e);
          return Response.json({ ok: false, error: e?.message ?? "error" }, { status: 500 });
        }
      },
    },
  },
});