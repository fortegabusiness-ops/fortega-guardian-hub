import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LocationPilot } from "@/lib/seo/location-pilots";
import { PROVINCE_BY_NAME } from "@/lib/seo/provinces";
import planningImage from "@/assets/smart-building.jpg";

function InlineText({ text }: { text: string }) {
  const pieces = text.split(/(\[[^\]]+\]\(https:\/\/[^)]+\)|\*\*[^*]+\*\*)/g);
  return <>{pieces.map((piece, index) => {
    const link = piece.match(/^\[([^\]]+)\]\((https:\/\/[^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} className="text-brand-glow underline underline-offset-4">{link[1]}</a>;
    if (piece.startsWith("**") && piece.endsWith("**")) return <strong key={index} className="font-semibold text-foreground">{piece.slice(2, -2)}</strong>;
    return <span key={index}>{piece}</span>;
  })}</>;
}

function Paragraph({ text }: { text: string }) {
  if (text.startsWith("- ")) return <ul className="list-disc space-y-2 pl-5">{text.split("\n").map((item) => <li key={item}><InlineText text={item.replace(/^- /, "")} /></li>)}</ul>;
  return <p><InlineText text={text} /></p>;
}

export function LocationAssessmentPage({ pilot }: { pilot: LocationPilot }) {
  const province = PROVINCE_BY_NAME[pilot.province];
  const introduction = pilot.sections[0];
  return <>
    <section className="border-b border-border bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-muted-foreground">
          <Link to="/">Home</Link><span>/</span><Link to="/locations">Locations</Link><span>/</span><span className="text-foreground">{pilot.name}</span>
        </nav>
        <p className="text-sm font-semibold text-brand-glow">Fortega · {pilot.province}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">{introduction.heading}</h1>
        <div className="mt-6 max-w-3xl space-y-4 text-lg text-muted-foreground">{introduction.paragraphs.map((text) => <Paragraph key={text} text={text} />)}</div>
        <Button asChild size="lg" className="mt-8 h-auto whitespace-normal py-3 text-left"><Link to="/contact">Request a {pilot.name} assessment <ArrowRight /></Link></Button>
      </div>
    </section>
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-8">
          {pilot.sections.slice(1).map((section) => <article key={section.heading} className="mb-12 last:mb-0">
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">{section.heading}</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">{section.paragraphs.map((text) => <Paragraph key={text} text={text} />)}</div>
          </article>)}
        </div>
        <aside className="space-y-8 md:col-span-4">
          <figure><img src={planningImage} alt="Illustrative smart-building security planning" className="aspect-[4/3] w-full rounded-md object-cover" /><figcaption className="mt-2 text-xs text-muted-foreground">Illustrative image, not a customer installation.</figcaption></figure>
          <div className="border-t border-border pt-6"><h2 className="font-display text-xl font-semibold">Project availability</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Services, installation arrangements, travel costs and ongoing support are confirmed after assessment. No local office, partner or response time is promised.</p></div>
          <div className="border-t border-border pt-6"><h2 className="font-display text-xl font-semibold">Keep the first enquiry non-sensitive</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Do not send passwords or access codes through the contact form. Confirm a suitable method before sharing detailed security drawings.</p></div>
          {province && <Link to="/locations/province/$province" params={{ province: province.slug }} className="inline-flex items-center gap-2 text-sm text-brand-glow">{province.name} overview <ArrowRight className="h-4 w-4" /></Link>}
          <Link to="/services" className="flex items-center gap-2 text-sm text-brand-glow">Explore Fortega services <ArrowRight className="h-4 w-4" /></Link>
        </aside>
      </div>
    </section>
    <section className="bg-ink"><div className="mx-auto max-w-7xl px-4 py-12 md:px-8"><h2 className="font-display text-2xl font-semibold">Discuss your {pilot.name} project</h2><Button asChild size="lg" className="mt-6"><Link to="/contact">Request an assessment <ArrowRight /></Link></Button></div></section>
  </>;
}