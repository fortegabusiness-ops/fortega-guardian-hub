import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CONTENT_UPDATED, sitemapXml } from "@/lib/seo/sitemap";
import { GUIDES } from "@/lib/seo/resources";

const lastmod = CONTENT_UPDATED.resources;

export const Route = createFileRoute("/sitemap-resources.xml")({
  server: {
    handlers: {
      GET: async () =>
        sitemapXml([
          { path: "/resources", changefreq: "weekly", priority: "0.8", lastmod },
          ...GUIDES.map((g) => ({
            path: `/resources/${g.slug}`,
            changefreq: "monthly",
            priority: "0.7",
            lastmod,
          })),
        ]),
    },
  },
});
