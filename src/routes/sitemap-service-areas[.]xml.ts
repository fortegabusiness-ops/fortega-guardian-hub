import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CONTENT_UPDATED, sitemapXml } from "@/lib/seo/sitemap";
import { SERVICE_AREAS } from "@/lib/seo/service-areas";

const lastmod = CONTENT_UPDATED.serviceAreas;

export const Route = createFileRoute("/sitemap-service-areas.xml")({
  server: {
    handlers: {
      GET: async () =>
        sitemapXml(
          SERVICE_AREAS.map((a) => ({
            path: `/services/${a.service.slug}/${a.city.slug}`,
            changefreq: "monthly",
            priority: "0.8",
            lastmod,
          })),
        ),
    },
  },
});
