import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CONTENT_UPDATED, sitemapXml } from "@/lib/seo/sitemap";
import { INDUSTRIES } from "@/lib/seo/industries";

const lastmod = CONTENT_UPDATED.core;

export const Route = createFileRoute("/sitemap-core.xml")({
  server: {
    handlers: {
      GET: async () =>
        sitemapXml([
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod },
          { path: "/about", changefreq: "monthly", priority: "0.8", lastmod },
          { path: "/contact", changefreq: "monthly", priority: "0.7", lastmod },
          { path: "/industries", changefreq: "monthly", priority: "0.8", lastmod },
          { path: "/privacy", changefreq: "yearly", priority: "0.3", lastmod },
          { path: "/terms", changefreq: "yearly", priority: "0.3", lastmod },
          ...INDUSTRIES.map((i) => ({
            path: `/industries/${i.slug}`,
            changefreq: "monthly",
            priority: "0.7",
            lastmod,
          })),
        ]),
    },
  },
});
