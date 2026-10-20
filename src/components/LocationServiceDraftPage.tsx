import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocationServiceDraft, LOCATION_SERVICE_DRAFTS } from "@/lib/seo/location-service-drafts";
import { CITY_BY_SLUG } from "@/lib/seo/cities";
import planningImage from "@/assets/smart-building.jpg";

export function LocationServiceDraftPage({ draft }: { draft: NonNullable<ReturnType<typeof getLocationServiceDraft>> }) {
  const { city, service, plan, local, keywords, searchOverview, faqs } = draft;
  const siblings = LOCATION_SERVICE_DRAFTS.filter((d) => d.city.slug === city.slug && d.service.slug !== service.slug);
  return <>
    <section className="border-b border-border bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-muted-foreground"><Link to="/location-review">Review directory</Link><span>/</span>{CITY_BY_SLUG[city.slug] ? <Link to="/locations/$city" params={{ city: city.slug }}>{city.name}</Link> : <span>{city.name}</span>}<span>/</span><span>{service.shortName}</span></nav>
        <p className="text-sm font-semibold text-brand-glow">Fortega · {city.province}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">{keywords.primary.charAt(0).toUpperCase() + keywords.primary.slice(1)} for {city.name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{plan.answer}</p>
        <Button asChild size="lg" className="mt-8 h-auto whitespace-normal py-3"><Link to="/contact">Discuss your project <ArrowRight /></Link></Button>
      </div>
    </section>
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:grid-cols-12 md:px-8">
        <div className="space-y-12 md:col-span-8">
          {local ? <article><h2 className="font-display text-2xl font-semibold md:text-3xl">{local.heading}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{local.body}</p><a href={local.sourceUrl} className="mt-4 inline-block text-sm text-brand-glow underline underline-offset-4">{local.sourceTitle}</a>{city.slug === "dawson" && service.slug === "cctv" && <p className="mt-3 text-sm"><a href="https://dawsoncity.ca/plan-your-trip/getting-here/" className="text-brand-glow underline underline-offset-4">Dawson travel routes</a></p>}{city.slug === "happy-valley-goose-bay" && service.slug === "cctv" && <p className="mt-3 text-sm"><a href="https://townhvgb.com/reminder-about-traffic-regulations-snow-clearing-policies/" className="text-brand-glow underline underline-offset-4">Town winter parking and snow-clearing notice</a></p>}</article> : <article><h2 className="font-display text-2xl font-semibold">Project-specific requirements</h2><p className="mt-5 leading-relaxed text-muted-foreground">{service.slug === "guards" ? "Personnel availability and delivery eligibility have not been confirmed. No local coverage is offered by this draft." : "The public sources reviewed do not establish a distinct local requirement for this service. Assess the organization's systems and scope rather than assume that a town name changes the recommendation."}</p></article>}
          <article><h2 className="font-display text-2xl font-semibold md:text-3xl">What to prepare for {service.shortName.toLowerCase()}</h2><ul className="mt-5 space-y-4">{plan.checklist.map((item) => <li key={item} className="flex gap-3 text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-brand-glow" />{item}</li>)}</ul></article>
          <article><h2 className="font-display text-2xl font-semibold md:text-3xl">{service.shortName} systems and requirements</h2><p className="mt-5 leading-relaxed text-muted-foreground">{searchOverview}</p></article>
          <article><h2 className="font-display text-2xl font-semibold md:text-3xl">{service.shortName} — common questions</h2><dl className="mt-6 space-y-8">{faqs.map(faq => <div key={faq.q}><dt className="font-display text-xl font-semibold">{faq.q}</dt><dd className="mt-3 leading-relaxed text-muted-foreground">{faq.a}</dd></div>)}</dl></article>
        </div>
        <aside className="space-y-8 md:col-span-4"><figure><img src={planningImage} alt="Illustrative connected-building planning" className="aspect-[4/3] w-full rounded-md object-cover" /></figure><div className="border-t border-border pt-6"><h2 className="font-display text-xl font-semibold">Project availability</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">The requested service, installation arrangements, travel costs and support need confirmation after assessment. No local office, partner or attendance time is assumed.</p></div><div className="border-t border-border pt-6"><h2 className="font-display text-xl font-semibold">Other project topics</h2><ul className="mt-4 space-y-3 text-sm">{siblings.map((other) => <li key={other.service.slug}><Link to="/location-review/$city/$service" params={{ city: city.slug, service: other.service.slug }} className="text-brand-glow">{other.service.shortName}</Link></li>)}</ul></div><Button asChild variant="outline" className="h-auto whitespace-normal py-3"><Link to="/services/$service" params={{ service: service.slug }}>About {service.shortName.toLowerCase()} <ArrowRight /></Link></Button></aside>
      </div>
    </section>
  </>;
}