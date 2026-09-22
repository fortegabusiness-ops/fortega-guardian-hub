import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Clock } from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { GUIDE_BY_SLUG } from "@/lib/seo/resources";
import { breadcrumbSchema, faqSchema, jsonLd, SITE_URL, socialMeta } from "@/lib/seo/schema";
import { clampDescription, clampTitle } from "@/lib/seo/meta";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const guide = GUIDE_BY_SLUG[params.slug];
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ params, loaderData }) => {
    const guide = loaderData?.guide ?? GUIDE_BY_SLUG[params.slug];
    if (!guide) return { meta: [{ title: "Guide not found — Fortega" }] };
    const url = `${SITE_URL}/resources/${guide.slug}`;
    const title = clampTitle([`${guide.metaTitle} | Fortega`, guide.metaTitle]);
    const description = clampDescription(guide.description);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...socialMeta({ title, description, url, type: "article" }),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: guide.metaTitle, path: `/resources/${guide.slug}` },
          ]),
        ),
        jsonLd(faqSchema(guide.faqs)),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          headline: guide.title,
          description,
          about: guide.question,
          articleSection: guide.category,
          inLanguage: "en-CA",
          isAccessibleForFree: true,
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: url,
        }),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Guide not found</h1>
      <Link
        to="/resources"
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-brand-glow/60"
      >
        View all guides
      </Link>
    </div>
  ),
  component: GuidePage,
});

function GuidePage() {
  const { guide } = Route.useLoaderData();
  const related = guide.related
    .map((s) => GUIDE_BY_SLUG[s])
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-4xl px-4 py-20 md:px-8 md:py-28">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/resources" className="hover:text-foreground">Resources</Link>
            <span>/</span>
            <span className="text-foreground">{guide.category}</span>
          </nav>
          <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {guide.readMinutes} min read
          </p>
          <div className="mt-8 rounded-2xl border border-brand-glow/30 bg-surface/60 p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-glow">
              Short answer
            </span>
            <p className="mt-3 text-lg leading-relaxed text-foreground">{guide.answer}</p>
          </div>
        </div>
      </section>

      <article className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-20">
          {guide.sections.map((s) => (
            <section key={s.heading} className="mb-12">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {s.heading}
              </h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-5 space-y-3">
                  {s.list.map((li) => (
                    <li key={li} className="flex items-start gap-3 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-brand-glow" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      <FAQSection
        eyebrow="FAQ"
        title="Related questions"
        faqs={guide.faqs}
      />

      {related.length > 0 && (
        <section className="border-t border-border bg-ink">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Keep reading
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((g) => (
                <Link
                  key={g.slug}
                  to="/resources/$slug"
                  params={{ slug: g.slug }}
                  className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-brand-glow/60"
                >
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {g.question}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{g.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-gradient-to-b from-background to-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Get this scoped for your site
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Fortega designs, installs and monitors commercial security across Canada. Book a free
            site assessment and we'll apply the above to your building.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5"
            >
              Request consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center rounded-md border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground hover:border-brand-glow/60"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
