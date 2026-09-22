import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { GUIDES, GUIDE_CATEGORIES } from "@/lib/seo/resources";
import { breadcrumbSchema, jsonLd, SITE_URL, socialMeta } from "@/lib/seo/schema";
import { clampDescription } from "@/lib/seo/meta";

const URL = `${SITE_URL}/resources`;
const TITLE = "Security Resources & Guides for Business | Fortega";
const DESCRIPTION = clampDescription(
  "Straight answers on commercial security in Canada — system costs, camera counts, access control, privacy rules, false alarms and cyber hardening.",
);

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Commercial Security Guides & Answers | Fortega" },
      { name: "description", content: DESCRIPTION },
      ...socialMeta({ title: TITLE, description: DESCRIPTION, url: URL, type: "website" }),
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ]),
      ),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Fortega commercial security guides",
        itemListElement: GUIDES.map((g, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/resources/${g.slug}`,
          name: g.title,
        })),
      }),
    ],
  }),
  component: ResourcesIndex,
});

function ResourcesIndex() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">
            <BookOpen className="h-3.5 w-3.5" /> Resources
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Straight answers on commercial security.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            No brochures. These guides answer the questions Canadian businesses ask before they
            buy — what systems cost, how many cameras a building actually needs, which access
            control fits, what privacy law requires, and how to stop false alarms.
          </p>
        </div>
      </section>

      {GUIDE_CATEGORIES.map((cat) => {
        const items = GUIDES.filter((g) => g.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="border-b border-border">
            <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {cat}
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((g) => (
                  <Link
                    key={g.slug}
                    to="/resources/$slug"
                    params={{ slug: g.slug }}
                    className="group flex flex-col rounded-xl border border-border bg-surface/40 p-6 transition-colors hover:border-brand-glow/60"
                  >
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {g.question}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">{g.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-glow">
                      Read the guide <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-gradient-to-b from-background to-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Want these answers applied to your building?
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Book a free site assessment and we'll scope the cameras, doors, monitoring and support
            your site actually needs.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5"
          >
            Request consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
