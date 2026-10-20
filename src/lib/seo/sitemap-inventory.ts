import { CITIES, REVIEW_CITY_INVENTORY } from "./cities";
import { PROVINCES } from "./provinces";
import { SERVICES, SERVICE_SLUGS } from "./services";
import { SERVICE_AREAS } from "./service-areas";
import { INDUSTRIES } from "./industries";
import { GUIDES } from "./resources";
import { FR_CITIES } from "./fr";
import { getLocationPilot } from "./location-pilots";
import type { SitemapEntry } from "./sitemap";

// Owner-authorized public URLs only; private research and deleted legacy addresses remain absent.
export const SITEMAP_GROUPS = {
  core: [
    ...["/", "/about", "/contact", "/industries", "/privacy", "/terms"].map((path) => ({ path })),
    ...INDUSTRIES.map((industry) => ({ path: `/industries/${industry.slug}` })),
  ],
  services: [
    { path: "/services" },
    ...SERVICES.map((service) => ({ path: `/services/${service.slug}` })),
  ],
  locations: [
    { path: "/locations" },
    ...PROVINCES.map((province) => ({ path: `/locations/province/${province.slug}` })),
    ...CITIES.map((city) => ({
      path: `/locations/${city.slug}`,
      lastmod: getLocationPilot(city.slug)?.updated,
    })),
  ],
  "service-areas": SERVICE_AREAS.map((area) => ({ path: `/services/${area.service.slug}/${area.city.slug}` })),
  resources: [
    { path: "/resources" },
    ...GUIDES.map((guide) => ({ path: `/resources/${guide.slug}` })),
  ],
  fr: [
    { path: "/fr/securite" },
    ...FR_CITIES.map((city) => ({ path: `/fr/securite/${city.slug}` })),
  ],
  communities: [
    { path: "/location-review" },
    ...REVIEW_CITY_INVENTORY.flatMap((city) => SERVICE_SLUGS.map((service) => ({
      path: `/location-review/${city.slug}/${service}`,
    }))),
  ],
} satisfies Record<string, SitemapEntry[]>;

export const SITEMAP_CHILDREN = Object.keys(SITEMAP_GROUPS).map((group) => ({ path: `/sitemap-${group}.xml` }));