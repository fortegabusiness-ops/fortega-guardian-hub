/**
 * Province-level privacy context and building-type planning guidance for review drafts.
 * Content is general and verifiable; it never states town-specific facts or Fortega coverage.
 */
const PIPEDA = "the federal Personal Information Protection and Electronic Documents Act (PIPEDA)";

export const PROVINCE_PRIVACY: Record<string, { law: string; note?: string }> = {
  alberta: { law: "Alberta's Personal Information Protection Act (PIPA)" },
  "british-columbia": { law: "British Columbia's Personal Information Protection Act (PIPA)" },
  quebec: { law: "Quebec's Act respecting the protection of personal information in the private sector, as amended by Law 25", note: "Public notices and signage, such as camera notices, should meet the French-language requirements of the Charter of the French Language." },
  ontario: { law: PIPEDA, note: "Health information custodians in Ontario also work under the Personal Health Information Protection Act (PHIPA)." },
  manitoba: { law: PIPEDA },
  saskatchewan: { law: PIPEDA },
  "new-brunswick": { law: PIPEDA },
  "nova-scotia": { law: PIPEDA },
  "prince-edward-island": { law: PIPEDA },
  "newfoundland-and-labrador": { law: PIPEDA },
  yukon: { law: PIPEDA },
  "northwest-territories": { law: PIPEDA },
  nunavut: { law: PIPEDA },
};

export type BuildingGuide = { type: string; guidance: string };

export const BUILDING_GUIDANCE: Record<string, BuildingGuide[]> = {
  cctv: [
    { type: "Retail stores", guidance: "Cover entrances, cash areas and stockrooms with clear facial and transaction views, and keep change rooms and washrooms out of every field of view." },
    { type: "Offices", guidance: "Focus on entrances, reception, parking and server rooms; avoid recording individual workstations unless a documented purpose requires it." },
    { type: "Warehouses and industrial sites", guidance: "Plan for loading docks, yard perimeters and high-value storage, with cameras suited to low light, wide areas and long cable runs." },
    { type: "Multi-residential buildings", guidance: "Cover lobbies, garages, mail rooms and garbage areas while keeping views out of private suites and balconies." },
  ],
  access: [
    { type: "Offices", guidance: "Use card or mobile credentials on perimeter doors, server rooms and executive areas, with schedules that unlock public doors only during business hours." },
    { type: "Multi-residential buildings", guidance: "Combine fob entry, intercom or video entry for visitors, and separate permissions for garages, amenity rooms and service areas." },
    { type: "Healthcare and clinics", guidance: "Restrict medication, records and staff-only rooms by role, and keep emergency exits free to open from the inside." },
    { type: "Industrial and warehouse sites", guidance: "Control gates, docks and hazardous storage, and keep an audit trail of who entered restricted zones and when." },
  ],
  intrusion: [
    { type: "Retail stores", guidance: "Combine door contacts, glass-break detection and motion sensors, with panic buttons at cash areas and clear arming routines for closing staff." },
    { type: "Offices", guidance: "Zone the system so occupied floors stay disarmed while empty areas remain protected, with individual user codes for an audit trail." },
    { type: "Warehouses", guidance: "Protect overhead doors, roof hatches and perimeter openings, and choose detectors suited to high ceilings and temperature swings." },
    { type: "Restaurants and hospitality", guidance: "Protect back doors, storage and offices, and set arming schedules around late closing and early delivery times." },
  ],
  remote: [
    { type: "Construction sites", guidance: "Use monitored cameras on perimeters, equipment yards and material storage, with operators verifying events before escalation." },
    { type: "Car dealerships and vehicle lots", guidance: "Monitor lot edges and service entrances after hours, with defined responses to people entering the lot." },
    { type: "Warehouses and yards", guidance: "Combine analytics on fences and docks with live verification, so alerts reach the right contact quickly." },
    { type: "Multi-residential buildings", guidance: "Monitor garages, entrances and common areas at defined hours, with clear rules on who may view live and recorded video." },
  ],
  guards: [
    { type: "Retail and shopping areas", guidance: "Define visible patrol routes, loss-prevention duties, customer-service expectations and how incidents are reported and handed over." },
    { type: "Offices and corporate buildings", guidance: "Set reception and concierge duties, visitor sign-in, after-hours lock-up routines and alarm-response procedures." },
    { type: "Construction and industrial sites", guidance: "Plan gate control, site patrols, vehicle logs and fire-watch duties, with written post orders for every shift." },
    { type: "Events and residential properties", guidance: "Agree crowd and access duties for events, or patrol and parking enforcement routines for residential buildings, with incident reports for each shift." },
  ],
  smart: [
    { type: "Offices", guidance: "Link lighting, heating and cooling schedules to occupancy and access data, with manual overrides that facility staff understand." },
    { type: "Multi-residential buildings", guidance: "Coordinate common-area lighting, ventilation, leak sensors and access systems from one dashboard for property managers." },
    { type: "Schools and institutions", guidance: "Schedule systems around class times and holidays, and keep safety systems independent of automation changes." },
    { type: "Retail and hospitality", guidance: "Automate opening and closing routines for lighting, signage and climate, and alert staff to freezer or equipment faults." },
  ],
  cyber: [
    { type: "Small and medium businesses", guidance: "Start with multi-factor authentication, backups, patching and staff phishing awareness, following the Canadian Centre for Cyber Security's baseline controls." },
    { type: "Professional offices", guidance: "Protect client files with access controls, encrypted devices and tested backups, and document how a breach would be reported." },
    { type: "Buildings with connected security systems", guidance: "Separate cameras, door controllers and building systems from the office network, change default passwords and keep firmware current." },
    { type: "Healthcare and clinics", guidance: "Restrict access to health records, log who opens them and plan for continuity if systems go offline." },
  ],
  consulting: [
    { type: "Retail and commercial properties", guidance: "Review entrances, cash handling, stock storage and after-hours risks, then rank improvements by impact." },
    { type: "Offices", guidance: "Assess visitor management, access control, camera coverage and data security together rather than system by system." },
    { type: "Industrial and warehouse sites", guidance: "Review perimeters, gates, docks, lighting and the handling of high-value goods across every shift." },
    { type: "Multi-residential and mixed-use buildings", guidance: "Look at shared entrances, garages, deliveries and resident privacy, and how each system is managed day to day." },
  ],
};

const PRIVACY_SERVICES = new Set(["cctv", "remote", "access", "consulting", "cyber", "guards"]);

export function getProvinceBuildingContent(provinceSlug: string, serviceSlug: string, cityName: string) {
  const privacy = PROVINCE_PRIVACY[provinceSlug];
  const buildings = BUILDING_GUIDANCE[serviceSlug] ?? [];
  const privacyText = privacy && PRIVACY_SERVICES.has(serviceSlug)
    ? `Private-sector organizations in ${cityName} generally handle personal information, including video, access logs and incident records, under ${privacy.law}. Collect only what the stated purpose needs, post clear notices, set retention periods and limit who can view records.${privacy.note ? ` ${privacy.note}` : ""}`
    : undefined;
  return { buildings, privacyText };
}
