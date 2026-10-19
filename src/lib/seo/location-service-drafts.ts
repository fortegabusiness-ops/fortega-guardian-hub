import { LOCATION_PILOTS } from "./location-pilots";
import { SERVICE_BY_SLUG, SERVICE_SLUGS } from "./services";
import { SERVICE_KEYWORDS } from "./service-keywords";
import { clampDescription, clampTitle } from "./meta";

type LocalPlan = { heading: string; body: string; sourceTitle: string; sourceUrl: string };
type ServicePlan = { answer: string; checklist: string[]; cost: string; sourceTitle: string; sourceUrl: string };

const OPC = "https://www.priv.gc.ca/en/privacy-topics/surveillance/video-surveillance-by-businesses/gl_vs_080306/";
const CYBER = "https://www.cyber.gc.ca/en/guidance/baseline-cyber-security-controls-small-and-medium-organizations";

const SERVICE_PLANS: Record<string, ServicePlan> = {
  cctv: {
    answer: "Security camera installation starts with the job each view must perform: general observation, identification at an entrance or incident review. The design then sets camera positions, cabling, recording storage, permitted users and a documented handover test. A camera count alone is not a complete proposal.",
    checklist: ["Mark intended views on a layout, keeping neighbouring properties and private areas out of scope.", "Identify power and cable routes; check whether existing cameras and recorders are compatible before deciding to replace them.", "Choose local, cloud or hybrid recording against retention, access and connectivity requirements.", "Agree how image quality, playback, exports and remote access will be tested at handover."],
    cost: "Camera count, lens and lighting needs, cable routes, recorder capacity, retention and travel affect the proposal. Compare the one-time installation scope separately from cloud subscriptions and support.",
    sourceTitle: "Privacy Commissioner's overt video-surveillance guidance", sourceUrl: OPC,
  },
  access: {
    answer: "Access control systems use a credential, reader and controller to decide who may use a door and when. Planning includes the actual opening, lock hardware, access schedules, visitor permissions and revocation. Exit behaviour must be reviewed for the building; cloud management alone does not define safe door operation.",
    checklist: ["List controlled doors and identify their current locks, closers, fire ratings and exit roles.", "Define staff, visitor and contractor permissions, including temporary access and lost-credential revocation.", "Confirm controller, reader and credential compatibility rather than assume existing cards can be reused.", "Agree and test door behaviour during power loss, network interruption and emergency release with the relevant building authority."],
    cost: "Door condition, lock type, wiring, controller capacity, integrations and administration subscriptions affect cost. A per-door headline price can omit door repairs and associated building work.",
    sourceTitle: "Calgary Fire guidance on electromagnetic locks (jurisdiction-specific example, not a local rule)", sourceUrl: "https://www.calgary.ca/content/dam/www/programs-services/public-and-personal-safety/fire-codes/fire-marshal-bulletins/fire-marshal-bulletin-2023-001-electromagnetic-locks.pdf",
  },
  intrusion: {
    answer: "Business alarm systems detect defined events through door contacts, motion detectors and other selected sensors. Alarm monitoring is a separate operational arrangement: agree how signals are received, verified and escalated, and who may attend. No alarm device or monitoring agreement guarantees emergency-service arrival.",
    checklist: ["Separate intrusion zones from environmental events such as water, temperature or power loss.", "Identify arming schedules and named users, avoiding shared codes in project enquiries.", "Confirm which communications paths are available and how signal loss will be reported.", "Agree verification and escalation contacts, then test sensors and communications after configuration changes."],
    cost: "Zone count, existing panel compatibility, wiring, communications and any monitoring agreement affect cost. Ask what testing, batteries, maintenance and travel are included.",
    sourceTitle: "Canadian Cyber Centre baseline controls for connected systems", sourceUrl: CYBER,
  },
  remote: {
    answer: "Remote video monitoring adds an agreed observation, verification and escalation process to suitable cameras. It depends on usable views, communications and a defined incident procedure. Remote viewing, continuous recording and operator monitoring are different capabilities; confirm exactly which service a proposal includes.",
    checklist: ["Define monitoring hours, the areas in scope and which events should produce alerts.", "Check camera compatibility, lighting, upload capacity and access permissions.", "Identify who receives an escalation and whether anyone can attend the property.", "Test loss-of-video and connection alerts; confirm what happens when live images cannot reach an operator."],
    cost: "Monitoring hours, camera and event counts, verification duties, communications and reporting affect recurring cost. Physical attendance and on-site maintenance should be priced and agreed separately.",
    sourceTitle: "Privacy Commissioner's guidance on video-surveillance purpose and access", sourceUrl: OPC,
  },
  smart: {
    answer: "Building automation systems coordinate selected building equipment, schedules and sensors. A smart-building project begins with an equipment inventory, supported interfaces and operating responsibilities. Security, HVAC and lighting integrations must be verified, and local control behaviour must be tested rather than assumed.",
    checklist: ["Inventory existing controllers, building-management software and supported interfaces.", "Identify the equipment and schedules to change, with permission from the building operator.", "Agree which alarms require action and who owns maintenance and configuration changes.", "Test manual overrides, network interruption and recovery; isolate connected devices from unrelated networks."],
    cost: "Existing platform compatibility, integration programming, sensors, commissioning and ongoing support affect the budget. Energy savings cannot be promised without a baseline and a defined measurement method.",
    sourceTitle: "Canadian Cyber Centre baseline controls for connected infrastructure", sourceUrl: CYBER,
  },
  consulting: {
    answer: "A security risk assessment documents what needs protection, existing controls, identified gaps and prioritized recommendations. Drawings, layouts and a non-sensitive description can support an initial Fortega review. Further inspections and deliverables must be agreed for the scope; a remote review is not automatically a complete site audit.",
    checklist: ["Define assessment scope and the decision the report should support.", "Describe the building type, operating hours and existing systems without exposing access codes.", "Identify who can authorize an inspection and review recommendations.", "Agree findings, assumptions, exclusions and follow-up actions in the deliverables."],
    cost: "Property count, information available, assessment depth and any required site work affect the scope. No town-specific price or delivery schedule is assumed.",
    sourceTitle: "Canadian Cyber Centre baseline controls as a general assessment reference", sourceUrl: CYBER,
  },
  cyber: {
    answer: "Cybersecurity services should define the systems in scope, existing controls and responsibility for prevention, monitoring and incident response. Patching, strong authentication, protected backups and a response plan are baseline topics. A town name does not establish a different cyber threat or a need for a different service.",
    checklist: ["Inventory business systems and connected cameras, access controllers and automation devices.", "Review named accounts, multi-factor authentication, patching and network separation.", "Identify backup ownership and test recovery against business requirements.", "Agree incident contacts, monitoring duties and exclusions; keep passwords out of the enquiry form."],
    cost: "Endpoints, networks, assessment scope, managed monitoring duties and incident arrangements determine the quote. General national guidance is not evidence of town-specific cyber risk.",
    sourceTitle: "Canadian Cyber Centre baseline controls", sourceUrl: CYBER,
  },
  guards: {
    answer: "On-site security and mobile patrol require a defined duty, staffing arrangement and delivery provider. Fortega's eligibility to offer that scope has not been established. This draft is requirements planning only; it is not an offer of guard coverage or confirmation that personnel are available.",
    checklist: ["Describe duties such as visitor handling, access screening or escalation without exposing vulnerabilities.", "List the intended hours and site-access constraints.", "Identify supervision, reporting and emergency responsibilities.", "Do not commit to personnel coverage until the provider and delivery eligibility have been verified."],
    cost: "No staffing quote or coverage promise is provided here. Availability and delivery eligibility are unresolved.",
    sourceTitle: "Canadian Cyber Centre general security planning reference (not staffing eligibility evidence)", sourceUrl: CYBER,
  },
};

