import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, Video, Bell, KeyRound, Eye, UserCheck, Building2, Lock,
  Award, Layers, BadgeCheck, Headphones, TrendingUp, MapPin, ArrowRight,
  Search, PenTool, Wrench, LifeBuoy, Network,
} from "lucide-react";
import heroImg from "@/assets/hero-ops.jpg";
import cyberBg from "@/assets/cyber-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fortega — Integrated Security Solutions for Modern Businesses" },
      { name: "description", content: "Advanced electronic security, CCTV, access control, monitoring, automation and cyber security solutions across Canada." },
      { property: "og:title", content: "Fortega — Integrated Security Solutions" },
      { property: "og:description", content: "Electronic security, monitoring, automation and cyber security across Canada." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const whyChoose = [
  { icon: Award, title: "Industry Expertise", desc: "Decades of combined experience securing enterprise environments." },
  { icon: Layers, title: "End-to-End Solutions", desc: "From audit and design to install, integration and lifecycle support." },
  { icon: BadgeCheck, title: "Certified Professionals", desc: "Licensed, vetted technicians and security consultants." },
  { icon: Headphones, title: "24/7 Monitoring & Support", desc: "Around-the-clock operations center and rapid response." },
  { icon: TrendingUp, title: "Scalable Systems", desc: "Architectures that grow with your sites, users and risk profile." },
  { icon: MapPin, title: "National Coverage", desc: "Trusted partner serving organizations coast to coast in Canada." },
];

const services = [
  { icon: Search, title: "Consulting & Professional Services", desc: "Security audits, risk assessments, design and compliance." },
  { icon: Video, title: "CCTV & Video Surveillance", desc: "AI analytics, VMS platforms and cloud-managed cameras." },
  { icon: Bell, title: "Intrusion & Burglar Alarms", desc: "Commercial alarm, motion, panic and environmental sensors." },
  { icon: KeyRound, title: "Access Control Systems", desc: "Card, mobile, biometric and cloud access platforms." },
  { icon: Eye, title: "Remote Guarding & Monitoring", desc: "Live monitoring, virtual patrols and alarm verification." },
  { icon: UserCheck, title: "Security Guard Services", desc: "On-site, mobile patrol, concierge and event security." },
  { icon: Building2, title: "Smart Building & Automation", desc: "Automation, lighting, energy and IoT integration." },
  { icon: Lock, title: "Cyber Security", desc: "Network defense, threat monitoring and incident response." },
];

const process = [
  { icon: Search, step: "01", title: "Consult", desc: "Understand client needs, risks and operational context." },
  { icon: PenTool, step: "02", title: "Design", desc: "Build tailored, standards-based security architectures." },
  { icon: Wrench, step: "03", title: "Implement", desc: "Professional installation, integration and commissioning." },
  { icon: LifeBuoy, step: "04", title: "Support", desc: "Ongoing monitoring, maintenance and lifecycle care." },
];

const trust = [
  "Customized Security Solutions",
  "Industry-Leading Technology",
  "Experienced Security Experts",
  "End-to-End Project Delivery",
  "Scalable Systems for Growth",
  "24/7 Support",
];

const ecosystem = [
  { icon: Video, label: "CCTV Surveillance" },
  { icon: Bell, label: "Intrusion Alarms" },
  { icon: KeyRound, label: "Access Control" },
  { icon: Eye, label: "Remote Monitoring" },
  { icon: UserCheck, label: "Guard Services" },
  { icon: Building2, label: "Smart Automation" },
  { icon: Lock, label: "Cyber Security" },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Fortega security operations center" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.18_252/0.25),transparent_55%)]" />
        </div>
        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center px-4 py-24 md:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-glow" /> Security · Innovation · Strength
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Integrated Security Solutions for{" "}
              <span className="bg-gradient-to-r from-foreground via-brand-glow to-foreground bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Fortega delivers advanced electronic security, monitoring, automation, and cyber
              security solutions across Canada — engineered to protect people, property and
              operations with precision.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-[0_12px_40px_-12px_var(--brand-glow)] transition-transform hover:-translate-y-0.5"
              >
                Request a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/50 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur hover:bg-surface"
              >
                Explore Services
              </Link>
            </div>

            <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8">
              {[["24/7","Monitoring"],["Canada","National Coverage"],["End-to-End","Delivery"]].map(([n,l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-bold text-foreground md:text-3xl">{n}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE FORTEGA */}
      <section className="border-t border-border bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Why Choose Fortega"
            title="A security partner engineered for enterprise"
            sub="We combine elite engineering, proven technology and a relentless service standard so your organization stays protected."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative bg-surface p-8 transition-colors hover:bg-surface-elevated">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand/30 to-brand-glow/20 ring-1 ring-brand-glow/30">
                  <Icon className="h-5 w-5 text-brand-glow" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative border-t border-border py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center_top,oklch(0.55_0.18_252/0.12),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="One partner. Every layer of security."
            sub="Eight integrated practice areas — designed, deployed and supported by Fortega specialists."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand-glow/60 hover:bg-surface-elevated">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-glow text-brand-foreground shadow-[0_8px_30px_-12px_var(--brand-glow)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold leading-snug text-foreground">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <Link to="/services" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-glow">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="border-t border-border bg-ink py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="A disciplined path from risk to resilience"
            sub="A repeatable, transparent methodology that delivers measurable outcomes."
          />
          <div className="relative mt-16 grid gap-6 lg:grid-cols-4">
            <div className="absolute inset-x-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
            {process.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="relative rounded-xl border border-border bg-surface p-7">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-glow text-brand-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-bold text-border">{step}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="border-t border-border py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center md:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-glow">Why Businesses Trust Fortega</span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Security built on engineering rigor and operational discipline.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From single-site installations to multi-province rollouts, organizations choose
              Fortega for clarity of design, quality of execution and consistency of support.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {trust.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-brand-glow" />
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3.5 text-sm font-semibold text-brand-foreground">
              Speak with a Security Expert <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand/30 to-brand-glow/10 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={cyberBg} alt="Cyber security network" loading="lazy" width={1600} height={900} className="aspect-[16/10] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="border-t border-border bg-ink py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading
            eyebrow="Security Solutions Overview"
            title="One unified security ecosystem"
            sub="Every Fortega service is engineered to interoperate — surveillance, alarms, access, monitoring, automation and cyber working as a single coordinated system."
          />
          <div className="relative mt-20">
            <div className="mx-auto grid max-w-5xl place-items-center">
              <div className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
                <div className="absolute inset-0 -z-10 m-auto h-48 w-48 rounded-full bg-gradient-to-br from-brand/40 to-brand-glow/20 blur-3xl" />
                {ecosystem.map(({ icon: Icon, label }) => (
                  <div key={label} className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5 text-center transition-colors hover:border-brand-glow/60">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-glow text-brand-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <Network className="h-3.5 w-3.5 text-brand-glow" /> Unified by Fortega Integration Platform
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-5xl px-4 text-center md:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Ready to protect what matters most?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Talk to a Fortega specialist about a tailored security assessment for your organization.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-7 py-4 text-sm font-semibold text-brand-foreground shadow-[0_14px_40px_-12px_var(--brand-glow)]">
            Request a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="max-w-3xl">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-glow">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">{title}</h2>
      <p className="mt-4 text-muted-foreground">{sub}</p>
    </div>
  );
}
