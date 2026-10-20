import { createFileRoute, Link } from "@tanstack/react-router";
import { CITIES, CITIES_BY_PROVINCE } from "@/lib/seo/cities";
import { PROVINCE_BY_NAME } from "@/lib/seo/provinces";
import { REVIEW_PROVINCE_GROUPS } from "@/lib/seo/location-review-links";
import { SERVICE_SLUGS, SERVICE_BY_SLUG } from "@/lib/seo/services";
import { breadcrumbSchema, jsonLd, SITE_URL, socialMeta } from "@/lib/seo/schema";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: [
      { title: "Security Services Across Canada — Locations | Fortega" },
      {
        name: "description",
        content: "Explore Fortega location pages and remote security assessments. Service availability and installation arrangements are confirmed for each project.",
      },
      ...socialMeta({
        title: "Security Services Across Canada — Locations | Fortega",
        description: "Explore Fortega location pages and remote security assessments. Service availability and installation arrangements are confirmed for each project.",
        url: `${SITE_URL}/locations`,
      }),
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/locations` }],
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ]),
      ),
    ],
  }),
  component: LocationsIndex,
});

function LocationsIndex() {
  const provinces = Object.keys(CITIES_BY_PROVINCE).sort();
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">
            Locations
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Security services across Canada.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore security planning and coverage information for {CITIES.length} Canadian
            communities. Assessments can begin remotely using drawings and project details;
            service availability and installation arrangements are confirmed for each project.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-12">
            {provinces.map((prov) => {
              const hub = PROVINCE_BY_NAME[prov];
              return (
              <div key={prov}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                    {hub ? (
                      <Link
                        to="/locations/province/$province"
                        params={{ province: hub.slug }}
                        className="hover:text-brand-glow"
                      >
                        {prov}
                      </Link>
                    ) : (
                      prov
                    )}
                  </h2>
                  {hub && (
                    <Link
                      to="/locations/province/$province"
                      params={{ province: hub.slug }}
                      className="text-sm font-medium text-brand-glow"
                    >
                      {prov} security services →
                    </Link>
                  )}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {CITIES_BY_PROVINCE[prov].map((c) => (
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
              );
            })}
          </div>
        </div>
      </section>
      <section className="border-b border-border bg-surface/30" aria-labelledby="community-review-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="community-review-heading" className="font-display text-3xl font-semibold text-foreground">Community service drafts</h2>
            <Link to="/location-review" className="text-sm font-medium text-brand-glow" rel="nofollow">All 225 communities →</Link>
          </div>
          <p className="mt-4 text-muted-foreground">225 communities · 8 service drafts each · Under review, separate from approved location pages.</p>
          <div className="mt-10 space-y-12">
            {REVIEW_PROVINCE_GROUPS.map(({ province, cities }) => (
              <div key={province}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold text-foreground">{province}</h3>
                  <Link to="/location-review" search={{ province }} rel="nofollow" className="text-sm font-medium text-brand-glow">{cities.length} communities →</Link>
                </div>
                <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  {cities.map(city => (
                    <li key={city.slug} className="min-w-0 border-t border-border pt-4" data-review-city={city.slug}>
                      <h4 className="font-semibold text-foreground">{city.name}</h4>
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        {SERVICE_SLUGS.map(service => (
                          <li key={service}><Link to="/location-review/$city/$service" params={{ city: city.slug, service }} rel="nofollow" className="text-muted-foreground transition-colors hover:text-brand-glow">{SERVICE_BY_SLUG[service]?.shortName}</Link></li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}