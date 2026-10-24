import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { LOCATION_SERVICE_DRAFTS } from '../src/lib/seo/location-service-drafts';
import { isNonPricingQuestion } from '../src/lib/seo/service-search-content';
import { SERVICE_AREA_COMBOS } from '../src/lib/seo/service-areas';
import { getRelatedReviewCities, REVIEW_RESOURCE_LINKS } from '../src/lib/seo/location-review-links';

type Evidence = { evidenceDecision: string; privateDeliveryReview: string };
type CityResearch = { slug: string; services: Record<string, Evidence> };
const research = JSON.parse(readFileSync('.lovable/local-content-research/full-research-2026-10-20.json', 'utf8')) as { cities: CityResearch[] };
const researchByCity = new Map(research.cities.map(city => [city.slug, city]));
type IndependentDecision = { city: string; service: string; audit: string; decision: string; scope?: unknown; limitations?: unknown; publicationReady: boolean };
const independentPath = '.lovable/local-content-research/independent-followup-decisions-2026-10-20.json';
const independent = existsSync(independentPath)
  ? (JSON.parse(readFileSync(independentPath, 'utf8')) as { records: IndependentDecision[] }).records
  : [];
const followupByDraft = new Map<string, { region: string; record: string; decision: string; independentReviewRequired: boolean; publicationReady: boolean }>();
for (const region of ['west', 'central', 'east', 'other']) {
  const record = `${region}-followup-2026-10-20.json`;
  const path = `.lovable/local-content-research/${record}`;
  if (!existsSync(path)) continue;
  const data = JSON.parse(readFileSync(path, 'utf8')) as CityResearch[] | { cities: CityResearch[] };
  const cities = Array.isArray(data) ? data : data.cities;
  for (const city of cities) for (const [service, evidence] of Object.entries(city.services)) {
    followupByDraft.set(`${city.slug}/${service}`, { region, record, decision: evidence.evidenceDecision, independentReviewRequired: true, publicationReady: false });
  }
}
const quality = JSON.parse(readFileSync('.lovable/location-expansion-quality.json', 'utf8')) as { repeatedBodyGroups: { service: string; cities: string[]; count: number }[] };
const rows = LOCATION_SERVICE_DRAFTS.map(draft => {
  const evidence = researchByCity.get(draft.city.slug)?.services[draft.service.slug];
  const independentDecisions = independent.filter(record => record.city === draft.city.slug && record.service === draft.service.slug);
  const evidenceDisagreement = evidence?.evidenceDecision === 'usable-candidate' && independentDecisions.some(record => ['rejected', 'uncertain', 'out-of-scope', 'needs-source-review', 'unresolved-gap'].includes(record.decision));
  const repeatedGroup = quality.repeatedBodyGroups.find(group => group.service === draft.service.slug && group.cities.includes(draft.city.slug));
  const checks = {
    researchAssessmentRecorded: Boolean(evidence),
    keywordMapped: Boolean(draft.keywords.primary && draft.keywords.secondary.length),
    nonPricingQuestions: draft.faqs.every(faq => isNonPricingQuestion(faq.q)),
    questionCount: draft.faqs.length,
    titleWithinLimit: draft.title.length <= 60,
    descriptionWithinLimit: draft.description.length <= 160,
    citySpecificBodyPresent: Boolean(draft.local),
    sameCityServiceLinks: LOCATION_SERVICE_DRAFTS.filter(other => other.city.slug === draft.city.slug && other.service.slug !== draft.service.slug).length,
    sameProvinceCommunityLinks: getRelatedReviewCities(draft.city).length,
    resourceLinks: REVIEW_RESOURCE_LINKS[draft.service.slug]?.length ?? 0,
    repeatedFullBodyGroupSize: repeatedGroup?.count ?? 0,
    regulatedDeliveryBlocked: draft.status === 'delivery-blocked',
    approvedForPublication: draft.approved,
  };
  const blockers = [
    ...(evidenceDisagreement ? ['baseline-and-followup-evidence-disagreement-requires-resolution'] : []),
    ...(!draft.local ? ['missing-rendered-city-service-evidence'] : ['local-body-editorial-and-source-scope-review-required']),
    ...(evidence?.evidenceDecision !== 'usable-candidate' ? [`research:${evidence?.evidenceDecision ?? 'missing-assessment'}`] : ['candidate-is-not-publication-clearance']),
    ...(repeatedGroup ? ['shared-full-body-requires-substantive-rewrite-or-consolidation'] : []),
    ...(checks.regulatedDeliveryBlocked ? ['unresolved-regulated-service-eligibility'] : []),
    'private-project-delivery-review-required',
    'complete-backup-not-verified',
    'final-rendered-page-validation-required-after-rewrite',
    'explicit-publication-authorization-required',
  ];
  return { city: draft.city.slug, province: draft.city.province, service: draft.service.slug,
    reviewUrl: `/locations/${draft.city.slug}/${draft.service.slug}`,
    proposedProductionUrl: `/locations/${draft.city.slug}/${draft.service.slug}`,
    existingCoreProductionCombination: SERVICE_AREA_COMBOS.some(combo => combo.city === draft.city.slug && combo.service === draft.service.slug),
    researchDecision: evidence?.evidenceDecision ?? 'missing-assessment', checks, blockers,
    followupResearch: followupByDraft.get(`${draft.city.slug}/${draft.service.slug}`) ?? null,
    independentFollowupDecisions: independentDecisions,
    evidenceDisagreement,
    publicationReady: false,
  };
});
const report = {
  reviewedAt: new Date().toISOString(),
  scope: 'All review drafts; research records and code-level content/navigation checks. Not a rendered HTTP audit or publication approval.',
  summary: { rows: rows.length, cities: new Set(rows.map(row => row.city)).size,
    missingLocalBodies: rows.filter(row => !row.checks.citySpecificBodyPresent).length,
    regulatedDeliveryBlocked: rows.filter(row => row.checks.regulatedDeliveryBlocked).length,
    missingResearchAssessments: rows.filter(row => !row.checks.researchAssessmentRecorded).length,
    followupAssessmentsRecorded: rows.filter(row => row.followupResearch !== null).length,
    draftsWithIndependentFollowupDecisions: rows.filter(row => row.independentFollowupDecisions.length > 0).length,
    baselineFollowupDisagreements: rows.filter(row => row.evidenceDisagreement).length,
    nonPricingQuestionFailures: rows.filter(row => !row.checks.nonPricingQuestions).length,
    metadataLengthFailures: rows.filter(row => !row.checks.titleWithinLimit || !row.checks.descriptionWithinLimit).length,
    publicationReady: 0 },
  globalDependencies: [
    'Unsupported combinations need verified substantive local content or an owner-approved consolidation decision.',
    'All 225 guarding drafts require qualified resolution of regulated-service eligibility; public source research cannot establish Fortega eligibility.',
    'Full Cloud database export and storage download require owner actions; source-only archive is not a full Cloud backup.',
    'Google Keyword Planner has no verified accessible account; Trends comparisons are unavailable. These are evidence limitations, not mandatory tools for publication.',
    'Search/AI-answer performance cannot be guaranteed by keyword or FAQ completeness.',
  ], rows,
};
writeFileSync('.lovable/local-content-research/publication-readiness-2026-10-20.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.summary, null, 2));