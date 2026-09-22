import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck, MapPin } from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { getServiceArea, areasInCity, areasNearCity } from "@/lib/seo/service-areas";
import { CITY_CONTEXT, PROVINCE_BY_NAME, nearbyCities } from "@/lib/seo/provinces";
import type { City } from "@/lib/seo/cities";
import type { ServiceDetail } from "@/lib/seo/services";
import {
  breadcrumbSchema, faqSchema, jsonLd, SITE_URL, socialMeta,
} from "@/lib/seo/schema";

function leadAnswer(service: ServiceDetail, city: City) {
  return `Fortega designs, installs and supports ${service.name.toLowerCase()} for businesses in ${city.name}, ${city.province}. Local sites are engineered by licensed technicians, backed by our 24/7 Canadian monitoring centre, and documented to the privacy and licensing rules that apply in ${city.province}.`;
}

function localFaqs(service: ServiceDetail, city: City) {
  const p = PROVINCE_BY_NAME[city.province];
  const faqs = [
    {
      q: `Does Fortega install ${service.shortName.toLowerCase()} in ${city.name}?`,
      a: `Yes. Fortega delivers ${service.name.toLowerCase()} across ${city.name} and the surrounding ${city.province} region, from single-site installs to multi-location rollouts under one program.`,
    },
    {
      q: `What does ${service.shortName.toLowerCase()} cost in ${city.name}?`,
      a: `Cost depends on site count, door or camera counts, cabling conditions, and whether monitoring is included. Fortega quotes after a free ${city.name} site assessment rather than from a fixed price list, so the number reflects your building rather than an average.`,
    },
  ];
  if (p) {
    faqs.push(
      {
        q: `Is Fortega licensed to work in ${city.province}?`,
        a: `Yes. ${p.licensing}`,
      },
      {
        q: `How is our security data handled in ${city.province}?`,
        a: `${p.privacy} Fortega documents purpose, signage, access and retention as part of every handover package.`,
      },
    );
  }
  faqs.push({
    q: `How quickly can Fortega respond to an alarm in ${city.name}?`,
    a: `Our monitoring centre verifies events in real time and follows the dispatch path agreed with you — local authorities, your on-call staff, or guard response — typically within seconds of the event being received.`,
  });
  return faqs;
}

export const Route = createFileRoute("/services/$service/$city")({
  loader: ({ params }) => {
    const area = getServiceArea(params.service, params.city);
    if (!area) throw notFound();
    return area;
  },
  head: ({ params, loaderData }) => {
    const area = loaderData ?? getServiceArea(params.service, params.city);
    if (!area) return { meta: [{ title: "Service area not found — Fortega" }] };
    const { service, city } = area;
    const p = PROVINCE_BY_NAME[city.province];
    const abbr = p?.abbr ?? city.province;
    const url = `${SITE_URL}/services/${service.slug}/${city.slug}`;
    const title = `${service.name} in ${city.name}, ${abbr} | Fortega`;
    const description = `${service.name} for ${city.name}, ${city.province} businesses — designed, installed and monitored by Fortega. Licensed technicians, 24/7 monitoring, free site assessment.`;
    return {
      meta: [
        { title: title.length > 60 ? `${service.shortName} in ${city.name}, ${abbr} | Fortega` : title },
        { name: "description", content: description },
        ...socialMeta({ title, description, url, type: "article" }),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLd(breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.shortName, path: `/services/${service.slug}` },
          { name: city.name, path: `/services/${service.slug}/${city.slug}` },
        ])),
        jsonLd(faqSchema(localFaqs(service, city))),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: `${service.name} in ${city.name}`,
          description,
          serviceType: service.name,
          url,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: [
            { "@type": "City", name: city.name },
            { "@type": "AdministrativeArea", name: city.province },
          ],
        }),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Page not found</h1>
      <p className="mt-4 text-muted-foreground">We don't have a page for that service and city combination yet.</p>
      <Link to="/services" className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-brand-glow/60">
        View all services
      </Link>
    </div>
  ),
  component: ServiceAreaPage,
});

