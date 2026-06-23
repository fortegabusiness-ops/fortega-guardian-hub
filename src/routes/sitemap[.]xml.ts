import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CITIES } from "@/lib/seo/cities";
import { INDUSTRIES } from "@/lib/seo/industries";
import { SERVICES } from "@/lib/seo/services";

const BASE_URL = "https://fortega.ca";

interface SitemapEntry { path: string; changefreq?: string; priority?: string; lastmod?: string; }

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        let blogPosts: { slug: string; lastmod: string }[] = [];
        try {
          const { data } = await supabaseAdmin
            .from("blog_posts")
            .select("slug,updated_at,published_at")
            .eq("status", "published")
            .order("published_at", { ascending: false });
          blogPosts = (data ?? []).map((r: any) => ({
            slug: r.slug,
            lastmod: new Date(r.updated_at ?? r.published_at ?? Date.now()).toISOString(),
          }));
        } catch (e) {
          console.error("[sitemap] blog query failed", e);
        }

        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          { path: "/locations", changefreq: "monthly", priority: "0.8" },
          { path: "/blog", changefreq: "daily", priority: "0.9" },
          { path: "/industries", changefreq: "monthly", priority: "0.8" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          ...INDUSTRIES.map((i) => ({
            path: `/industries/${i.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
          ...SERVICES.map((s) => ({
            path: `/services/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
          ...blogPosts.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
            lastmod: p.lastmod,
          })),
          ...CITIES.map((c) => ({
            path: `/locations/${c.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});