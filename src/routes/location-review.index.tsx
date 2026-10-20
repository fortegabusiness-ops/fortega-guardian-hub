import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { REVIEW_CITY_INVENTORY } from "@/lib/seo/cities";
import { SERVICE_SLUGS, SERVICE_BY_SLUG } from "@/lib/seo/services";
import { getLocationServiceDraft } from "@/lib/seo/location-service-drafts";
import { Input } from "@/components/ui/input";
import { SITE_URL } from "@/lib/seo/schema";

export const Route = createFileRoute("/location-review/")({
  head: () => ({
    meta: [{ title: "City-service draft directory | Fortega" }, { name: "description", content: "Review security planning drafts for 225 Canadian communities across eight service topics." }, { name: "robots", content: "noindex, nofollow" }, { property: "og:title", content: "City-service draft directory | Fortega" }, { property: "og:description", content: "Fortega's Canadian city-service content review directory." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/location-review` }],
  }),
  component: ReviewDirectory,
});

function ReviewDirectory() {
  const [search, setSearch] = useState("");
  const cities = REVIEW_CITY_INVENTORY.filter(city => `${city.name} ${city.province}`.toLowerCase().includes(search.toLowerCase()));
  return <main className="mx-auto max-w-7xl px-4 py-16 md:px-8">
    <h1 className="font-display text-4xl font-bold">City-service review</h1>
    <p className="mt-4 text-muted-foreground">225 communities · 1,800 drafts · no production restoration approved</p>
    <label htmlFor="city-search" className="mt-8 block text-sm font-semibold">Find a community or province</label>
    <Input id="city-search" value={search} onChange={event => setSearch(event.target.value)} className="mt-3 max-w-xl" />
    <p className="mt-6 text-sm text-muted-foreground">{cities.length} communities</p>
    <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[800px] text-left text-sm"><thead><tr className="border-b border-border"><th className="p-3">Community</th>{SERVICE_SLUGS.map(slug => <th key={slug} className="p-3">{SERVICE_BY_SLUGS_PLACEHOLDER}</th>)}</tr></thead><tbody>{cities.map(city => <tr key={city.slug} className="border-b border-border"><th className="p-3 font-medium">{city.name}<span className="mt-1 block text-xs text-muted-foreground">{city.province}</span></th>{SERVICE_SLUGS.map(service => { const draft = getLocationServiceDraft(city.slug, service); return <td key={service} className="p-3"><Link to="/location-review/$city/$service" params={{ city: city.slug, service }} className="text-brand-glow underline underline-offset-4">Open draft</Link><span className="mt-2 block text-xs text-muted-foreground">{draft?.local ? "Local review required" : "Local research missing"}</span></td>; })}</tr>)}</tbody></table></div>
  </main>;
}