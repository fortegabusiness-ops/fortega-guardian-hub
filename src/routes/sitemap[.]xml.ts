import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { sitemapIndexXml } from "@/lib/seo/sitemap";
import { SITEMAP_CHILDREN } from "@/lib/seo/sitemap-inventory";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => sitemapIndexXml(SITEMAP_CHILDREN),
    },
  },
});
