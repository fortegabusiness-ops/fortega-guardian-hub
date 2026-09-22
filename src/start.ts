import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
import { isRemovedCity } from "@/lib/seo/cities";

const AGENT_DISCOVERY_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server"',
  '</auth.md>; rel="auth-md"',
].join(", ");

const agentDiscoveryHeaders = createMiddleware().server(async ({ next, request }) => {
  const response = await next();
  const url = new URL(request.url);
  if (url.pathname === "/" && response instanceof Response) {
    try {
      response.headers.append("Link", AGENT_DISCOVERY_LINKS);
    } catch {
      // headers immutable — ignore
    }
  }
  return response;
});

/**
 * Former city pages (pruned service-area coverage) answer 410 Gone so search
 * engines drop the URLs quickly instead of treating them as soft 404s.
 */
const goneMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);
  const segments = url.pathname.split("/").filter(Boolean);
  let citySlug: string | undefined;
  if (segments[0] === "locations" && segments.length === 2 && segments[1] !== "province") {
    citySlug = segments[1];
  } else if (segments[0] === "services" && segments.length === 3) {
    citySlug = segments[2];
  } else if (segments[0] === "fr" && segments[1] === "securite" && segments.length === 3) {
    citySlug = segments[2];
  }
  if (citySlug && isRemovedCity(citySlug)) {
    return new Response(null, { status: 410, statusText: "Gone" });
  }
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/lovable/")) {
    return next();
  }
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [goneMiddleware, errorMiddleware, agentDiscoveryHeaders],
}));
