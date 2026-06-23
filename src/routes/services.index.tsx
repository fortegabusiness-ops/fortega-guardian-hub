import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, Video, Bell, KeyRound, Eye, UserCheck, Building2, Lock, ArrowRight,
} from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema, SITE_URL, socialMeta } from "@/lib/seo/schema";
import { SERVICES, type ServiceDetail } from "@/lib/seo/services";

const ICONS = { Search, Video, Bell, KeyRound, Eye, UserCheck, Building2, Lock } as const;

const servicesFaqs = [
  { q: "What is the difference between CCTV monitoring and remote guarding?", a: "CCTV monitoring records and reviews video for incidents. Remote guarding adds live operator oversight: virtual patrols, real-time alarm verification, two-way audio intervention and dispatch — turning cameras into an active deterrent rather than a passive record." },
  { q: "Which access control system is right for my business?", a: "It depends on site count, user volume and compliance needs. Cloud-based access control suits multi-site, mobile-credential and remote-managed environments; on-prem suits regulated or air-gapped sites. Fortega designs systems around your operations, then standardizes credentials across all locations." },
  { q: "Do you provide both physical security and cyber security?", a: "Yes. Fortega delivers physical security (CCTV, alarms, access, guards) and cyber security (network defense, endpoint protection, threat monitoring, incident response) as a single program — eliminating the gaps that appear when these are owned by different vendors." },
  { q: "How long does a typical security system installation take?", a: "Small commercial deployments usually run 1–3 weeks from design to commissioning. Enterprise and multi-site rollouts follow a phased schedule with engineering, procurement, installation and cutover milestones agreed up-front." },
  { q: "How does Fortega ensure installation quality?", a: "Every Fortega deployment follows a documented design, install and commissioning workflow aligned to Canadian electrical, security and life-safety standards. Each project ends with a written handover package covering as-built drawings, device inventory, configuration baselines and operator training." },
  { q: "Can Fortega monitor alarms 24/7?", a: "Yes. Our 24/7 monitoring service handles intrusion, panic, environmental and video alarms with verification protocols and pre-agreed dispatch paths to authorities or on-site responders." },
];

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Security Services — CCTV, Access, Monitoring, Cyber | Fortega" },
      { name: "description", content: "Integrated security services across Canada: consulting, CCTV, alarms, access control, remote monitoring, guards, smart building and cyber security." },
      ...socialMeta({
        title: "Security Services — CCTV, Access, Monitoring, Cyber | Fortega",
        description: "Integrated security services across Canada: consulting, CCTV, alarms, access control, remote monitoring, guards, smart building and cyber security.",
        url: `${SITE_URL}/services`,
      }),
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
      ),
      jsonLd(faqSchema(servicesFaqs)),
      ...SERVICES.map((s) =>
        jsonLd(serviceSchema({ name: s.name, description: s.metaDescription, slug: s.slug })),
      ),
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">Services</span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Integrated security services. Engineered end-to-end.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            From consulting to cyber, Fortega delivers every layer of modern enterprise security
            under a single, accountable team.
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services/$service"
                params={{ service: s.slug }}
                className="rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-brand-glow/60 hover:text-foreground"
              >
                {s.name.replace(" & ", " · ").split(" Systems")[0]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divide-y divide-border">
        {SERVICES.map((s, i) => (
          <ServiceSection key={s.slug} block={s} flip={i % 2 === 1} />
        ))}
      </div>

      <FAQSection
        eyebrow="FAQ"
        title="Security services — answered"
        sub="Common questions on integrated security, monitoring, access control and cyber."
        faqs={servicesFaqs}
      />
    </>
  );
}

function ServiceSection({ block, flip }: { block: ServiceDetail; flip: boolean }) {
  const { slug, iconName, name, tagline, bullets, cta } = block;
  const Icon = ICONS[iconName];
  return (
    <section id={slug} className={`scroll-mt-24 py-20 md:py-24 ${flip ? "bg-ink" : "bg-background"}`}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-12 lg:items-center">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground shadow-[0_12px_40px_-12px_var(--brand-glow)]">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">{name}</h2>
          <p className="mt-4 text-muted-foreground">{tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/services/$service"
              params={{ service: slug }}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              Explore {block.shortName.toLowerCase()} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-6 py-3.5 text-sm font-semibold text-foreground hover:border-brand-glow/60"
            >
              {cta}
            </Link>
          </div>
        </div>
        <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 bg-surface p-5 text-sm text-foreground">
                <span className="grid h-7 w-7 flex-none place-items-center rounded-md bg-brand/20 text-brand-glow">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}