import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, Video, Bell, KeyRound, Eye, UserCheck, Building2, Lock, ArrowRight,
} from "lucide-react";
import { FAQSection } from "@/components/FAQSection";
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from "@/lib/seo/schema";

const servicesFaqs = [
  { q: "What is the difference between CCTV monitoring and remote guarding?", a: "CCTV monitoring records and reviews video for incidents. Remote guarding adds live operator oversight: virtual patrols, real-time alarm verification, two-way audio intervention and dispatch — turning cameras into an active deterrent rather than a passive record." },
  { q: "Which access control system is right for my business?", a: "It depends on site count, user volume and compliance needs. Cloud-based access control suits multi-site, mobile-credential and remote-managed environments; on-prem suits regulated or air-gapped sites. Fortega designs systems around your operations, then standardizes credentials across all locations." },
  { q: "Do you provide both physical security and cyber security?", a: "Yes. Fortega delivers physical security (CCTV, alarms, access, guards) and cyber security (network defense, endpoint protection, threat monitoring, incident response) as a single program — eliminating the gaps that appear when these are owned by different vendors." },
  { q: "How long does a typical security system installation take?", a: "Small commercial deployments usually run 1–3 weeks from design to commissioning. Enterprise and multi-site rollouts follow a phased schedule with engineering, procurement, installation and cutover milestones agreed up-front." },
  { q: "Are Fortega technicians licensed and certified?", a: "Yes. Our field technicians and consultants are licensed, vetted and certified on the platforms we deploy, and follow Canadian electrical, security and life-safety standards." },
  { q: "Can Fortega monitor alarms 24/7?", a: "Yes. Our 24/7 monitoring service handles intrusion, panic, environmental and video alarms with verification protocols and pre-agreed dispatch paths to authorities or on-site responders." },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Security Services — CCTV, Access, Monitoring, Cyber | Fortega" },
      { name: "description", content: "Integrated security services across Canada: consulting, CCTV, alarms, access control, remote monitoring, guards, smart building and cyber security." },
      { property: "og:title", content: "Fortega Security Services" },
      { property: "og:description", content: "Consulting, CCTV, alarms, access control, monitoring, guards, automation and cyber security." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
      ),
      jsonLd(faqSchema(servicesFaqs)),
      ...blocks.map((b) =>
        jsonLd(serviceSchema({ name: b.title, description: b.desc, slug: b.id })),
      ),
    ],
  }),
  component: ServicesPage,
});

type ServiceBlock = {
  id: string;
  icon: typeof Search;
  title: string;
  desc: string;
  bullets: string[];
  cta: string;
};

const blocks: ServiceBlock[] = [
  { id: "consulting", icon: Search, title: "Consulting & Professional Services", desc: "Independent expertise to design, validate and optimize your security program.", bullets: ["Security audits", "Risk assessments", "System design", "Compliance consulting", "Project management"], cta: "Schedule a Consultation" },
  { id: "cctv", icon: Video, title: "CCTV & Video Surveillance Systems", desc: "Modern video platforms that deliver clarity, intelligence and operational insight.", bullets: ["Camera installation", "AI video analytics", "Remote viewing", "Video management systems", "Cloud surveillance"], cta: "Request a Site Assessment" },
  { id: "intrusion", icon: Bell, title: "Intrusion & Burglar Alarm Systems", desc: "Reliable intrusion detection for commercial and industrial environments.", bullets: ["Commercial alarms", "Motion detection", "Monitoring systems", "Panic systems", "Environmental sensors"], cta: "Protect Your Property" },
  { id: "access", icon: KeyRound, title: "Access Control Systems", desc: "Manage who goes where — across one site or a national portfolio.", bullets: ["Card access", "Mobile credentials", "Visitor management", "Biometric systems", "Cloud access control"], cta: "Secure Access Now" },
  { id: "remote", icon: Eye, title: "Remote Guarding & Monitoring", desc: "24/7 eyes on your sites with intelligent verification and intervention.", bullets: ["Live monitoring", "Virtual patrols", "Alarm verification", "Remote intervention"], cta: "Learn About Remote Monitoring" },
  { id: "guards", icon: UserCheck, title: "Security Guard Services", desc: "Licensed, trained personnel for on-site presence and response.", bullets: ["On-site guards", "Mobile patrol", "Event security", "Concierge security"], cta: "Request Security Personnel" },
  { id: "smart", icon: Building2, title: "Smart Building & Automation", desc: "Connected buildings that are safer, more efficient and easier to operate.", bullets: ["Building automation", "Smart lighting", "Energy control", "IoT integration"], cta: "Modernize Your Building" },
  { id: "cyber", icon: Lock, title: "Cyber Security", desc: "Protect networks, endpoints and operations from evolving cyber threats.", bullets: ["Network security", "Threat monitoring", "Vulnerability assessments", "Endpoint protection", "Incident response"], cta: "Strengthen Cyber Security" },
];

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
            {blocks.map((b) => (
              <a key={b.id} href={`#${b.id}`} className="rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-brand-glow/60 hover:text-foreground">
                {b.title.replace(" & ", " · ").split(" Systems")[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divide-y divide-border">
        {blocks.map((b, i) => (
          <ServiceSection key={b.id} block={b} flip={i % 2 === 1} />
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

function ServiceSection({ block, flip }: { block: ServiceBlock; flip: boolean }) {
  const { id, icon: Icon, title, desc, bullets, cta } = block;
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-24 ${flip ? "bg-ink" : "bg-background"}`}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-12 lg:items-center">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-glow text-brand-foreground shadow-[0_12px_40px_-12px_var(--brand-glow)]">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">{title}</h2>
          <p className="mt-4 text-muted-foreground">{desc}</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3.5 text-sm font-semibold text-brand-foreground">
            {cta} <ArrowRight className="h-4 w-4" />
          </Link>
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