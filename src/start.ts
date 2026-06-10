import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

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
  requestMiddleware: [errorMiddleware, agentDiscoveryHeaders],
}));
