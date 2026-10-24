import { CITIES, REVIEW_CITY_INVENTORY } from "./cities";
import { SERVICE_AREAS } from "./service-areas";
import { SERVICE_SLUGS } from "./services";

export const COMMUNITY_BY_SLUG = Object.fromEntries(REVIEW_CITY_INVENTORY.map(city => [city.slug, city]));
export const OVERVIEW_CITIES = [...new Map([...CITIES, ...REVIEW_CITY_INVENTORY].map(city => [city.slug, city])).values()];
export function communityServicePath(city: string, service: string) {
  return `/locations/${city}/${service}`;
}
export function getCommunityRedirect(pathname: string): string | undefined {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/location-review") return "/locations";
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "location-review" && parts.length === 3 && COMMUNITY_BY_SLUG[parts[1]] && SERVICE_SLUGS.includes(parts[2])) {
    return communityServicePath(parts[1], parts[2]);
  }
  if (parts[0] === "services" && parts.length === 3 && SERVICE_AREAS.some(area => area.city.slug === parts[2] && area.service.slug === parts[1])) {
    return communityServicePath(parts[2], parts[1]);
  }
  return undefined;
}