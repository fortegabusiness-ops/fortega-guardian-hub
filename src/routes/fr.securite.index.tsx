import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FR_CITIES, FR_SERVICES, FR_FACTS } from "@/lib/seo/fr";
import { breadcrumbSchema, jsonLd, SITE_URL, socialMeta } from "@/lib/seo/schema";
import { clampDescription } from "@/lib/seo/meta";

const URL = `${SITE_URL}/fr/securite`;
const TITLE = "Systèmes de sécurité pour entreprises au Québec | Fortega";
const DESCRIPTION = clampDescription(
  "Vidéosurveillance, contrôle d'accès, alarmes et télésurveillance 24/7 pour les entreprises du Québec. Évaluation de site gratuite : 1-888-869-1679.",
);

export const Route = createFileRoute("/fr/securite/")({
  head: () => ({
    meta: [
      { title: "Sécurité pour entreprises au Québec | Fortega" },
      { name: "description", content: DESCRIPTION },
      { name: "language", content: "fr-CA" },
      ...socialMeta({ title: TITLE, description: DESCRIPTION, url: URL, type: "website" }),
    ],
    links: [
      { rel: "canonical", href: URL },
      { rel: "alternate", hrefLang: "fr-ca", href: URL },
      { rel: "alternate", hrefLang: "en-ca", href: `${SITE_URL}/locations/province/quebec` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/locations/province/quebec` },
    ],
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Sécurité au Québec", path: "/fr/securite" },
        ]),
      ),
    ],
  }),
  component: FrIndex,
});

function FrIndex() {
  return (
    <div lang="fr-CA">
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">
            Québec
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Systèmes de sécurité pour les entreprises du Québec.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Fortega conçoit, installe et surveille des solutions de sécurité intégrées partout au
            Québec : vidéosurveillance, contrôle d'accès, alarmes, télésurveillance et
            cybersécurité, sous la responsabilité d'une seule équipe.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5"
            >
              Demander une évaluation gratuite <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/locations/province/$province"
              params={{ province: "quebec" }}
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
            Nos services au Québec
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
              Permis et encadrement
            </h2>
            <p className="mt-4 text-muted-foreground">{FR_FACTS.licensing}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Loi 25 et renseignements personnels
            </h2>
            <p className="mt-4 text-muted-foreground">{FR_FACTS.privacy}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Villes desservies au Québec
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {FR_CITIES.map((c) => (
              <Link
                key={c.slug}
                to="/fr/securite/$city"
                params={{ city: c.slug }}
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground hover:border-brand-glow/60"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
