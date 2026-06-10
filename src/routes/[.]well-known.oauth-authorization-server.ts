import { createFileRoute } from "@tanstack/react-router";

const ISSUER = "https://fortega.ca";

export const Route = createFileRoute("/.well-known/oauth-authorization-server")({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          issuer: ISSUER,
          authorization_endpoint: `${ISSUER}/oauth/authorize`,
          token_endpoint: `${ISSUER}/oauth/token`,
          jwks_uri: `${ISSUER}/.well-known/jwks.json`,
          registration_endpoint: `${ISSUER}/oauth/register`,
          grant_types_supported: ["authorization_code", "refresh_token"],
          response_types_supported: ["code"],
          code_challenge_methods_supported: ["S256"],
          token_endpoint_auth_methods_supported: ["none", "client_secret_basic"],
          scopes_supported: ["openid", "profile", "email"],
          agent_auth: {
            register_uri: `${ISSUER}/oauth/register`,
            identity_types_supported: ["agent", "user"],
            credential_types_supported: ["client_secret", "private_key_jwt"],
            claims_uri: `${ISSUER}/.well-known/agent-claims`,
            revocation_uri: `${ISSUER}/oauth/revoke`,
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