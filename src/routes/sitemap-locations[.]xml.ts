import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CONTENT_UPDATED, sitemapXml } from "@/lib/seo/sitemap";
import { CITIES } from "@/lib/seo/cities";
import { PROVINCES } from "@/lib/seo/provinces";

const lastmod = CONTENT_UPDATED.locations;

export const Route = createFileRoute("/sitemap-locations.xml")({
  server: {
    handlers: {
      GET: async () =>
        sitemapXml([
          { path: "/locations", changefreq: "monthly", priority: "0.8", lastmod },
          ...PROVINCES.map((p) => ({
            path: `/locations/province/${p.slug}`,
            changefreq: "monthly",
            priority: "0.8",
            lastmod,
          })),
          ...CITIES.map((c) => ({
            path: `/locations/${c.slug}`,
            changefreq: "monthly",
            priority: "0.7",
            lastmod,
          })),
        ]),
    },
  },
});
