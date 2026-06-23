import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight, Check, Search, Video, Bell, KeyRound, Eye, UserCheck, Building2, Lock,
  ShieldCheck,
} from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { SERVICE_BY_SLUG, SERVICES, type ServiceDetail } from "@/lib/seo/services";
import { INDUSTRY_BY_SLUG } from "@/lib/seo/industries";
import {
  breadcrumbSchema, faqSchema, jsonLd, serviceSchema, SITE_URL,
} from "@/lib/seo/schema";

const ICONS = { Search, Video, Bell, KeyRound, Eye, UserCheck, Building2, Lock } as const;

export const Route = createFileRoute("/services/$service")({
  loader: ({ params }) => {
    const service = SERVICE_BY_SLUG[params.service];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    const service: ServiceDetail | undefined =
      loaderData?.service ?? SERVICE_BY_SLUG[params.service];
    if (!service) return { meta: [{ title: "Service not found — Fortega" }] };
    const url = `${SITE_URL}/services/${service.slug}`;
    return {
      meta: [
        { title: service.metaTitle },
        { name: "description", content: service.metaDescription },
        { property: "og:title", content: service.metaTitle },
        { property: "og:description", content: service.metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLd(breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])),
        jsonLd(faqSchema(service.faqs)),
        jsonLd(serviceSchema({
          name: service.name,
          description: service.metaDescription,
          slug: service.slug,
        })),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Service not found</h1>
      <p className="mt-4 text-muted-foreground">We couldn't find that service page.</p>
      <Link to="/services" className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-brand-glow/60">
        View all services
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-brand-glow/60">
        Try again
      </button>
    </div>
  ),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData() as { service: ServiceDetail };
  const Icon = ICONS[service.iconName];
  const related = service.related
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is ServiceDetail => Boolean(s));
  const industries = service.industriesServed
    .map((slug) => INDUSTRY_BY_SLUG[slug])
    .filter(Boolean);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-foreground">Services</Link>
            <span>/</span>
            <span className="text-foreground">{service.shortName}</span>
          </nav>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">
            {service.eyebrow}
          </span>
          <div className="mt-4 flex items-start gap-5">
            <div className="hidden h-14 w-14 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground shadow-[0_12px_40px_-12px_var(--brand-glow)] md:inline-flex">
              <Icon className="h-6 w-6" />
            </div>
            <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {service.h1}
            </h1>
          </div>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{service.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5">
              {service.cta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center rounded-md border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground hover:border-brand-glow/60">
              All services
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-24">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Overview
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              {service.overview.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-border bg-surface/40 p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">What's included</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-brand-glow" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Capabilities
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Every Fortega {service.shortName.toLowerCase()} engagement is engineered around your sites, your operations and your risk profile.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((c) => (
              <div key={c.title} className="rounded-xl border border-border bg-surface p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/20 text-brand-glow">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-24">
          <div className="md:col-span-6">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-glow">Outcomes</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Why clients choose Fortega for {service.shortName.toLowerCase()}
            </h2>
            <ul className="mt-8 space-y-4">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-brand-glow" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6">
            <div className="rounded-2xl border border-border bg-surface/40 p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Industries we serve</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.name} is deployed across these Fortega industry programs:
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {industries.map((i) => (
                  <li key={i.slug}>
                    <Link
                      to="/industries/$industry"
                      params={{ industry: i.slug }}
                      className="flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground hover:border-brand-glow/60"
                    >
                      <span>{i.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-brand-glow" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/industries"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-glow"
              >
                View all industries <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        eyebrow="FAQ"
        title={`${service.shortName} — common questions`}
        sub={`Quick answers about Fortega's ${service.shortName.toLowerCase()} program.`}
        faqs={service.faqs}
      />

      {related.length > 0 && (
        <section className="border-t border-border bg-ink">
          <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Related Fortega services
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((r) => {
                const RIcon = ICONS[r.iconName];
                return (
                  <Link
                    key={r.slug}
                    to="/services/$service"
                    params={{ service: r.slug }}
                    className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-brand-glow/60"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-glow text-brand-foreground">
                      <RIcon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{r.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{r.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-glow">
                      Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-gradient-to-b from-background to-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ready to talk about {service.shortName.toLowerCase()}?
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Speak with a Fortega specialist about your sites, your risks and the right program for your business.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5">
            Request consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
