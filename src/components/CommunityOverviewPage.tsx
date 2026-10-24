import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Video, KeyRound, Bell, Eye, UserCheck, Lock, Building2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQList } from "@/components/FAQSection";
import type { City } from "@/lib/seo/cities";
import { getLocationServiceDraft } from "@/lib/seo/location-service-drafts";
import { SERVICE_SLUGS } from "@/lib/seo/services";
import { PROVINCE_BY_NAME } from "@/lib/seo/provinces";
import { getRelatedReviewCities } from "@/lib/seo/location-review-links";
import planningImage from "@/assets/smart-building.jpg";

const icons = { cctv: Video, access: KeyRound, intrusion: Bell, remote: Eye, guards: UserCheck, cyber: Lock, smart: Building2, consulting: Search };
const summaries: Record<string, string> = {
  consulting: "Define assessment scope, review existing controls and prioritize security recommendations.",
  cctv: "Plan camera views, lighting, recording retention, cabling and secure playback access.",
  access: "Review doors, credentials, visitor permissions, access schedules and safe exit behaviour.",
  intrusion: "Identify alarm zones, sensors, communication paths and incident escalation procedures.",
  remote: "Define video monitoring hours, event verification, connection alerts and escalation contacts.",
  smart: "Review building controls, supported integrations, schedules, sensors and manual overrides.",
  guards: "Discuss visitor handling, site patrols, access screening and secure incident reporting.",
  cyber: "Review authentication, patching, network separation, backups and incident responsibilities.",
};
export function communityOverviewFaqs(city: City) {
  return [
    { q: `Which security services can I discuss for a ${city.name} property?`, a: "Fortega offers CCTV, access control, intrusion alarms, remote video monitoring, security guard services, building automation, security consulting and cyber security. Start with the building's requirements and the tasks the project needs to support." },
    { q: `Can a security assessment for ${city.name} begin remotely?`, a: "Yes. Drawings, layouts, building types, project details and an existing-equipment inventory can support an initial remote assessment. A drawing review is not automatically a complete site inspection." },
    { q: "What information should I prepare for an assessment?", a: "Prepare the building type, operating hours, relevant layouts, equipment models and intended outcomes. Do not submit passwords, access codes, customer information or sensitive security vulnerabilities through the enquiry form." },
    { q: "How do CCTV, access control and alarms work together?", a: "Each system has a separate purpose: cameras support observation and incident review, access control manages door permissions, and alarms detect selected events. Any integration needs compatible equipment, defined permissions and agreed tests." },
    { q: "What should a security guard requirements discussion cover?", a: "Define duties, intended hours, visitor procedures, patrol observations, supervision, reporting and authorized incident actions. Keep sensitive operational details out of an initial enquiry." },
    { q: "How should connected security equipment be protected?", a: "Use named accounts, strong authentication, timely updates and network separation. Record backup and recovery responsibilities and limit access to recordings, access logs and incident reports." },
  ];
}

export function CommunityOverviewPage({ city }: { city: City }) {
  const province = PROVINCE_BY_NAME[city.province];
  const services = SERVICE_SLUGS.flatMap(slug => { const draft = getLocationServiceDraft(city.slug, slug); return draft ? [draft] : []; });
  const localNotes = [...new Map(services.flatMap(draft => draft.local ? [[draft.local.heading, draft.local] as const] : [])).values()];
  const related = getRelatedReviewCities(city);
  return <>
    <section className="border-b border-border bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-muted-foreground"><Link to="/locations">Locations</Link><span>/</span>{province && <><Link to="/locations/province/$province" params={{ province: province.slug }}>{city.province}</Link><span>/</span></>}<span>{city.name}</span></nav>
        <p className="text-sm font-semibold text-brand-glow">Fortega · {city.province}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl">Security services in {city.name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">Plan CCTV, access control, alarms, video monitoring, security guard requirements, building automation and cyber security for your {city.name} property. Begin with drawings, layouts and project details for a remote security assessment.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><Button asChild size="lg" className="h-auto min-h-12 whitespace-normal py-3"><Link to="/contact">Request a Security Assessment <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="h-auto min-h-12 whitespace-normal py-3"><a href="tel:+18888691679"><Phone />Call 1-888-869-1679</a></Button></div>
      </div>
    </section>
    <section className="border-b border-border"><div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <h2 className="font-display text-3xl font-semibold">Security services for {city.name} projects</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{services.map(draft => { const Icon = icons[draft.service.slug as keyof typeof icons]; return <Link key={draft.service.slug} to="/locations/$city/$service" params={{ city: city.slug, service: draft.service.slug }} className="group min-w-0 rounded-md border border-border bg-surface p-6 transition-colors hover:border-brand-glow"><Icon className="h-6 w-6 text-brand-glow" /><h3 className="mt-4 font-display text-lg font-semibold">{draft.service.shortName}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{summaries[draft.service.slug]}</p><span className="mt-5 inline-flex items-center gap-2 text-sm text-brand-glow">Explore {draft.service.shortName.toLowerCase()} <ArrowRight className="h-4 w-4 shrink-0" /></span></Link>; })}</div>
    </div></section>
    <section className="border-b border-border"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8"><div className="space-y-8 md:col-span-2"><h2 className="font-display text-3xl font-semibold">Planning a {city.name} security project</h2>{localNotes.length ? localNotes.map(note => <article key={note.heading}><h3 className="font-display text-xl font-semibold">{note.heading}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{note.body}</p></article>) : <p className="leading-relaxed text-muted-foreground">Identify the property type, operating hours, existing systems and the tasks that need support. Equipment choices should follow actual door conditions, intended camera views, power, connectivity and operating responsibilities—not a community name alone.</p>}<h3 className="font-display text-xl font-semibold">Drawings, equipment and privacy</h3><p className="leading-relaxed text-muted-foreground">A layout and equipment inventory help connect camera positions, controlled doors, alarm zones and network requirements. Set permissions, recording retention and incident reporting around the property's needs. Keep customer identities and sensitive operational information private.</p></div><figure><img src={planningImage} alt="Connected building and security planning" className="aspect-[4/3] w-full rounded-md object-cover" /></figure></div></section>
    <section className="border-b border-border"><div className="mx-auto max-w-7xl px-4 py-14 md:px-8"><h2 className="font-display text-3xl font-semibold">Security in {city.name} — common questions</h2><FAQList faqs={communityOverviewFaqs(city)} className="mt-8" /><Button asChild size="lg" className="mt-8 h-auto min-h-12 whitespace-normal py-3"><Link to="/contact">Request a Security Assessment <ArrowRight /></Link></Button></div></section>
    <section><div className="mx-auto max-w-7xl px-4 py-12 md:px-8"><h2 className="font-display text-2xl font-semibold">More {city.province} communities</h2><nav aria-label="Related communities" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">{related.map(peer => <Link key={peer.slug} to="/locations/$city" params={{ city: peer.slug }} className="text-brand-glow">{peer.name}</Link>)}{province && <Link to="/locations/province/$province" params={{ province: province.slug }} className="text-brand-glow">{city.province} overview</Link>}<Link to="/locations" className="text-brand-glow">All communities</Link><Link to="/resources" className="text-brand-glow">Fortega guides</Link></nav></div></section>
  </>;
}