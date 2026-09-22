import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { PROVINCE_BY_SLUG, citiesInProvince, rankedCities } from "@/lib/seo/provinces";
import { SERVICES } from "@/lib/seo/services";
import { SERVICE_AREAS } from "@/lib/seo/service-areas";
import {
  breadcrumbSchema, faqSchema, jsonLd, SITE_URL, socialMeta,
} from "@/lib/seo/schema";
import { clampDescription } from "@/lib/seo/meta";

export const Route = createFileRoute("/locations/province/$province")({
  loader: ({ params }) => {
    const province = PROVINCE_BY_SLUG[params.province];
    if (!province) throw notFound();
    return { province, cities: citiesInProvince(province.slug) };
  },
  head: ({ params, loaderData }) => {
    const province = loaderData?.province ?? PROVINCE_BY_SLUG[params.province];
    if (!province) return { meta: [{ title: "Province not found — Fortega" }] };
    const url = `${SITE_URL}/locations/province/${province.slug}`;
    const title = `Security Systems in ${province.name} | Fortega`;
    const full = `CCTV, access control, alarms, monitoring and cyber security across ${province.name}. Licensed under ${province.regulator}. Free site assessment.`;
    const description = clampDescription(
      full.length <= 155
        ? full
        : `CCTV, access control, alarms, monitoring and cyber security across ${province.name}. Licensed provincially. Free site assessment from Fortega.`,
    );
    const faqs = provinceFaqs(province.name, province.licensing, province.privacy);
    return {
      meta: [
        { title: title.length > 60 ? `Security Systems in ${province.abbr} | Fortega` : title },
        { name: "description", content: description },
        ...socialMeta({ title, description, url, type: "article" }),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLd(breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: province.name, path: `/locations/province/${province.slug}` },
        ])),
        jsonLd(faqSchema(faqs)),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: `Integrated security services in ${province.name}`,
          description,
          url,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: { "@type": "AdministrativeArea", name: province.name },
        }),
      ],
    };
  },
  component: ProvincePage,
});

function provinceFaqs(name: string, licensing: string, privacy: string) {
  return [
    { q: `Is Fortega licensed to provide security services in ${name}?`, a: licensing },
    { q: `What privacy rules apply to our cameras and access logs in ${name}?`, a: privacy },
    {
      q: `Can Fortega cover multiple sites across ${name}?`,
      a: `Yes. Fortega standardises credentials, video platforms and monitoring across portfolios spanning multiple ${name} communities, with one accountable team and one reporting line.`,
    },
    {
      q: `Does Fortega serve smaller communities in ${name}?`,
      a: `Yes. Alongside the major centres, Fortega supports regional and remote ${name} sites using verified remote monitoring, cellular alarm paths and scheduled technician visits.`,
    },
  ];
}

function ProvincePage() {
  const { province, cities } = Route.useLoaderData();
  const faqs = provinceFaqs(province.name, province.licensing, province.privacy);
  const ranked = rankedCities(cities);
  const areaCities = ranked.slice(0, 12).map((c) => ({
    city: c,
    areas: SERVICE_AREAS.filter((a) => a.city.slug === c.slug),
  })).filter((g) => g.areas.length > 0);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/locations" className="hover:text-foreground">Locations</Link>
            <span>/</span>
            <span className="text-foreground">{province.name}</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">
            <MapPin className="h-3.5 w-3.5" /> {province.abbr}
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Security systems and monitoring across {province.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            {cities.length > 0 ? (
              <>
                Fortega serves {province.name} with CCTV, access control, intrusion alarms, remote
                monitoring, guard services and cyber security — licensed under {province.regulator}{" "}
                and supported by our 24/7 Canadian monitoring centre.
              </>
            ) : (
              <>
                Fortega supports {province.name} sites through remote monitoring, cellular alarm
                paths and scheduled technician deployments, working to {province.regulator}{" "}
                requirements and backed by our 24/7 Canadian monitoring centre.
              </>
            )}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5">
              Request a site assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/locations" className="inline-flex items-center rounded-md border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground hover:border-brand-glow/60">
              All provinces
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-24">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What shapes security design in {province.name}
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>{province.economy}</p>
              <p>{province.environment}</p>
              <p>{province.licensing}</p>
              <p>{province.privacy}</p>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-border bg-surface/40 p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Sectors we secure in {province.abbr}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {province.sectors.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-foreground">
                    <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-brand-glow" />
                    {s}
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
            Services available across {province.name}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services/$service"
                params={{ service: s.slug }}
                className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-brand-glow/60"
              >
                <h3 className="font-display text-base font-semibold text-foreground">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
              </Link>
            ))}
          </div>
          {areaCities.length > 0 && (
            <div className="mt-12 space-y-8">
              <h3 className="font-display text-xl font-semibold text-foreground">
                City-specific service pages
              </h3>
              <p className="-mt-4 text-sm text-muted-foreground">
                Every community we serve in {province.name} has a page for all{" "}
                {SERVICES.length} services. The largest centres are shown here — open any
                community below to see its full service list.
              </p>
              {areaCities.map((g) => (
                <div key={g.city.slug}>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-glow">
                    {g.city.name}
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.areas.map((a) => (
                      <Link
                        key={`${a.service.slug}-${a.city.slug}`}
                        to="/services/$service/$city"
                        params={{ service: a.service.slug, city: a.city.slug }}
                        className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground hover:border-brand-glow/60"
                      >
                        {a.service.shortName}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {province.name} communities we serve
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {cities.map((c) => (
              <Link
                key={c.slug}
                to="/locations/$city"
                params={{ city: c.slug }}
                className="text-sm text-muted-foreground transition-colors hover:text-brand-glow"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        eyebrow="FAQ"
        title={`Security services in ${province.name} — common questions`}
        sub={`Licensing, privacy and coverage answers for ${province.name} businesses.`}
        faqs={faqs}
      />

      <section className="border-t border-border bg-gradient-to-b from-background to-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Securing sites in {province.name}?
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Talk to a Fortega advisor about your {province.name} locations and get a no-obligation
            assessment.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5">
            Request consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