function ServiceAreaPage() {
  const { service, city } = Route.useLoaderData();
  const province = PROVINCE_BY_NAME[city.province];
  const context = CITY_CONTEXT[city.slug];
  const faqs = localFaqs(service, city);
  const otherHere = areasInCity(city.slug, service.slug);
  const otherCities = areasNearCity(service.slug, city, 12);
  const neighbours = nearbyCities(city, 6);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-foreground">Services</Link>
            <span>/</span>
            <Link to="/services/$service" params={{ service: service.slug }} className="hover:text-foreground">
              {service.shortName}
            </Link>
            <span>/</span>
            <span className="text-foreground">{city.name}</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">
            <MapPin className="h-3.5 w-3.5" /> {city.name}, {city.province}
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {service.name} in {city.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{leadAnswer(service, city)}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5">
              Request a {city.name} site assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services/$service" params={{ service: service.slug }} className="inline-flex items-center rounded-md border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground hover:border-brand-glow/60">
              About {service.shortName.toLowerCase()}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-24">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Why {city.name} sites need this
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              {context && <p>{context}</p>}
              {province && <p>{province.economy}</p>}
              {province && <p>{province.environment}</p>}
              <p>{service.overview[0]}</p>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-border bg-surface/40 p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Included on {city.name} projects
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-brand-glow" />
                    {b}
                  </li>
                ))}
              </ul>
              {province && (
                <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                  Licensing authority in {city.province}: {province.regulator}.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What we deploy in {city.name}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((c) => (
              <div key={c.title} className="rounded-xl border border-border bg-surface p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {province && (
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-24">
            <div className="md:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-glow">
                Compliance
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Licensing and privacy in {city.province}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>{province.licensing}</p>
                <p>{province.privacy}</p>
              </div>
            </div>
            <div className="md:col-span-6">
              <ul className="space-y-4">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-brand-glow" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <FAQSection
        eyebrow="FAQ"
        title={`${service.shortName} in ${city.name} — common questions`}
        sub={`Answers for ${city.name} businesses evaluating Fortega.`}
        faqs={faqs}
      />

      <section className="border-t border-border bg-ink">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Keep exploring
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {otherHere.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Other services in {city.name}
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {otherHere.map((a) => (
                    <li key={a.service.slug}>
                      <Link
                        to="/services/$service/$city"
                        params={{ service: a.service.slug, city: a.city.slug }}
                        className="text-muted-foreground hover:text-brand-glow"
                      >
                        {a.service.shortName} in {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {otherCities.length > 0 && (
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {service.shortName} in other cities
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {otherCities.map((a) => (
                    <li key={a.city.slug}>
                      <Link
                        to="/services/$service/$city"
                        params={{ service: a.service.slug, city: a.city.slug }}
                        className="text-muted-foreground hover:text-brand-glow"
                      >
                        {service.shortName} in {a.city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Nearby {city.province} coverage
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link
                    to="/locations/$city"
                    params={{ city: city.slug }}
                    className="text-muted-foreground hover:text-brand-glow"
                  >
                    All security services in {city.name}
                  </Link>
                </li>
                {province && (
                  <li>
                    <Link
                      to="/locations/province/$province"
                      params={{ province: province.slug }}
                      className="text-muted-foreground hover:text-brand-glow"
                    >
                      Security services across {city.province}
                    </Link>
                  </li>
                )}
                {neighbours.slice(0, 4).map((n) => (
                  <li key={n.slug}>
                    <Link
                      to="/locations/$city"
                      params={{ city: n.slug }}
                      className="text-muted-foreground hover:text-brand-glow"
                    >
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-gradient-to-b from-background to-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Get a {service.shortName.toLowerCase()} quote for {city.name}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Book a no-obligation site assessment and we'll scope the system, the monitoring and the
            lifecycle support for your {city.name} site.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5">
            Request consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
