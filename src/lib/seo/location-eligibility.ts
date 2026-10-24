import { CORE_CITY_SLUGS, isRemovedCity } from "./cities";
import { getLocationPilot } from "./location-pilots";
import { SERVICE_SLUGS } from "./services";
import { COMMUNITY_BY_SLUG } from "./community-addresses";

export function isLocationGone(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "locations" && parts.length === 2) {
    if (COMMUNITY_BY_SLUG[parts[1]]) return false;
    return !getLocationPilot(parts[1]) && isRemovedCity(parts[1]);
  }
  if (parts[0] === "services" && parts.length === 3) {
    if (!SERVICE_SLUGS.includes(parts[1])) return false;
    return isRemovedCity(parts[2]) || (Boolean(getLocationPilot(parts[2])) && !CORE_CITY_SLUGS.includes(parts[2]));
  }
  if (parts[0] === "fr" && parts[1] === "securite" && parts.length === 3) {
    return isRemovedCity(parts[2]);
  }
  return false;
}