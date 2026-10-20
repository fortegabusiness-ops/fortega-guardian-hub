import { readFileSync, writeFileSync } from 'node:fs';
import { REVIEW_CITY_INVENTORY } from '../src/lib/seo/cities';
import { SERVICE_AREA_COMBOS } from '../src/lib/seo/service-areas';
import { SERVICE_SLUGS } from '../src/lib/seo/services';
import { SERVICE_KEYWORDS } from '../src/lib/seo/service-keywords';
import { LOCATION_SERVICE_DRAFTS } from '../src/lib/seo/location-service-drafts';
import { compareDrafts, substantiveTokens } from '../src/lib/seo/location-draft-quality';
const cities = REVIEW_CITY_INVENTORY;
const rows = cities.flatMap(city => SERVICE_SLUGS.map(service=> {
 const draft = LOCATION_SERVICE_DRAFTS.find(d=>d.city.slug===city.slug&&d.service.slug===service);
 return {city:city.slug, cityName:city.name, province:city.province, service, target:`/services/${service}/${city.slug}`, keyword:SERVICE_KEYWORDS[service as keyof typeof SERVICE_KEYWORDS].primary, reviewUrl:draft?`/location-review/${city.slug}/${service}`:null, status:draft?.status??'needs-city-research', currentlyEligible:SERVICE_AREA_COMBOS.some(a=>a.city===city.slug&&a.service===service), approvedForExpansion:false};
}));
writeFileSync('.lovable/location-expansion-inventory.json',JSON.stringify({asOf:'2026-10-19',cities:cities.length,provinces:new Set(cities.map(c=>c.province)).size,targets:rows.length,rows},null,2));
const comparisons = SERVICE_SLUGS.flatMap(service=>compareDrafts(LOCATION_SERVICE_DRAFTS.filter(d=>d.service.slug===service && d.local).map(d=>({id:`${d.city.slug}/${service}`,city:d.city.name,province:d.city.province,text:d.local?.body??''}))));
const repeatedBodyGroups = SERVICE_SLUGS.flatMap(service => {
 const groups = new Map<string, string[]>();
 for (const draft of LOCATION_SERVICE_DRAFTS.filter(d => d.service.slug === service)) {
  const text = [draft.plan.answer, ...draft.plan.checklist, draft.searchOverview, draft.jurisdiction?.body ?? '', draft.jurisdiction?.application ?? '', ...draft.faqs.flatMap(faq => [faq.q, faq.a]), draft.local?.body ?? ''].join(' ');
  const normalized = substantiveTokens({id:draft.city.slug,city:draft.city.name,province:draft.city.province,text}).join(' ');
  const group = groups.get(normalized) ?? []; group.push(draft.city.slug); groups.set(normalized, group);
 }
 return [...groups.values()].filter(group => group.length > 1).map(cities => ({ service, cities, count: cities.length, status: 'shared-body-not-distinct-city-content' }));
});
const report = {method:'City/province names and URLs normalized; five-word/trigram/token similarity for local bodies only. Separately group full editorial bodies to expose shared drafts. Navigation, headings and delivery copy excluded. Lexical scores are triage, not policy certification.',checks:{cities:cities.length,provinces:new Set(cities.map(c=>c.province)).size,targets:rows.length,reviewDrafts:LOCATION_SERVICE_DRAFTS.length,localBodies:LOCATION_SERVICE_DRAFTS.filter(d=>d.local).length,pairComparisons:comparisons.length,exactNameSwaps:comparisons.filter(p=>p.exactNameSwap).length,maxJaccard:Math.max(...comparisons.map(p=>p.jaccard)),maxContainment:Math.max(...comparisons.map(p=>p.containment)),maxTokenJaccard:Math.max(...comparisons.map(p=>p.tokenJaccard)),maxTrigramJaccard:Math.max(...comparisons.map(p=>p.trigramJaccard)),draftsMissingServiceSpecificLocalResearch:LOCATION_SERVICE_DRAFTS.filter(d=>!d.local).length,deliveryBlocked:LOCATION_SERVICE_DRAFTS.filter(d=>d.status==='delivery-blocked').length,uncreatedTargets:rows.filter(r=>!r.reviewUrl).length,repeatedBodyGroups:repeatedBodyGroups.length},comparisons,repeatedBodyGroups};
writeFileSync('.lovable/location-expansion-quality.json',JSON.stringify(report,null,2));
writeFileSync('.lovable/location-keyword-map.json',JSON.stringify({source:'Semrush',database:'ca',asOf:'2026-10-19',notes:'Point-in-time Canadian estimates. No town-level volume established. Related tool suggestions included irrelevant queries and malformed phrases: excluded. Demand does not prove service eligibility or guarantee rank.',services:SERVICE_KEYWORDS},null,2));
console.log(JSON.stringify(report.checks,null,2));
