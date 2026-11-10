import { createFileRoute } from "@tanstack/react-router";

// MTA-STS policy (RFC 8461) for fortega.ca inbound email.
// Served at https://mta-sts.fortega.ca/.well-known/mta-sts.txt (and on the
// primary domain). The MX hostname must match the live Microsoft 365 MX
// record for fortega.ca. Keep `mode: testing` until TLS-RPT reports confirm
// compatibility; any policy change requires a new _mta-sts TXT record id.
const POLICY = `version: STSv1
mode: testing
mx: fortega-ca.mail.protection.outlook.com
max_age: 86400
`;

export const Route = createFileRoute("/.well-known/mta-sts.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(POLICY, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            // Short cache so policy updates propagate quickly while testing.
            "Cache-Control": "public, max-age=300",
          },
        }),
    },
  },
});
