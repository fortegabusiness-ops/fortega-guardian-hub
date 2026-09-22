import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Video, KeyRound, Bell, Eye, UserCheck, Lock } from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { CITY_BY_SLUG, type City } from "@/lib/seo/cities";
import { CITY_CONTEXT, PROVINCE_BY_NAME, nearbyCities } from "@/lib/seo/provinces";
import { areasInCity } from "@/lib/seo/service-areas";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  serviceSchema,
  SITE_URL,
  socialMeta,
} from "@/lib/seo/schema";
import { clampDescription, clampTitle } from "@/lib/seo/meta";

const SERVICES = [
  { id: "cctv", icon: Video, name: "CCTV & Video Surveillance", desc: "HD and AI-powered camera systems with cloud video management." },
  { id: "access", icon: KeyRound, name: "Access Control", desc: "Card, mobile and biometric access for single and multi-site portfolios." },
  { id: "intrusion", icon: Bell, name: "Intrusion & Alarm Systems", desc: "Commercial alarms with environmental and panic monitoring." },
  { id: "remote", icon: Eye, name: "Remote Guarding & 24/7 Monitoring", desc: "Live operators, virtual patrols and verified alarm response." },
  { id: "guards", icon: UserCheck, name: "Security Guard Services", desc: "Licensed on-site guards, mobile patrol and event security." },
  { id: "cyber", icon: Lock, name: "Cyber Security", desc: "Network defense, endpoint protection and incident response." },
];

function buildFaqs(city: City) {
  const p = PROVINCE_BY_NAME[city.province];
  const faqs = [
    {
      q: `Does Fortega install security systems in ${city.name}?`,
      a: `Yes. Fortega services ${city.name}, ${city.province} and the surrounding region with CCTV, access control, alarm monitoring, remote guarding and cyber security — from single-site upgrades to multi-location rollouts.`,
    },
    {
      q: `How fast can Fortega respond to alarms in ${city.name}?`,
      a: `Our 24/7 monitoring centre verifies alarms in real time and follows pre-agreed dispatch paths to local authorities or on-site responders in ${city.name}, typically within seconds of an event.`,
    },
  ];
  if (p) {
    faqs.push(
      {
        q: `Is Fortega licensed to work in ${city.province}?`,
        a: p.licensing,
      },
      {
        q: `Which privacy rules apply to cameras and access logs in ${city.name}?`,
        a: `${p.privacy} Fortega documents purpose, signage, access rights and retention as part of every handover.`,
      },
    );
  }
  faqs.push(
    {
      q: `Can Fortega secure multiple sites across ${city.province}?`,
      a: `Yes. Fortega standardizes credentials, video platforms and monitoring across portfolios spanning multiple cities in ${city.province} and the rest of Canada — one team, one accountable program.`,
    },
    {
      q: `What conditions affect equipment choice around ${city.name}?`,
      a: p
        ? p.environment
        : `Canadian temperature extremes and weather exposure shape enclosure ratings, mounting and cabling decisions on every outdoor installation.`,
    },
    {
      q: `What industries does Fortega serve in ${city.name}?`,
      a: `${p ? p.sectors.join(", ") : "Commercial, industrial and institutional"} clients across ${city.name} and the wider ${city.province} region.`,
    },
  );
  return faqs;
}

export const Route = createFileRoute("/locations/$city")({
  loader: ({ params }) => {
    const city = CITY_BY_SLUG[params.city];
    if (!city) throw notFound();
    return { city };
  },
  head: ({ params, loaderData }) => {
    const city = loaderData?.city ?? CITY_BY_SLUG[params.city];
    if (!city) {
      return { meta: [{ title: "Location not found — Fortega" }] };
    }
    const p = PROVINCE_BY_NAME[city.province];
    const abbr = p?.abbr ?? city.province;
    const url = `${SITE_URL}/locations/${city.slug}`;
    const title = clampTitle([
      `Security Systems in ${city.name}, ${abbr} | Fortega`,
      `Security Systems in ${city.name} | Fortega`,
      `Security in ${city.name}, ${abbr} | Fortega`,
    ]);
    const context = CITY_CONTEXT[city.slug];
    const description = clampDescription(
      context
        ? `${context.replace(/\.$/, "")}. CCTV, access control, alarms and 24/7 monitoring in ${city.name} from Fortega.`
        : `CCTV, access control, alarm monitoring, remote guarding and cyber security in ${city.name}, ${city.province}. Free site assessment from Fortega.`,
    );
    const faqs = buildFaqs(city);
    const isQc = city.province === "Quebec";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...socialMeta({ title, description, url, type: "article" }),
      ],
      links: [
        { rel: "canonical", href: url },
        ...(isQc
          ? [
              { rel: "alternate", hrefLang: "en-ca", href: url },
              { rel: "alternate", hrefLang: "fr-ca", href: `${SITE_URL}/fr/securite/${city.slug}` },
              { rel: "alternate", hrefLang: "x-default", href: url },
            ]
          : []),
      ],
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            ...(p ? [{ name: p.name, path: `/locations/province/${p.slug}` }] : []),
            { name: city.name, path: `/locations/${city.slug}` },
          ]),
        ),
        jsonLd(faqSchema(faqs)),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${url}#localbusiness`,
          name: `Fortega — ${city.name}`,
          url,
          telephone: "+1-888-869-1679",
          email: "info@fortega.ca",
          priceRange: "$$",
          image: `${SITE_URL}/favicon.ico`,
          areaServed: [
            { "@type": "City", name: city.name },
            { "@type": "AdministrativeArea", name: city.province },
            { "@type": "Country", name: "Canada" },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: city.name,
            addressRegion: city.province,
            addressCountry: "CA",
          },
        }),
        ...SERVICES.map((s) =>
          jsonLd(
            serviceSchema({
              name: `${s.name} in ${city.name}`,
              description: `${s.desc} Available in ${city.name}, ${city.province}.`,
              slug: s.id,
            }),
          ),
        ),
      ],
    };
  },
  component: CityPage,
});

