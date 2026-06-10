import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/hooks/generate-daily-draft")({
  server: {
    handlers: {
      POST: async () => {
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