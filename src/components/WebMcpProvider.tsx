import { useEffect } from "react";

type ModelContextNavigator = Navigator & {
  modelContext?: {
    provideContext: (ctx: { tools?: unknown[] }) => void;
  };
};

/**
 * Registers WebMCP tools so AI agents using a WebMCP-aware browser can
 * discover and invoke key site actions (contact, navigation).
 * See: https://webmachinelearning.github.io/webmcp/
 */
export function WebMcpProvider() {
  useEffect(() => {
    const nav = navigator as ModelContextNavigator;
    if (!nav.modelContext?.provideContext) return;

    nav.modelContext.provideContext({
      tools: [
        {
          name: "navigate",
          description: "Navigate to a Fortega page (home, about, services, contact).",
          inputSchema: {
            type: "object",
            properties: {
              page: { type: "string", enum: ["home", "about", "services", "contact"] },
            },
            required: ["page"],
          },
          execute: async ({ page }: { page: string }) => {
            const map: Record<string, string> = {
              home: "/",
              about: "/about",
              services: "/services",
              contact: "/contact",
            };
            const path = map[page] ?? "/";
            window.location.assign(path);
            return { ok: true, path };
          },
        },
        {
          name: "open_contact_form",
          description: "Open the Fortega contact form so the user can submit a lead.",
          inputSchema: { type: "object", properties: {} },
          execute: async () => {
            window.location.assign("/contact");
            return { ok: true };
          },
        },
      ],
    });
  }, []);

  return null;
}