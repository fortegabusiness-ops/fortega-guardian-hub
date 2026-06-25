import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$")({
  server: {
    handlers: {
      GET: async () =>
        new Response(null, {
          status: 301,
          headers: { Location: "https://fortega.ca/", "Cache-Control": "public, max-age=86400" },
        }),
    },
  },
});