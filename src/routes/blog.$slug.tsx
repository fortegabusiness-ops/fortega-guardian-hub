import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getPostBySlug } from "@/lib/blog/posts.functions";
import { renderMarkdown, plainTextFromMarkdown } from "@/lib/blog/markdown";
import { jsonLd } from "@/lib/seo/schema";

const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["blog", "post", slug],
    queryFn: () => getPostBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context, params }) => {
    const post = await context.queryClient.ensureQueryData(postQuery(params.slug));
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const p = loaderData as any;
    if (!p) return {};
    const url = `https://fortega.ca/blog/${p.slug}`;
    const title = (p.seo_title || p.title) + " | Fortega";
    const desc = p.seo_description || p.excerpt || plainTextFromMarkdown(p.content_md, 160);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(p.hero_image_url ? [{ property: "og:image", content: p.hero_image_url }] : []),
        { name: "twitter:card", content: p.hero_image_url ? "summary_large_image" : "summary" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 pt-32 text-center">
      <h1 className="text-3xl font-bold text-foreground">Post not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-brand hover:underline">← Back to blog</Link>
    </div>
  ),
});

function BlogPost() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQuery(slug));
  if (!post) return null;

  const url = `https://fortega.ca/blog/${post.slug}`;
  const desc = post.seo_description || post.excerpt || plainTextFromMarkdown(post.content_md, 160);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: desc,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "Fortega" },
    publisher: {
      "@type": "Organization",
      name: "Fortega",
      logo: { "@type": "ImageObject", url: "https://fortega.ca/favicon.ico" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(post.hero_image_url ? { image: post.hero_image_url } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fortega.ca" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://fortega.ca/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">← All posts</Link>

      <header className="mt-4">
        {post.topic && <div className="text-xs font-medium uppercase tracking-wide text-brand">{post.topic}</div>}
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{post.title}</h1>
        {post.published_at && (
          <time className="mt-3 block text-sm text-muted-foreground">
            {new Date(post.published_at).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        )}
        {post.hero_image_url && (
          <img src={post.hero_image_url} alt="" className="mt-6 w-full rounded-xl border border-border" />
        )}
      </header>

      <div className="mt-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content_md) }} />

      <div className="mt-12 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Need help securing your business?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fortega designs, installs, and monitors commercial security systems across Canada.
        </p>
        <Link to="/contact" className="mt-4 inline-flex rounded-md bg-gradient-to-r from-brand to-brand-glow px-4 py-2 text-sm font-semibold text-brand-foreground">
          Request a consultation
        </Link>
      </div>
    </article>
  );
}