import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQList } from "@/components/FAQSection";
import { getLocationServiceDraft, LOCATION_SERVICE_DRAFTS } from "@/lib/seo/location-service-drafts";
import { PROVINCE_BY_NAME } from "@/lib/seo/provinces";
import { getRelatedReviewCities, REVIEW_RESOURCE_LINKS } from "@/lib/seo/location-review-links";
import planningImage from "@/assets/smart-building.jpg";

export function LocationServiceDraftPage({ draft }: { draft: NonNullable<ReturnType<typeof getLocationServiceDraft>> }) {
  const { city, service, plan, local, jurisdiction, keywords, searchOverview, faqs, buildings, privacyText } = draft;
  const siblings = LOCATION_SERVICE_DRAFTS.filter((d) => d.city.slug === city.slug && d.service.slug !== service.slug);
  const relatedCities = getRelatedReviewCities(city);
  const province = PROVINCE_BY_NAME[city.province];
  const resources = REVIEW_RESOURCE_LINKS[service.slug] ?? [];
  const assessmentLabels: Record<string, string> = {
    consulting: "Request a Security Assessment",
    cctv: "Request a CCTV Assessment",
    intrusion: "Request an Alarm System Assessment",
    access: "Request an Access Control Assessment",
    remote: "Request a Video Monitoring Assessment",
    guards: "Discuss Security Staffing Requirements",
    smart: "Request a Smart Building Assessment",
    cyber: "Request a Cyber Security Assessment",
  };
  const assessmentLabel = assessmentLabels[service.slug] ?? "Request a Security Assessment";
  return <>
    <section className="border-b border-border bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-muted-foreground"><Link to="/locations">Locations</Link><span>/</span><Link to="/locations/$city" params={{ city: city.slug }}>{city.name}</Link><span>/</span><span>{service.shortName}</span></nav>
        <p className="text-sm font-semibold text-brand-glow">Fortega · {city.province}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">{keywords.primary.charAt(0).toUpperCase() + keywords.primary.slice(1)} for {city.name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{plan.answer}</p>
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button asChild size="lg" className="h-auto min-h-12 whitespace-normal py-3 text-center"><Link to="/contact">{assessmentLabel} <ArrowRight className="shrink-0" /></Link></Button>
          <Button asChild size="lg" variant="outline" className="h-auto min-h-12 whitespace-normal py-3"><a href="tel:+18888691679"><Phone className="shrink-0" />Call 1-888-869-1679</a></Button>
        </div>
      </div>
    </section>
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:grid-cols-12 md:px-8">
        <div className="space-y-12 md:col-span-8">
          {local ? <article><h2 className="font-display text-2xl font-semibold md:text-3xl">{local.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{local.body}</p></article> : <article><h2 className="font-display text-2xl font-semibold">Project-specific requirements</h2><p className="mt-5 leading-relaxed text-muted-foreground">Start with the building type, operating hours, existing systems and the tasks the project needs to support. Drawings and an equipment inventory help identify the questions to resolve before selecting a design.</p></article>}
          <article><h2 className="font-display text-2xl font-semibold md:text-3xl">What to prepare for {service.shortName.toLowerCase()}</h2><ul className="mt-5 space-y-4">{plan.checklist.map((item) => <li key={item} className="flex gap-3 text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-brand-glow" />{item}</li>)}</ul></article>
          {jurisdiction && <article><h2 className="font-display text-2xl font-semibold md:text-3xl">{city.province} context for {service.shortName.toLowerCase()}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{jurisdiction.body}</p><p className="mt-4 leading-relaxed text-muted-foreground">{jurisdiction.application}</p>{province && <Link to="/locations/province/$province" params={{ province: province.slug }} className="mt-4 inline-block text-sm text-brand-glow">Explore {city.province} <ArrowRight className="inline h-4 w-4" /></Link>}</article>}
          {buildings.length > 0 && <article><h2 className="font-display text-2xl font-semibold md:text-3xl">{service.shortName} by building type in {city.name}</h2><dl className="mt-5 space-y-5">{buildings.map((b) => <div key={b.type}><dt className="font-semibold text-foreground">{b.type}</dt><dd className="mt-1 leading-relaxed text-muted-foreground">{b.guidance}</dd></div>)}</dl></article>}
          {privacyText && <article><h2 className="font-display text-2xl font-semibold md:text-3xl">Privacy rules for {service.shortName.toLowerCase()} in {city.province}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{privacyText}</p></article>}
          <article><h2 className="font-display text-2xl font-semibold md:text-3xl">{service.shortName} systems and requirements</h2><p className="mt-5 leading-relaxed text-muted-foreground">{searchOverview}</p></article>
          <article><h2 className="font-display text-2xl font-semibold md:text-3xl">{service.shortName} — common questions</h2><FAQList faqs={faqs} className="mt-6" /></article>
          <div className="border-t border-border pt-8"><Button asChild size="lg" className="h-auto min-h-12 w-full whitespace-normal py-3 text-center sm:w-auto"><Link to="/contact">{assessmentLabel} <ArrowRight className="shrink-0" /></Link></Button></div>
        </div>
        <aside className="space-y-8 md:col-span-4"><figure><img src={planningImage} alt="Illustrative connected-building planning" className="aspect-[4/3] w-full rounded-md object-cover" /></figure><nav aria-label="Other services in this community" className="border-t border-border pt-6"><h2 className="font-display text-xl font-semibold">Other project topics in {city.name}</h2><ul className="mt-4 space-y-3 text-sm">{siblings.map((other) => <li key={other.service.slug}><Link to="/locations/$city/$service" params={{ city: city.slug, service: other.service.slug }} className="text-brand-glow">{other.service.shortName}</Link></li>)}</ul></nav><Button asChild variant="outline" className="h-auto whitespace-normal py-3"><Link to="/services/$service" params={{ service: service.slug }}>About {service.shortName.toLowerCase()} <ArrowRight /></Link></Button>
          <nav aria-label="Same service in other communities" className="border-t border-border pt-6"><h2 className="font-display text-xl font-semibold">{service.shortName} planning in {city.province}</h2><ul className="mt-4 space-y-3 text-sm">{relatedCities.map(other => <li key={other.slug}><Link to="/locations/$city/$service" params={{ city: other.slug, service: service.slug }} className="text-brand-glow">{other.name} — {service.shortName}</Link></li>)}<li><Link to="/locations" search={{ province: city.province, service: service.slug }} className="text-brand-glow">All {service.shortName.toLowerCase()} topics in {city.province}</Link></li>{province && <li><Link to="/locations/province/$province" params={{ province: province.slug }} className="text-brand-glow">{city.province} overview</Link></li>}</ul></nav>
          <nav aria-label="Related Fortega guides" className="border-t border-border pt-6"><h2 className="font-display text-xl font-semibold">Related guides</h2><ul className="mt-4 space-y-3 text-sm">{resources.map(resource => <li key={resource.slug}><Link to="/resources/$slug" params={{ slug: resource.slug }} className="text-brand-glow">{resource.label}</Link></li>)}<li><Link to="/resources" className="text-brand-glow">All Fortega guides</Link></li></ul></nav>
        </aside>
      </div>
    </section>
  </>;
}