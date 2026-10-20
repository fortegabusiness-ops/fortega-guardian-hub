import { createFileRoute, Link } from "@tanstack/react-router";
import { CITIES } from "@/lib/seo/cities";
import { PROVINCE_BY_NAME } from "@/lib/seo/provinces";
import { REVIEW_PROVINCE_GROUPS } from "@/lib/seo/location-review-links";
import { SERVICE_SLUGS, SERVICE_BY_SLUG } from "@/lib/seo/services";
import { breadcrumbSchema, jsonLd, SITE_URL, socialMeta } from "@/lib/seo/schema";

const communityCount = REVIEW_PROVINCE_GROUPS.reduce((total, group) => total + group.cities.length, 0);
const locationsDescription = `Explore security planning for ${communityCount} Canadian communities, organized by province. Assessments can begin remotely using drawings, layouts and project details.`;

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: [
      { title: "Security Services Across Canada — Locations | Fortega" },
      {
        name: "description",
        content: locationsDescription,
      },
      ...socialMeta({
        title: "Security Services Across Canada — Locations | Fortega",
        description: locationsDescription,
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
  const approvedSlugs = new Set(CITIES.map((c) => c.slug));
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
            {locationsDescription}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="space-y-12">

            {REVIEW_PROVINCE_GROUPS.map(({ province, cities }) => {
              const hub = PROVINCE_BY_NAME[province];
              return (
                <div key={province}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      {hub ? (
                        <Link
                          to="/locations/province/$province"
                          params={{ province: hub.slug }}
                          className="hover:text-brand-glow"
                        >
                          {province}
                        </Link>
                      ) : (
                        province
                      )}
                    </h3>
                    <Link to="/location-review" search={{ province }} rel="nofollow" className="text-sm font-medium text-brand-glow">{cities.length} communities →</Link>
                  </div>
                  <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cities.map(city => {
                      const approved = approvedSlugs.has(city.slug);
                      return (
                        <li key={city.slug} className="min-w-0 border-t border-border pt-4" data-review-city={city.slug}>
                          <h4 className="font-semibold text-foreground">
                            {approved ? (
                              <Link to="/locations/$city" params={{ city: city.slug }} className="hover:text-brand-glow">
                                {city.name}
                              </Link>
                            ) : (
                              city.name
                            )}
                          </h4>
                          {approved && (
                            <p className="mt-1 text-xs font-medium text-brand-glow">Approved city page</p>
                          )}
                          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                            {SERVICE_SLUGS.map(service => (
                              <li key={service}><Link to="/location-review/$city/$service" params={{ city: city.slug, service }} rel="nofollow" className="text-muted-foreground transition-colors hover:text-brand-glow">{SERVICE_BY_SLUG[service]?.shortName}</Link></li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}