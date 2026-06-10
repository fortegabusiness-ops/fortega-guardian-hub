import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2 } from "lucide-react";
import { INDUSTRIES } from "@/lib/seo/industries";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/seo/schema";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Security Solutions by Industry | Fortega" },
      {
        name: "description",
        content:
          "Industry-specific security programs from Fortega — commercial real estate, retail, industrial, healthcare, education, government, cannabis, financial services and more.",
      },
      { property: "og:title", content: "Fortega Industry Security Solutions" },
      {
        property: "og:description",
        content: "Integrated security and cyber programs engineered for each industry Fortega serves across Canada.",
      },
      { property: "og:url", content: `${SITE_URL}/industries` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/industries` }],
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]),
      ),
    ],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">Industries</span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Security programs built for your industry.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Every industry has its own threats, regulators and operational rhythm. Fortega designs
            integrated security and cyber programs that fit the way your business actually runs.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((i) => (
              <Link
                key={i.slug}
                to="/industries/$industry"
                params={{ industry: i.slug }}
                className="group rounded-xl border border-border bg-surface/40 p-6 transition-colors hover:border-brand-glow/60"
              >
                <Building2 className="h-6 w-6 text-brand-glow" />
                <h2 className="mt-4 font-display text-lg font-semibold text-foreground">{i.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{i.intro}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-glow">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}