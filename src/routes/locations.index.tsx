import { createFileRoute, Link } from "@tanstack/react-router";
import { CITIES, CITIES_BY_PROVINCE } from "@/lib/seo/cities";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/seo/schema";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: [
      { title: "Security Services Across Canada — Locations | Fortega" },
      {
        name: "description",
        content: `Fortega delivers CCTV, access control, alarm monitoring and cyber security across ${CITIES.length}+ Canadian cities. Find your local service area.`,
      },
      { property: "og:title", content: "Fortega Service Locations Across Canada" },
      {
        property: "og:description",
        content: "Integrated security solutions in every province and territory across Canada.",
      },
      { property: "og:url", content: `${SITE_URL}/locations` },
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
            Fortega designs, installs and monitors security systems in {CITIES.length}+ Canadian
            cities — from national rollouts to single-site upgrades. Find your local service area
            below.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-12">
            {provinces.map((prov) => (
              <div key={prov}>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {prov}
                </h2>
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}