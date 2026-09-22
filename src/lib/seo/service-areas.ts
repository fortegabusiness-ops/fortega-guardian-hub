import { CITY_BY_SLUG, type City } from "./cities";
import { SERVICE_BY_SLUG, type ServiceDetail } from "./services";

/**
 * Curated service + city landing pages. Only combinations listed here are
 * rendered and indexed, so we never create thin pages at scale. The pilot set
 * targets queries the site already receives impressions for in Search Console.
 */
export const SERVICE_AREA_COMBOS: { service: string; city: string }[] = [
  { service: "access", city: "chatham" },
  { service: "access", city: "guelph" },
  { service: "access", city: "toronto" },
  { service: "remote", city: "north-york" },
  { service: "remote", city: "etobicoke" },
  { service: "remote", city: "barrie" },
  { service: "remote", city: "estevan" },
  { service: "cctv", city: "toronto" },
  { service: "cctv", city: "mississauga" },
  { service: "intrusion", city: "sudbury" },
  { service: "guards", city: "halifax" },
  { service: "cyber", city: "vancouver" },
];

export type ServiceArea = { service: ServiceDetail; city: City };

function key(service: string, city: string) {
  return `${service}/${city}`;
}

const ALLOWED = new Set(SERVICE_AREA_COMBOS.map((c) => key(c.service, c.city)));

export function isServiceArea(service: string, city: string) {
  return ALLOWED.has(key(service, city));
}

export function getServiceArea(service: string, city: string): ServiceArea | undefined {
  if (!isServiceArea(service, city)) return undefined;
  const s = SERVICE_BY_SLUG[service];
  const c = CITY_BY_SLUG[city];
  if (!s || !c) return undefined;
  return { service: s, city: c };
}

/** Valid combos, resolved to their data. Used for sitemap and cross-linking. */
export const SERVICE_AREAS: ServiceArea[] = SERVICE_AREA_COMBOS.map((c) =>
  getServiceArea(c.service, c.city),
).filter((a): a is ServiceArea => Boolean(a));

/** Other service-area pages in the same city. */
export function areasInCity(citySlug: string, excludeService?: string) {
  return SERVICE_AREAS.filter(
    (a) => a.city.slug === citySlug && a.service.slug !== excludeService,
  );
}

/** Other cities covered by the same service. */
export function areasForService(serviceSlug: string, excludeCity?: string) {
  return SERVICE_AREAS.filter(
    (a) => a.service.slug === serviceSlug && a.city.slug !== excludeCity,
  );
}
