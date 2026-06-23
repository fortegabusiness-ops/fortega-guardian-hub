import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listPublishedPosts } from "@/lib/blog/posts.functions";
import { SITE_URL, socialMeta } from "@/lib/seo/schema";

const postsQuery = queryOptions({
  queryKey: ["blog", "published"],
  queryFn: () => listPublishedPosts(),
});

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  head: () => ({
    meta: [
      { title: "Blog — Commercial Security Insights | Fortega" },
      { name: "description", content: "Daily insights on commercial security, CCTV, alarm monitoring, access control, and risk management for Canadian businesses." },
      ...socialMeta({
        title: "Blog — Commercial Security Insights | Fortega",
        description: "Daily insights on commercial security, CCTV, alarm monitoring, access control, and risk management for Canadian businesses.",
        url: `${SITE_URL}/blog`,
      }),
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(postsQuery);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-28 md:pt-32">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Insights & Updates</h1>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          Practical security guidance for Canadian businesses, delivered daily.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts yet. Check back soon.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <li key={p.id} className="group overflow-hidden rounded-xl border border-border bg-card transition hover:border-brand/50">
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="block">
                {p.hero_image_url && (
                  <img src={p.hero_image_url} alt="" className="h-44 w-full object-cover" loading="lazy" />
                )}
                <div className="p-5">
                  {p.topic && <div className="text-xs uppercase tracking-wide text-brand">{p.topic}</div>}
                  <h2 className="mt-1 text-lg font-semibold text-foreground group-hover:text-brand">{p.title}</h2>
                  {p.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>}
                  {p.published_at && (
                    <time className="mt-3 block text-xs text-muted-foreground">
                      {new Date(p.published_at).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}