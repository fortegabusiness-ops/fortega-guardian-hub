import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CONTENT_UPDATED, sitemapXml } from "@/lib/seo/sitemap";
import { SERVICES } from "@/lib/seo/services";

const lastmod = CONTENT_UPDATED.services;

export const Route = createFileRoute("/sitemap-services.xml")({
  server: {
    handlers: {
      GET: async () =>
        sitemapXml([
          { path: "/services", changefreq: "monthly", priority: "0.9", lastmod },
          ...SERVICES.map((s) => ({
            path: `/services/${s.slug}`,
            changefreq: "monthly",
            priority: "0.8",
            lastmod,
          })),
        ]),
    },
  },
});