/** Manually researched, service-specific city planning. Not interchangeable city-name templates. */
const LOCAL_PLANS: Record<string, Partial<Record<string, LocalPlan>>> = {
  dawson: {
    cctv: { heading: "Check camera exposure and the actual travel route", body: "Dawson's destination weather guide describes a subarctic climate. For exterior CCTV, record each mounting position's exposure and compare camera, cable and enclosure ratings with the conditions expected there. Travel guidance distinguishes the Klondike Highway from seasonal Top of the World Highway access. Match installation and maintenance planning to the route the property actually requires; do not assume all access is seasonal.", sourceTitle: "Dawson weather and travel guidance", sourceUrl: "https://dawsoncity.ca/discover-dawson/weather/" },
    access: { heading: "Separate door hardware from exposed reader electronics", body: "A Dawson access-control assessment should record the actual exterior opening, weather exposure and reader location before selecting hardware against manufacturer ratings. A subarctic regional description is not an operating-temperature specification for every door. Ask the property owner to identify any restrictions on changing the opening or running new cable before choosing an electronic lock.", sourceTitle: "Dawson regional weather context", sourceUrl: "https://dawsoncity.ca/discover-dawson/weather/" },
    intrusion: { heading: "Record the alarm environment before choosing detectors", body: "Dawson's subarctic climate description is a prompt to check the proposed sensor location, not a reason to give every detector an outdoor rating. Distinguish heated interior rooms from exposed entrances or detached spaces. Ask what temperature range each location is expected to reach and which environmental alerts the owner actually needs; do not claim that a property has freezing or intrusion problems without an assessment.", sourceTitle: "Dawson weather context", sourceUrl: "https://dawsoncity.ca/discover-dawson/weather/" },
    remote: { heading: "Do not confuse remote verification with site attendance", body: "Dawson travel guidance identifies different highway routes and seasonal Top of the World access. If an escalation requires physical attendance, identify the responder and route for the actual property separately from camera monitoring. A live video alert cannot establish that someone can reach a site, and no town-wide dispatch time follows from the travel guide.", sourceTitle: "Dawson travel routes", sourceUrl: "https://dawsoncity.ca/plan-your-trip/getting-here/" },
    smart: { heading: "Specify environmental readings and control limits", body: "For a Dawson automation project, use the documented subarctic context to ask which rooms, pipes or external equipment need temperature readings. Let the building operator define acceptable thresholds and required actions. Remote temperature alerts and automatic control are different functions; specify manual override and behaviour if sensors or communications fail rather than promise freeze prevention.", sourceTitle: "Dawson weather context", sourceUrl: "https://dawsoncity.ca/discover-dawson/weather/" },
  },
  chetwynd: {
    cctv: { heading: "Check alterations and what an upgrade can reuse", body: "Chetwynd's building-inspection information covers building permits and inspections. If camera work changes the building, confirm the scope with the District before scheduling alterations. For a simple replacement, provide camera and recorder models, cable routes and desired views so compatibility can be assessed. The municipal information does not mean every camera upgrade requires a building permit.", sourceTitle: "District of Chetwynd building inspection", sourceUrl: "https://www.gochetwynd.com/municipal-office/departments/protective-services/building-inspection/" },
    access: { heading: "Check changed openings and changed property use", body: "Chetwynd publishes building-inspection and zoning information. For door-access work involving alterations or changed building use, identify the existing opening and ask which approvals and inspections apply. Separate the building question from the credential question: a new card reader does not by itself establish that a modified exit or restricted area is acceptable. Routine replacements and development projects should not be treated as the same scope.", sourceTitle: "District of Chetwynd OCP and zoning guidance", sourceUrl: "https://www.gochetwynd.com/municipal-office/departments/planning-and-development/ocp-zoning/" },
    intrusion: { heading: "Use preparedness guidance to define alarm continuity", body: "Chetwynd's emergency-preparedness guidance notes that disasters can disrupt phone, electricity and other services. Use that to ask which alarm signals, batteries and communication paths the property needs during an interruption. It is not evidence that outages are frequent at the site. Agree signal-loss reporting and retest communications after network changes rather than assume a cellular backup is suitable everywhere.", sourceTitle: "Chetwynd emergency preparedness", sourceUrl: "https://www.gochetwynd.com/municipal-office/departments/protective-services/emergency-preparedness/" },
    remote: { heading: "Agree what happens when live video is interrupted", body: "The District's preparedness guidance discusses possible service disruption during disasters. For remote monitoring, ask the owner to distinguish local recording from live images reaching an operator. Establish connection-loss notices, alternate contacts and the work needed to restore the system. This is continuity planning, not a claim that Chetwynd internet is unreliable or that recordings always survive an outage.", sourceTitle: "Chetwynd preparedness guidance", sourceUrl: "https://www.gochetwynd.com/municipal-office/departments/protective-services/emergency-preparedness/" },
    smart: { heading: "Define recovery and manual operation, not just automation", body: "Chetwynd preparedness information mentions possible disruption of electricity, phone, gas and water during disasters. Ask the operator which building functions must remain manually operable, what can restart automatically and which alerts need human action. Inventory the current controllers before proposing integration; the guidance does not establish that any particular building has backup power or compatible equipment.", sourceTitle: "District emergency-preparedness guidance", sourceUrl: "https://www.gochetwynd.com/municipal-office/departments/protective-services/emergency-preparedness/" },
  },
  "happy-valley-goose-bay": {
    cctv: { heading: "Plan external camera work and winter staging", body: "Happy Valley-Goose Bay's municipal plan and development regulations are listed in Newfoundland and Labrador's registry. Confirm building-alteration requirements for the parcel and scope with the Town. If installing exterior cameras needs roadside vehicles in winter, check the Town's current parking and snow-clearing restrictions. Those work-staging checks do not imply every property is roadside or every camera replacement needs development approval.", sourceTitle: "Happy Valley-Goose Bay municipal-plan registry", sourceUrl: "https://www.gov.nl.ca/mca/registry/community/happy-valley-goose-bay/" },
    access: { heading: "Match door changes to the parcel and project scope", body: "The provincial registry holds Happy Valley-Goose Bay's plan, development regulations and amendments. Before altering an entrance or changing the use of a controlled space, confirm the applicable scope with the Town and building owner. Prepare a door schedule identifying existing hardware, exit functions and proposed changes. The registry is a planning starting point, not approval for an electronic lock or proof every reader replacement requires a permit.", sourceTitle: "Town plan and development regulations", sourceUrl: "https://www.gov.nl.ca/mca/registry/community/happy-valley-goose-bay/" },
    intrusion: { heading: "Check water-related alerts against parcel evidence", body: "Newfoundland and Labrador publishes flood-hazard mapping information. If a Happy Valley-Goose Bay proposal includes water detection, ask the owner whether applicable mapping or a documented property requirement makes that function relevant. Regional mapping does not prove that a particular building is exposed. Distinguish water sensors from intrusion detection, and agree where a sensor can detect a leak and who would act on the alert.", sourceTitle: "Provincial flood-hazard mapping studies", sourceUrl: "https://www.gov.nl.ca/eccc/waterres/flooding/frm/" },
    remote: { heading: "Include the practical on-site maintenance step", body: "Happy Valley-Goose Bay's snow-clearing notice addresses winter vehicle and parking restrictions. If a camera fault requires roadside maintenance staging, check the current restrictions and property access before arranging attendance. Monitoring can identify a fault but cannot repair a camera, restore a cable or promise a maintenance arrival time. Name the site-access contact and clarify which repairs need a visit.", sourceTitle: "Town winter parking and snow-clearing notice", sourceUrl: "https://townhvgb.com/reminder-about-traffic-regulations-snow-clearing-policies/" },
    smart: { heading: "Choose environmental monitoring from documented property needs", body: "Provincial flood-hazard information can support a parcel-specific question about water detection in a Happy Valley-Goose Bay building. It is not a reason to label the whole community flood-prone. If the operator needs leak alerts, identify sensor locations, existing control interfaces and who can act locally. An alerting integration does not automatically shut off water or guarantee protection during a flood.", sourceTitle: "Newfoundland and Labrador flood-mapping guidance", sourceUrl: "https://www.gov.nl.ca/eccc/waterres/flooding/frm/" },
  },
};

