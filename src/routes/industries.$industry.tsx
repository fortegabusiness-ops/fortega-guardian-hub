import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldAlert, Shield, Award, Sparkles } from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { INDUSTRY_BY_SLUG, type Industry } from "@/lib/seo/industries";
import { breadcrumbSchema, faqSchema, jsonLd, SITE_URL } from "@/lib/seo/schema";
import { SERVICES } from "@/lib/seo/services";

export const Route = createFileRoute("/industries/$industry")({
  loader: ({ params }) => {
    const industry = INDUSTRY_BY_SLUG[params.industry];
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ params, loaderData }) => {
    const industry: Industry | undefined =
      loaderData?.industry ?? INDUSTRY_BY_SLUG[params.industry];
    if (!industry) {
      return { meta: [{ title: "Industry not found — Fortega" }] };
    }
    const url = `${SITE_URL}/industries/${industry.slug}`;
    return {
      meta: [
        { title: industry.metaTitle },
        { name: "description", content: industry.metaDescription },
        { property: "og:title", content: industry.metaTitle },
        { property: "og:description", content: industry.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: industry.name, path: `/industries/${industry.slug}` },
          ]),
        ),
        jsonLd(faqSchema(industry.faqs)),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Industry not found</h1>
      <p className="mt-4 text-muted-foreground">We couldn't find that industry page.</p>
      <Link
        to="/industries"
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-brand-glow/60"
      >
        View all industries
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">{error.message}</p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-brand-glow/60"
      >
        Try again
      </button>
    </div>
  ),
  component: IndustryPage,
});

function IndustryPage() {
  const { industry } = Route.useLoaderData() as { industry: Industry };

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/industries" className="hover:text-foreground">Industries</Link>
            <span>/</span>
            <span className="text-foreground">{industry.name}</span>
          </nav>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">
            {industry.eyebrow}
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            {industry.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{industry.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5"
            >
              Talk to a {industry.shortName} specialist <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center rounded-md border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground hover:border-brand-glow/60"
            >
              Explore all services
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 text-brand-glow">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              {industry.threatHeading}
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground lg:col-span-7">
            {industry.threats.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground shadow-[0_12px_40px_-12px_var(--brand-glow)]">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              {industry.approachHeading}
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground lg:col-span-7">
            {industry.approach.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Solutions for {industry.shortName.toLowerCase()}
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Every Fortega service is delivered by licensed Canadian technicians and backed by our
            24/7 monitoring centre.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industry.solutions.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-border bg-surface/40 p-6 transition-colors hover:border-brand-glow/60"
              >
                <Check className="h-5 w-5 text-brand-glow" />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Fortega services available for {industry.shortName.toLowerCase()}
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {SERVICES.filter((s) => s.industriesServed.includes(industry.slug)).map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$service"
                  params={{ service: s.slug }}
                  className="rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-brand-glow/60"
                >
                  {s.shortName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 text-brand-glow">
              <Award className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              {industry.complianceHeading}
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground lg:col-span-7">
            {industry.compliance.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 text-brand-glow">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              {industry.whyHeading}
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground lg:col-span-7">
            {industry.why.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        eyebrow="FAQ"
        title={`${industry.name} security — common questions`}
        sub={`Answers for ${industry.shortName.toLowerCase()} leaders evaluating Fortega across Canada.`}
        faqs={industry.faqs}
      />

      <section className="border-t border-border bg-gradient-to-b from-background to-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ready to talk {industry.shortName.toLowerCase()} security?
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Speak with a Fortega advisor for a no-obligation assessment built around your industry,
            sites and operational rhythm.
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