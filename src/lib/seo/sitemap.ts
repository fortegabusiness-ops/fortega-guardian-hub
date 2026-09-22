export const SITEMAP_BASE_URL = "https://fortega.ca";

export interface SitemapEntry {
  path: string;
  changefreq?: string;
  priority?: string;
  lastmod?: string;
}

/**
 * Content revision dates per sitemap group. Bump the relevant value when the
 * pages in that group are meaningfully rewritten — not on every deploy.
 */
export const CONTENT_UPDATED = {
  core: "2026-02-18",
  services: "2026-02-18",
  locations: "2026-02-18",
  serviceAreas: "2026-02-18",
  resources: "2026-02-18",
  fr: "2026-02-18",
} as const;

export function sitemapXml(entries: SitemapEntry[]): Response {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${SITEMAP_BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
  });
}

export function sitemapIndexXml(children: { path: string; lastmod: string }[]): Response {
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...children.map((c) =>
      [
        `  <sitemap>`,
        `    <loc>${SITEMAP_BASE_URL}${c.path}</loc>`,
        `    <lastmod>${c.lastmod}</lastmod>`,
        `  </sitemap>`,
      ].join("\n"),
    ),
    `</sitemapindex>`,
  ].join("\n");
  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
  });
}
