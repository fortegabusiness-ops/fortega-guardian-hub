import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://fortega.ca";

export const Route = createFileRoute("/.well-known/oauth-protected-resource")({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          resource: BASE,
          authorization_servers: [BASE],
          scopes_supported: ["openid", "profile", "email"],
          bearer_methods_supported: ["header"],
          resource_documentation: `${BASE}/auth.md`,
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