function CityPage() {
  const { city } = Route.useLoaderData();
  const faqs = buildFaqs(city);
  const province = PROVINCE_BY_NAME[city.province];
  const context = CITY_CONTEXT[city.slug];
  const neighbours = nearbyCities(city, 8);
  const areas = areasInCity(city.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/locations" className="hover:text-foreground">Locations</Link>
            {province && (
              <>
                <span>/</span>
                <Link
                  to="/locations/province/$province"
                  params={{ province: province.slug }}
                  className="hover:text-foreground"
                >
                  {province.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-foreground">{city.name}</span>
          </nav>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">
            {city.province}
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Security systems &amp; monitoring in {city.name}.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Fortega designs, installs and monitors integrated security solutions for businesses in{" "}
            {city.name}, {city.province} — CCTV, access control, alarms, remote guarding and cyber
            security under one accountable team.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5"
            >
              Request a {city.name} site assessment <ArrowRight className="h-4 w-4" />
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
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-24">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Security in {city.name}: what shapes the design
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              {context && <p>{context}</p>}
              {province && <p>{province.economy}</p>}
              {province && <p>{province.environment}</p>}
              {province && <p>{province.licensing}</p>}
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-border bg-surface/40 p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {city.name} coverage at a glance
              </h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Province</dt>
                  <dd className="text-foreground">
                    {province ? (
                      <Link
                        to="/locations/province/$province"
                        params={{ province: province.slug }}
                        className="hover:text-brand-glow"
                      >
                        {city.province} ({province.abbr})
                      </Link>
                    ) : (
                      city.province
                    )}
                  </dd>
                </div>
                {province && (
                  <>
                    <div>
                      <dt className="text-muted-foreground">Licensing authority</dt>
                      <dd className="text-foreground">{province.regulator}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Sectors we secure</dt>
                      <dd className="text-foreground">{province.sectors.join(", ")}</dd>
                    </div>
                  </>
                )}
                <div>
                  <dt className="text-muted-foreground">Monitoring</dt>
                  <dd className="text-foreground">24/7 Canadian monitoring centre</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Services available in {city.name}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Every Fortega service is delivered in {city.name}, {city.province} by licensed
            technicians and supported by our 24/7 Canadian monitoring centre.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                to="/services/$service"
                params={{ service: s.id }}
                className="group rounded-xl border border-border bg-surface/40 p-6 transition-colors hover:border-brand-glow/60"
              >
                <s.icon className="h-6 w-6 text-brand-glow" />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {s.name} in {city.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-glow">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
          {areas.length > 0 && (
            <div className="mt-10">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Detailed {city.name} service pages
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {areas.map((a) => (
                  <Link
                    key={a.service.slug}
                    to="/services/$service/$city"
                    params={{ service: a.service.slug, city: a.city.slug }}
                    className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground hover:border-brand-glow/60"
                  >
                    {a.service.shortName} in {city.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Why {city.name} businesses choose Fortega
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { t: "Local presence, national reach", d: `Service for ${city.name} clients is backed by Fortega's Canadian operations and 24/7 monitoring centre.` },
              { t: "One accountable team", d: "Physical and cyber security from a single vendor — no finger-pointing when something goes wrong." },
              { t: "Standards-aligned", d: `Canadian electrical code compliance, ${province ? `${province.regulator} licensing` : "provincial licensing"} and modern enterprise-grade platforms.` },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-border bg-background p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        eyebrow="FAQ"
        title={`Security services in ${city.name} — common questions`}
        sub={`Answers for businesses evaluating Fortega in ${city.name}, ${city.province}.`}
        faqs={faqs}
      />

      {neighbours.length > 0 && (
        <section className="border-t border-border bg-ink">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Also serving nearby {city.province} communities
            </h2>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {neighbours.map((n) => (
                <Link
                  key={n.slug}
                  to="/locations/$city"
                  params={{ city: n.slug }}
                  className="text-muted-foreground hover:text-brand-glow"
                >
                  {n.name}
                </Link>
              ))}
              {province && (
                <Link
                  to="/locations/province/$province"
                  params={{ province: province.slug }}
                  className="font-medium text-brand-glow"
                >
                  All {city.province} locations →
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-gradient-to-b from-background to-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ready to secure your {city.name} site?
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Talk to a Fortega security advisor for a no-obligation site assessment in {city.name}.
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
