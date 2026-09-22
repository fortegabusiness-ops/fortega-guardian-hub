import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CONTENT_UPDATED, sitemapIndexXml } from "@/lib/seo/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        sitemapIndexXml([
          { path: "/sitemap-core.xml", lastmod: CONTENT_UPDATED.core },
          { path: "/sitemap-services.xml", lastmod: CONTENT_UPDATED.services },
          { path: "/sitemap-locations.xml", lastmod: CONTENT_UPDATED.locations },
          { path: "/sitemap-service-areas.xml", lastmod: CONTENT_UPDATED.serviceAreas },
          { path: "/sitemap-resources.xml", lastmod: CONTENT_UPDATED.resources },
          { path: "/sitemap-fr.xml", lastmod: CONTENT_UPDATED.fr },
        ]),
    },
  },
});
