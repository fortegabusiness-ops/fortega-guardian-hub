import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "node:crypto";

async function checkAuth(request: Request): Promise<Response | null> {
  const header = request.headers.get("authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : header;
  if (!provided) return new Response("Unauthorized", { status: 401 });
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.schema("private" as any)
    .from("webhook_secrets").select("value").eq("name", "cron").maybeSingle();
  const secret = (data as any)?.value;
  if (error || !secret) return new Response("Server misconfigured", { status: 500 });
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return new Response("Unauthorized", { status: 401 });
  }
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