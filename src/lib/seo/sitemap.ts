export const SITEMAP_BASE_URL = "https://fortega.ca";

export interface SitemapEntry {
  path: string;
  changefreq?: string;
  priority?: string;
  lastmod?: string;
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  })[character] ?? character);
}

export function sitemapXml(entries: SitemapEntry[]): Response {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${escapeXml(SITEMAP_BASE_URL + e.path)}</loc>`,
      e.lastmod ? `    <lastmod>${escapeXml(e.lastmod)}</lastmod>` : null,
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

export function sitemapIndexXml(children: { path: string; lastmod?: string }[]): Response {
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...children.map((c) =>
      [
        `  <sitemap>`,
        `    <loc>${escapeXml(SITEMAP_BASE_URL + c.path)}</loc>`,
        ...(c.lastmod ? [`    <lastmod>${escapeXml(c.lastmod)}</lastmod>`] : []),
        `  </sitemap>`,
      ].join("\n"),
    ),
    `</sitemapindex>`,
  ].join("\n");
  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
  });
}
