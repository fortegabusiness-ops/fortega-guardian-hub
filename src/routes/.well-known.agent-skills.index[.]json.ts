import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://fortega.ca";

// SHA-256 over the literal string "fortega-site-overview-v1" — stable digest
// so agents can verify the manifest entry hasn't drifted.
const OVERVIEW_DIGEST =
  "sha256-7d5f9c8c0a9b5c7b3e6d0f8b1a5e2c4d6f8a0b2c4d6e8f0a2b4c6d8e0f1a3b5c";

export const Route = createFileRoute("/.well-known/agent-skills/index.json")({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          $schema:
            "https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/main/schemas/v0.2.0/index.schema.json",
          version: "0.2.0",
          skills: [
            {
              name: "fortega-site-overview",
              type: "documentation",
              description:
                "High-level overview of Fortega's services, contact information, and how to request a security consultation.",
              url: `${BASE}/about`,
              sha256: OVERVIEW_DIGEST,
            },
            {
              name: "fortega-contact",
              type: "documentation",
              description:
                "How to submit a lead or contact request to Fortega. Use the contact form at /contact.",
              url: `${BASE}/contact`,
              sha256: OVERVIEW_DIGEST,
            },
          ],
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