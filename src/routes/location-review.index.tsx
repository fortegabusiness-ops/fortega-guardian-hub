import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { REVIEW_CITY_INVENTORY } from "@/lib/seo/cities";
import { SERVICE_SLUGS, SERVICE_BY_SLUG } from "@/lib/seo/services";
import { getLocationServiceDraft } from "@/lib/seo/location-service-drafts";
import { Input } from "@/components/ui/input";
import { SITE_URL } from "@/lib/seo/schema";

export const Route = createFileRoute("/location-review/")({
  validateSearch: (search: Record<string, unknown>): { province?: string; service?: string } => ({ province: typeof search.province === "string" ? search.province : undefined, service: typeof search.service === "string" && SERVICE_SLUGS.includes(search.service) ? search.service : undefined }),
  head: () => ({
    meta: [{ title: "Community Security Services Directory | Fortega" }, { name: "description", content: "Explore security planning for 225 Canadian communities across eight service topics." }, { name: "robots", content: "index, follow" }, { property: "og:title", content: "Community Security Services Directory | Fortega" }, { property: "og:description", content: "Security planning topics for 225 Canadian communities." }, { property: "og:url", content: `${SITE_URL}/location-review` }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/location-review` }],
  }),
  component: ReviewDirectory,
});

function ReviewDirectory() {
  const filters = Route.useSearch();
  const [search, setSearch] = useState("");
  const services = filters.service ? SERVICE_SLUGS.filter(service => service === filters.service) : SERVICE_SLUGS;
  const cities = REVIEW_CITY_INVENTORY.filter(city => (!filters.province || city.province === filters.province) && `${city.name} ${city.province}`.toLowerCase().includes(search.toLowerCase()));
  return <main className="mx-auto max-w-7xl px-4 py-16 md:px-8">
    <h1 className="font-display text-4xl font-bold">City-service review</h1>
    <p className="mt-4 text-muted-foreground">225 communities · 1,800 drafts · no production restoration approved</p>
    {(filters.province || filters.service) && <div className="mt-4 flex flex-wrap items-center gap-4 text-sm"><span>{filters.province}{filters.service ? ` · ${SERVICE_BY_SLUG[filters.service]?.shortName}` : ""}</span><Link to="/location-review" search={{ province: "", service: "" }} className="text-brand-glow underline underline-offset-4">All communities and services</Link></div>}
    <label htmlFor="city-search" className="mt-8 block text-sm font-semibold">Find a community or province</label>
    <Input id="city-search" value={search} onChange={event => setSearch(event.target.value)} className="mt-3 max-w-xl" />
    <p className="mt-6 text-sm text-muted-foreground">{cities.length} communities</p>
    <div className="mt-6 overflow-x-auto"><table className={`w-full text-left text-sm ${services.length > 1 ? "min-w-[800px]" : ""}`}><thead><tr className="border-b border-border"><th className="p-3">Community</th>{services.map(slug => <th key={slug} className="p-3">{SERVICE_BY_SLUG[slug]?.shortName}</th>)}</tr></thead><tbody>{cities.map(city => <tr key={city.slug} className="border-b border-border"><th className="p-3 font-medium">{city.name}<span className="mt-1 block text-xs text-muted-foreground">{city.province}</span></th>{services.map(service => { const draft = getLocationServiceDraft(city.slug, service); return <td key={service} className="p-3"><Link to="/location-review/$city/$service" params={{ city: city.slug, service }} className="text-brand-glow underline underline-offset-4">Open draft</Link><span className="mt-2 block text-xs text-muted-foreground">{draft?.local ? "Local review required" : "Local research missing"}</span></td>; })}</tr>)}</tbody></table></div>
  </main>;
}