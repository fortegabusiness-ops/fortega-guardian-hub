import { CITIES, CITY_BY_SLUG, CORE_CITY_SLUGS, type City } from "./cities";
import { SERVICE_BY_SLUG, SERVICE_SLUGS, type ServiceDetail } from "./services";

/**
 * Preserve existing core-market service pages independently of city-only
 * assessment pages. City-page eligibility is not proof of service availability.
 */
export const SERVICE_AREA_COMBOS: { service: string; city: string }[] =
  SERVICE_SLUGS.flatMap((service) => CITIES.filter((c) => CORE_CITY_SLUGS.includes(c.slug)).map((c) => ({ service, city: c.slug })));

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
export function areasInCity(citySlug: string, excludeService?: string, limit?: number) {
  const list = SERVICE_AREAS.filter(
    (a) => a.city.slug === citySlug && a.service.slug !== excludeService,
  );
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Other cities covered by the same service. */
export function areasForService(serviceSlug: string, excludeCity?: string, limit?: number) {
  const list = SERVICE_AREAS.filter(
    (a) => a.service.slug === serviceSlug && a.city.slug !== excludeCity,
  );
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Same service, in cities that share the given city's province. */
export function areasNearCity(serviceSlug: string, city: City, limit = 12) {
  const same = SERVICE_AREAS.filter(
    (a) =>
      a.service.slug === serviceSlug &&
      a.city.slug !== city.slug &&
      a.city.province === city.province,
  );
  const rest = SERVICE_AREAS.filter(
    (a) =>
      a.service.slug === serviceSlug &&
      a.city.slug !== city.slug &&
      a.city.province !== city.province,
  );
  return [...same, ...rest].slice(0, limit);
}
