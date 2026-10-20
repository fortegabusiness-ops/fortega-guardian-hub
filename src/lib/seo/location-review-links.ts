import { REVIEW_CITY_INVENTORY, type City } from "./cities";

/** A stable province-local ring makes every same-service draft reachable without geographic proximity claims. */
export function getRelatedReviewCities(city: City): City[] {
  const peers = REVIEW_CITY_INVENTORY.filter(item => item.province === city.province).sort((a, b) => a.name.localeCompare(b.name));
  const index = peers.findIndex(item => item.slug === city.slug);
  if (index < 0 || peers.length < 2) return [];
  const offsets = [-1, 1, 2, 3];
  const seen = new Set([city.slug]);
  return offsets.flatMap(offset => {
    const peer = peers[(index + offset + peers.length) % peers.length];
    if (!peer || seen.has(peer.slug)) return [];
    seen.add(peer.slug);
    return [peer];
  });
}

export const REVIEW_RESOURCE_LINKS: Record<string, { slug: string; label: string }[]> = {
  cctv: [{ slug: "how-many-security-cameras-does-my-business-need", label: "Planning camera coverage" }, { slug: "cctv-privacy-rules-canada", label: "CCTV privacy planning" }],
  access: [{ slug: "choosing-a-commercial-access-control-system", label: "Choosing access control" }, { slug: "integrating-access-control-and-cctv", label: "Connecting access control and CCTV" }],
  intrusion: [{ slug: "reduce-false-alarms-commercial", label: "Reducing unwanted alarm activations" }],
  remote: [{ slug: "remote-guarding-vs-security-guards", label: "Video monitoring and on-site duties" }, { slug: "cctv-privacy-rules-canada", label: "Video privacy planning" }],
  guards: [{ slug: "remote-guarding-vs-security-guards", label: "Comparing monitoring and staffing tasks" }],
  smart: [{ slug: "security-system-cyber-hardening", label: "Protecting connected building systems" }],
  cyber: [{ slug: "security-system-cyber-hardening", label: "Security system cyber hardening" }],
  consulting: [{ slug: "commercial-vs-residential-security-systems", label: "Planning for the property type" }, { slug: "integrating-access-control-and-cctv", label: "Integrated system planning" }],
};