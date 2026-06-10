import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://fortega.ca";

export const Route = createFileRoute("/.well-known/mcp/server-card.json")({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          $schema: "https://modelcontextprotocol.io/schemas/server-card/v1",
          serverInfo: {
            name: "Fortega Site",
            version: "1.0.0",
            description:
              "Fortega — integrated security solutions (CCTV, access control, monitoring, cyber security) across Canada.",
            vendor: "Fortega",
            homepage: BASE,
          },
          transport: {
            type: "http",
            endpoint: `${BASE}/api/mcp`,
          },
          capabilities: {
            tools: { listChanged: false },
            resources: { listChanged: false },
          },
        };
        return new Response(JSON.stringify(body, null, 2), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});