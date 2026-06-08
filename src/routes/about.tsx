import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Lightbulb, Handshake, Award, Heart, ArrowRight } from "lucide-react";
import buildingImg from "@/assets/smart-building.jpg";
import logo from "@/assets/fortega-logo.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Fortega — Canadian Integrated Security Company" },
      { name: "description", content: "Fortega is a Canadian electronic security company delivering integrated security, monitoring, automation and cyber security solutions." },
      { property: "og:title", content: "About Fortega" },
      { property: "og:description", content: "Integrated security, monitoring, automation and cyber security solutions across Canada." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, t: "Integrity", d: "We operate with transparency and uncompromising ethics." },
  { icon: Lightbulb, t: "Innovation", d: "We embrace emerging technology to elevate protection." },
  { icon: Handshake, t: "Reliability", d: "We deliver consistent results clients can depend on." },
  { icon: Award, t: "Excellence", d: "We hold every install and service to the highest standard." },
  { icon: Heart, t: "Customer Focus", d: "We design every solution around our client's outcomes." },
];

function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.55_0.18_252/0.18),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">About Us</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            A Canadian security company built on engineering, trust and innovation.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Fortega is a Canadian electronic security company delivering integrated security,
            monitoring, automation and cyber security solutions for organizations of every scale.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img src={buildingImg} alt="Modern smart commercial building" loading="lazy" width={1600} height={1000} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Company Overview</h2>
            <p className="mt-5 text-muted-foreground">
              We protect people, property and operations through intelligent, integrated systems —
              combining best-in-class hardware, software and human expertise to deliver outcomes
              that scale. Our team partners with corporations, institutions and critical
              infrastructure operators across Canada.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Card title="Our Mission" body="To protect people, property and operations through intelligent security solutions." />
              <Card title="Our Vision" body="To become a trusted national leader in integrated security systems." />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-ink py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-glow">Core Values</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">What guides every decision we make.</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {values.map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-surface p-7">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-glow text-brand-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-glow">Why Fortega</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              Expertise, technology and end-to-end capability — under one roof.
            </h2>
          </div>
          <div className="space-y-6 lg:col-span-7">
            <p className="text-muted-foreground">
              Fortega's strength is the depth of our team. Our consultants, engineers and field
              technicians collaborate across every project to ensure systems are designed to
              standards, built to last and supported with discipline. From physical security
              hardware to cyber defense, we provide a single point of accountability for the
              entire security program.
            </p>
            <p className="text-muted-foreground">
              We invest in the most advanced platforms in video analytics, access control,
              automation and threat detection — then engineer them into solutions that deliver
              real operational value. The result: fewer vendors, fewer gaps and a security
              posture you can measure.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3.5 text-sm font-semibold text-brand-foreground">
              Speak with a Security Expert <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-ink py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center md:px-8">
          <div className="overflow-hidden rounded-xl border border-border bg-[#f5f1e8] p-6">
            <img src={logo.url} alt="Fortega — Security, Innovation, Strength" width={520} height={120} className="h-auto w-[260px] md:w-[420px]" />
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Security · Innovation · Strength</p>
        </div>
      </section>
    </>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}