import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { sitemapXml } from "@/lib/seo/sitemap";
import { SITEMAP_GROUPS } from "@/lib/seo/sitemap-inventory";

export const Route = createFileRoute("/sitemap-services.xml")({
  server: {
    handlers: {
      GET: async () => sitemapXml(SITEMAP_GROUPS["services"]),
    },
  },
});
