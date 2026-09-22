import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { FR_CITY_BY_SLUG, FR_CITIES, FR_SERVICES, FR_FACTS, frFaqs } from "@/lib/seo/fr";
import { isRemovedCity } from "@/lib/seo/cities";
import { breadcrumbSchema, faqSchema, jsonLd, SITE_URL, socialMeta } from "@/lib/seo/schema";
import { clampDescription, clampTitle } from "@/lib/seo/meta";

export const Route = createFileRoute("/fr/securite/$city")({
  loader: ({ params }) => {
    const city = FR_CITY_BY_SLUG[params.city];
    if (!city) {
      if (isRemovedCity(params.city)) throw new Response(null, { status: 410 });
      throw notFound();
    }
    return { city };
  },
  head: ({ params, loaderData }) => {
    const city = loaderData?.city ?? FR_CITY_BY_SLUG[params.city];
    if (!city) return { meta: [{ title: "Page introuvable — Fortega" }] };
    const url = `${SITE_URL}/fr/securite/${city.slug}`;
    const enUrl = `${SITE_URL}/locations/${city.slug}`;
    const title = clampTitle([
      `Sécurité pour entreprises à ${city.name} | Fortega`,
      `Sécurité à ${city.name}, QC | Fortega`,
    ]);
    const description = clampDescription(
      `Vidéosurveillance, contrôle d'accès, alarmes et surveillance 24/7 pour les entreprises de ${city.name}, QC. Évaluation de site gratuite par Fortega.`,
    );
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "language", content: "fr-CA" },
        ...socialMeta({ title, description, url, type: "article" }),
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "fr-ca", href: url },
        { rel: "alternate", hrefLang: "en-ca", href: enUrl },
        { rel: "alternate", hrefLang: "x-default", href: enUrl },
      ],
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Sécurité au Québec", path: "/fr/securite" },
            { name: city.name, path: `/fr/securite/${city.slug}` },
          ]),
        ),
        jsonLd(faqSchema(frFaqs(city))),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${url}#localbusiness`,
          name: `Fortega — ${city.name}`,
          url,
          inLanguage: "fr-CA",
          telephone: "+1-888-869-1679",
          email: "info@fortega.ca",
          priceRange: "$$",
          areaServed: [
            { "@type": "City", name: city.name },
            { "@type": "AdministrativeArea", name: "Québec" },
          ],
        }),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Page introuvable</h1>
      <Link
        to="/fr/securite"
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-brand-glow/60"
      >
        Voir toutes les villes
      </Link>
    </div>
  ),
  component: FrCityPage,
});

function FrCityPage() {
  const { city } = Route.useLoaderData();
  const faqs = frFaqs(city);
  const others = FR_CITIES.filter((c) => c.slug !== city.slug).slice(0, 12);

  return (
    <div lang="fr-CA">
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Accueil</Link>
            <span>/</span>
            <Link to="/fr/securite" className="hover:text-foreground">Québec</Link>
            <span>/</span>
            <span className="text-foreground">{city.name}</span>
          </nav>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Sécurité pour les entreprises de {city.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Fortega conçoit, installe et surveille la vidéosurveillance, le contrôle d'accès, les
            alarmes et la cybersécurité pour les entreprises de {city.name}, au Québec — avec du
            personnel licencié et un centre de surveillance canadien ouvert 24 h sur 24.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5"
            >
              Évaluation gratuite à {city.name} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/locations/$city"
              params={{ city: city.slug }}
              className="inline-flex items-center rounded-md border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground hover:border-brand-glow/60"
            >
              English version
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Services offerts à {city.name}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FR_SERVICES.map((s) => (
              <div key={s.slug} className="rounded-xl border border-border bg-surface/40 p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Contexte d'affaires et climat
            </h2>
            <p className="mt-4 text-muted-foreground">{FR_FACTS.economy}</p>
            <p className="mt-4 text-muted-foreground">{FR_FACTS.environment}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Permis, Loi 25 et conformité
            </h2>
            <p className="mt-4 text-muted-foreground">{FR_FACTS.licensing}</p>
            <p className="mt-4 text-muted-foreground">{FR_FACTS.privacy}</p>
          </div>
        </div>
      </section>

      <FAQSection
        eyebrow="FAQ"
        title={`Questions fréquentes — ${city.name}`}
        faqs={faqs}
      />

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Autres villes desservies au Québec
          </h2>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/fr/securite/$city"
                params={{ city: c.slug }}
                className="text-muted-foreground hover:text-brand-glow"
              >
                {c.name}
              </Link>
            ))}
            <Link to="/fr/securite" className="font-medium text-brand-glow">
              Toutes les villes du Québec →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
