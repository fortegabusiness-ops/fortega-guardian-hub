import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://fortega.ca";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc2822(date: string | null): string {
  if (!date) return new Date().toUTCString();
  return new Date(date).toUTCString();
}

export const Route = createFileRoute("/feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: posts, error } = await supabaseAdmin
          .from("blog_posts")
          .select("slug,title,excerpt,hero_image_url,published_at,topic")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(50);

        if (error) {
          console.error("[rss] blog query failed", error);
          return new Response("Error generating feed", { status: 500 });
        }

        const items = (posts ?? []).map((post) => {
          const link = `${BASE_URL}/blog/${post.slug}`;
          const description = escapeXml(post.excerpt || "");
          const category = post.topic ? `<category>${escapeXml(post.topic)}</category>` : "";
          const enclosure = post.hero_image_url
            ? `<enclosure url="${escapeXml(post.hero_image_url)}" type="image/jpeg" />`
            : "";
          return [
            `    <item>`,
            `      <title>${escapeXml(post.title)}</title>`,
            `      <link>${link}</link>`,
            `      <guid isPermaLink="true">${link}</guid>`,
            `      <pubDate>${toRfc2822(post.published_at)}</pubDate>`,
            `      <description>${description}</description>`,
            category,
            enclosure,
            `    </item>`,
          ].join("\n");
        });

        const lastBuildDate = toRfc2822(posts?.[0]?.published_at ?? null);

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
          `  <channel>`,
          `    <title>Fortega — Commercial Security Insights</title>`,
          `    <link>${BASE_URL}/blog</link>`,
          `    <description>Practical security guidance for Canadian businesses, delivered by Fortega.</description>`,
          `    <language>en-CA</language>`,
          `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
          `    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
          ...items,
          `  </channel>`,
          `</rss>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
