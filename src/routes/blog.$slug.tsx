import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getPostBySlug } from "@/lib/blog/posts.functions";
import { renderMarkdown, plainTextFromMarkdown } from "@/lib/blog/markdown";
import {
  articleSchema, breadcrumbSchema, faqSchema, jsonLd, socialMeta, SITE_URL,
  BLOG_AUTHOR_NAME,
} from "@/lib/seo/schema";

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
    const url = `${SITE_URL}/blog/${p.slug}`;
    const title = (p.seo_title || p.title) + " | Fortega";
    const desc = p.seo_description || p.excerpt || plainTextFromMarkdown(p.content_md, 160);
    const heroImg: string | null = p.hero_image_url || null;
    const faqs: { q: string; a: string }[] = Array.isArray(p.faqs)
      ? p.faqs.filter((f: any) => f && f.q && f.a)
      : [];
    const scripts = [
      jsonLd(
        articleSchema({
          title: p.title,
          description: desc,
          slug: p.slug,
          datePublished: p.published_at,
          dateModified: p.updated_at ?? p.published_at,
          image: heroImg,
        }),
      ),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: p.title, path: `/blog/${p.slug}` },
        ]),
      ),
      ...(faqs.length ? [jsonLd(faqSchema(faqs))] : []),
    ];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        ...socialMeta({
          title,
          description: desc,
          url,
          type: "article",
          image: heroImg || undefined,
        }),
        ...(p.published_at ? [{ property: "article:published_time", content: new Date(p.published_at).toISOString() }] : []),
        ...(p.updated_at ? [{ property: "article:modified_time", content: new Date(p.updated_at).toISOString() }] : []),
        { property: "article:author", content: BLOG_AUTHOR_NAME },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
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

  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
      <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">← All posts</Link>

      <header className="mt-4">
        {post.topic && <div className="text-xs font-medium uppercase tracking-wide text-brand">{post.topic}</div>}
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{post.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>By {BLOG_AUTHOR_NAME}</span>
          {post.published_at && (
            <time dateTime={new Date(post.published_at).toISOString()}>
              Published {new Date(post.published_at).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          )}
          {(post as any).updated_at && (post as any).updated_at !== post.published_at && (
            <time dateTime={new Date((post as any).updated_at).toISOString()}>
              Updated {new Date((post as any).updated_at).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          )}
        </div>
        {post.hero_image_url && (
          <img src={post.hero_image_url} alt={post.title} className="mt-6 w-full rounded-xl border border-border" />
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
        <div className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
          Explore related services: {" "}
          <Link to="/services" className="text-brand hover:underline">all security services</Link>
          {" · "}
          <Link to="/services/$service" params={{ service: "cctv" }} className="text-brand hover:underline">CCTV & video surveillance</Link>
          {" · "}
          <Link to="/services/$service" params={{ service: "remote" }} className="text-brand hover:underline">remote guarding & monitoring</Link>
          .
        </div>
      </div>
    </article>
  );
}