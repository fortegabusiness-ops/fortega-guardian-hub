import { createFileRoute } from "@tanstack/react-router";

const BODY = `# Fortega — Agent Authentication

This site is primarily a public marketing site. The endpoints below are
published so AI agents can discover authentication metadata in a standard way.

## Discovery

- OAuth Authorization Server: \`/.well-known/oauth-authorization-server\`
- OAuth Protected Resource:   \`/.well-known/oauth-protected-resource\`
- API Catalog:                \`/.well-known/api-catalog\`
- Agent Skills Index:         \`/.well-known/agent-skills/index.json\`
- MCP Server Card:            \`/.well-known/mcp/server-card.json\`

## Agent Registration

Dynamic client registration is available at:

    POST https://fortega.ca/oauth/register

Supported identity types: \`agent\`, \`user\`.
Supported credential types: \`client_secret\`, \`private_key_jwt\`.

## Contact

For programmatic access or partner integrations, contact info@fortega.ca.
`;

export const Route = createFileRoute("/auth.md")({
  server: {
    handlers: {
      GET: async () =>
        new Response(BODY, {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});