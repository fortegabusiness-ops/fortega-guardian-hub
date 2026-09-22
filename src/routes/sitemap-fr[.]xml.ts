import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CONTENT_UPDATED, sitemapXml } from "@/lib/seo/sitemap";
import { FR_CITIES } from "@/lib/seo/fr";

const lastmod = CONTENT_UPDATED.fr;

export const Route = createFileRoute("/sitemap-fr.xml")({
  server: {
    handlers: {
      GET: async () =>
        sitemapXml([
          { path: "/fr/securite", changefreq: "monthly", priority: "0.8", lastmod },
          ...FR_CITIES.map((c) => ({
            path: `/fr/securite/${c.slug}`,
            changefreq: "monthly",
            priority: "0.7",
            lastmod,
          })),
        ]),
    },
  },
});
