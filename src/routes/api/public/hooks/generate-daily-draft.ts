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

export const Route = createFileRoute("/api/public/hooks/generate-daily-draft")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauth = checkAuth(request);
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