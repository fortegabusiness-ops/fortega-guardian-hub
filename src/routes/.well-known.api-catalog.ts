import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://fortega.ca";

export const Route = createFileRoute("/.well-known/api-catalog")({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          linkset: [
            {
              anchor: `${BASE}/`,
              "service-doc": [{ href: `${BASE}/auth.md`, type: "text/markdown" }],
              "service-desc": [
                { href: `${BASE}/.well-known/agent-skills/index.json`, type: "application/json" },
              ],
              status: [{ href: `${BASE}/`, type: "text/html" }],
              "oauth-protected-resource": [
                { href: `${BASE}/.well-known/oauth-protected-resource`, type: "application/json" },
              ],
            },
          ],
        };
        return new Response(JSON.stringify(body, null, 2), {
          headers: {
            "Content-Type": "application/linkset+json",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});