export function getLocationServiceDraft(citySlug: string, serviceSlug: string) {
  const city = LOCATION_PILOTS.find((c) => c.slug === citySlug);
  const service = SERVICE_BY_SLUG[serviceSlug];
  const plan = SERVICE_PLANS[serviceSlug];
  const keywords = SERVICE_KEYWORDS[serviceSlug as keyof typeof SERVICE_KEYWORDS];
  if (!city || !service || !plan || !keywords) return undefined;
  const local = LOCAL_PLANS[citySlug]?.[serviceSlug];
  const status = serviceSlug === "guards" ? "delivery-blocked" : local ? "needs-review" : "insufficient-local-evidence";
  const title = clampTitle([`${keywords.primary} — ${city.name} | Fortega`, `${service.shortName} planning — ${city.name} | Fortega`]);
  const description = clampDescription(`Plan ${keywords.primary} for ${city.name}. Review equipment and site needs with Fortega; delivery arrangements require confirmation.`);
  return { city, service, plan, keywords, local, status, title, description, updated: "2026-10-19", approved: false as const };
}

export const LOCATION_SERVICE_DRAFTS = LOCATION_PILOTS.flatMap((city) => SERVICE_SLUGS.flatMap((service) => {
  const draft = getLocationServiceDraft(city.slug, service);
  return draft ? [draft] : [];
}));