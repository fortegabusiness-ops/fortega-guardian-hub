export type ServiceDetail = {
  slug: string;
  name: string;
  shortName: string;
  iconName: "Search" | "Video" | "Bell" | "KeyRound" | "Eye" | "UserCheck" | "Building2" | "Lock";
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  tagline: string;
  bullets: string[];
  overview: string[];
  capabilities: { title: string; desc: string }[];
  benefits: string[];
  industriesServed: string[];
  faqs: { q: string; a: string }[];
  cta: string;
  related: string[];
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "consulting",
    name: "Consulting & Professional Services",
    shortName: "Consulting",
    iconName: "Search",
    eyebrow: "Professional Services",
    metaTitle: "Security Consulting & Risk Assessments Canada | Fortega",
    metaDescription: "Independent security consulting, risk assessments, system design and compliance advisory for Canadian enterprises. Fortega delivers vendor-neutral expertise.",
    h1: "Security consulting and professional services for Canadian enterprises",
    tagline: "Independent expertise to design, validate and optimize your security program.",
    intro: "Fortega's consulting practice helps Canadian businesses make confident, evidence-based security decisions — from a single building risk assessment to a multi-province program design. We work as an independent advisor: vendor-neutral, standards-aligned and accountable to your outcomes, not a manufacturer's catalog.",
    bullets: ["Security audits", "Risk assessments", "System design", "Compliance consulting", "Project management"],
    overview: [
      "Every Fortega engagement starts with understanding your operations, regulatory context and risk appetite — not with a product recommendation. Our consultants combine field experience across CCTV, access control, alarms and cyber security with credentialed expertise in Canadian standards.",
      "Whether you're scoping a new build, validating an existing program after an incident, or preparing for an insurance or audit review, we deliver clear deliverables you can act on: prioritized findings, defensible recommendations and a roadmap that fits your budget cycle.",
    ],
    capabilities: [
      { title: "Physical security audits", desc: "On-site assessment of doors, cameras, alarms, guard procedures and life-safety integration against modern standards." },
      { title: "Threat and risk assessments", desc: "Quantified risk reports covering theft, intrusion, workplace violence, vandalism and operational disruption." },
      { title: "System design & specification", desc: "Vendor-neutral CCTV, access and alarm designs with full bill-of-materials, drawings and acceptance criteria." },
      { title: "Compliance & policy advisory", desc: "Alignment with PIPEDA, provincial privacy, ULC, CEC and industry frameworks like PCI, HIPAA-adjacent and SOC 2." },
      { title: "Owner's representative", desc: "Independent project management for new builds, retrofits and integrator selection — protecting your interests on site." },
      { title: "Post-incident review", desc: "Forensic review of camera, access and alarm data with recommendations to close the gap that allowed the incident." },
    ],
    benefits: [
      "Defensible, vendor-neutral recommendations you can take to procurement and insurance.",
      "Faster project approvals — clean deliverables that internal stakeholders actually read.",
      "Lower lifecycle cost from right-sizing systems rather than overspecifying.",
      "One advisor that connects physical and cyber findings into a coherent program.",
    ],
    industriesServed: ["commercial-real-estate", "industrial-manufacturing", "healthcare", "education", "government"],
    faqs: [
      { q: "Do you work with our existing integrator or only your own teams?", a: "Both. We're often retained as an independent advisor on projects executed by another integrator, and we'll happily review or co-deliver with your incumbent." },
      { q: "How long does a typical risk assessment take?", a: "A single-site assessment is usually 2–4 weeks from kickoff to report. Multi-site portfolios run on a phased schedule agreed up-front." },
      { q: "Will you recommend products you also install?", a: "Recommendations are based on fit, not commission. When Fortega is also a logical implementation partner we'll disclose it, but the design will stand on its own merits." },
    ],
    cta: "Schedule a Consultation",
    related: ["cctv", "access", "cyber"],
  },
  {
    slug: "cctv",
    name: "CCTV & Video Surveillance Systems",
    shortName: "CCTV",
    iconName: "Video",
    eyebrow: "Video Surveillance",
    metaTitle: "CCTV & Video Surveillance Systems Canada | Fortega",
    metaDescription: "Enterprise CCTV, AI video analytics, VMS and cloud surveillance for Canadian businesses. Designed, installed and supported by Fortega.",
    h1: "CCTV and video surveillance engineered for evidentiary clarity",
    tagline: "Modern video platforms that deliver clarity, intelligence and operational insight.",
    intro: "Fortega designs and installs CCTV and video surveillance systems that go beyond passive recording. Our deployments combine high-resolution cameras, AI analytics and modern video management platforms so your team can detect events as they happen, retrieve evidence in seconds, and use video as an operational tool — not just a forensic one.",
    bullets: ["Camera installation", "AI video analytics", "Remote viewing", "Video management systems", "Cloud surveillance"],
    overview: [
      "Camera placement is engineered for evidentiary quality first. We design for the specific scene — lobby, loading dock, parkade, retail floor or production line — so footage holds up for insurance, law enforcement and HR investigations.",
      "Cloud and hybrid VMS architectures keep footage available wherever your team works, with role-based access, audit trails and retention controls that satisfy Canadian privacy obligations.",
    ],
    capabilities: [
      { title: "IP camera systems", desc: "Fixed, PTZ, multi-sensor and thermal cameras from leading enterprise platforms." },
      { title: "AI video analytics", desc: "Loitering, line-crossing, abandoned object, people counting and licence-plate recognition." },
      { title: "Cloud & hybrid VMS", desc: "Modern video management with mobile access, role-based permissions and verified audit logs." },
      { title: "Remote viewing & sharing", desc: "Secure mobile and desktop access so operations, security and ownership all see the same picture." },
      { title: "Storage & retention design", desc: "Right-sized retention tuned to privacy law, insurance and operational policy." },
      { title: "Existing-system upgrades", desc: "Migrate aging DVR/NVR estates onto modern platforms without ripping out cable." },
    ],
    benefits: [
      "Footage that actually identifies people, plates and incidents — not just blurry shapes.",
      "Faster investigations: searchable video across every camera, every site.",
      "Lower false-alarm cost when video verifies alarms before dispatch.",
      "A platform that scales as you add buildings or jurisdictions.",
    ],
    industriesServed: ["commercial-real-estate", "retail", "industrial-manufacturing", "cannabis", "education"],
    faqs: [
      { q: "Can you upgrade our existing analog or DVR system?", a: "Yes. We frequently migrate clients off legacy DVR/NVR estates while reusing structured cabling where it makes sense." },
      { q: "Do you support cloud video, on-prem, or hybrid?", a: "All three. We design the architecture around your bandwidth, retention and compliance needs — not around a single vendor's preference." },
      { q: "Will Fortega host and monitor our video?", a: "Yes. Our 24/7 monitoring centre can verify camera health and respond to video-triggered events under documented service levels." },
    ],
    cta: "Request a Site Assessment",
    related: ["remote", "access", "consulting"],
  },
  {
    slug: "intrusion",
    name: "Intrusion & Burglar Alarm Systems",
    shortName: "Intrusion alarms",
    iconName: "Bell",
    eyebrow: "Alarm Systems",
    metaTitle: "Commercial Intrusion & Burglar Alarm Systems Canada | Fortega",
    metaDescription: "Commercial intrusion detection, panic and environmental alarm systems with 24/7 ULC-grade monitoring across Canada. Designed and supported by Fortega.",
    h1: "Commercial intrusion and burglar alarm systems with verified response",
    tagline: "Reliable intrusion detection for commercial and industrial environments.",
    intro: "Fortega delivers commercial-grade intrusion alarm systems backed by 24/7 ULC-aligned monitoring and verified response. From single-site retail upgrades to multi-province industrial estates, we engineer alarms that catch genuine events fast and shut down the false alarms that drain budgets and erode police response.",
    bullets: ["Commercial alarms", "Motion detection", "Monitoring systems", "Panic systems", "Environmental sensors"],
    overview: [
      "Modern commercial alarm systems do more than detect motion. Fortega designs layered detection — perimeter contacts, interior motion, glass-break, panic and environmental sensors — wired into a monitoring platform that uses video verification before dispatch.",
      "Verified alarms get priority response from police and reduce the false-alarm fees that burden retail and industrial operators most.",
    ],
    capabilities: [
      { title: "Perimeter & interior detection", desc: "Door/window contacts, dual-tech motion sensors, glass-break and shock detection." },
      { title: "Panic & duress systems", desc: "Discrete panic buttons, hold-up and duress alerts integrated with monitoring." },
      { title: "Environmental monitoring", desc: "Water, temperature, smoke and power-loss sensors on critical infrastructure." },
      { title: "Video-verified alarms", desc: "Every event tied to live camera frames before operators dispatch responders." },
      { title: "Multi-site standardisation", desc: "Identical panels, zones and procedures across every location for consistent reporting." },
      { title: "24/7 monitoring", desc: "ULC-aligned monitoring centre with documented escalation paths." },
    ],
    benefits: [
      "Fewer false alarms — fewer fines, less wasted police response.",
      "Faster real-incident verification with video evidence on every alarm.",
      "Coverage of water, temperature and power events that insurers care about.",
      "A single accountable partner for the panel, the wiring and the monitoring.",
    ],
    industriesServed: ["retail", "industrial-manufacturing", "cannabis", "financial-services"],
    faqs: [
      { q: "Is monitoring ULC-listed?", a: "Yes. Fortega monitoring practices align with ULC requirements and we deliver ULC-graded service where the application demands it." },
      { q: "Can you replace our existing alarm panel?", a: "Yes — most installations can be re-headed onto a modern platform without rewiring the building." },
      { q: "Do you handle environmental alarms like flood or temperature?", a: "Yes. Environmental monitoring is part of every commercial alarm design where the risk warrants it." },
    ],
    cta: "Protect Your Property",
    related: ["remote", "cctv", "guards"],
  },
  {
    slug: "access",
    name: "Access Control Systems",
    shortName: "Access control",
    iconName: "KeyRound",
    eyebrow: "Access Control",
    metaTitle: "Commercial Access Control Systems Canada | Fortega",
    metaDescription: "Card, mobile credential, biometric and cloud access control for single-site and national portfolios across Canada. Engineered and supported by Fortega.",
    h1: "Modern access control for one door or a national portfolio",
    tagline: "Manage who goes where — across one site or a national portfolio.",
    intro: "Fortega delivers access control systems that scale from a single door to nationwide portfolios. Whether you need cloud-managed mobile credentials for a fast-growing tech tenant or on-prem high-assurance access for a regulated facility, we standardize credentials, audit trails and revocation across every site.",
    bullets: ["Card access", "Mobile credentials", "Visitor management", "Biometric systems", "Cloud access control"],
    overview: [
      "We design access systems around how your business actually operates — who needs access, when, from which device, and what happens the moment someone leaves the organization.",
      "Cloud access control gives multi-site operators instant revocation and unified reporting. On-prem deployments serve regulated, air-gapped or high-assurance sites with the same operational discipline.",
    ],
    capabilities: [
      { title: "Cloud access control", desc: "Centrally manage every door, every site, every credential — with audit trails and instant revocation." },
      { title: "Mobile credentials", desc: "Phone-as-a-badge with secure enrollment, deprovisioning and tenant self-service." },
      { title: "Biometric & high-assurance", desc: "Fingerprint, facial and multi-factor authentication for sensitive areas." },
      { title: "Visitor management", desc: "Pre-registered visitors, host notification and badge printing integrated with access." },
      { title: "Elevator & destination dispatch", desc: "Restrict elevator banks to credentialed floors, with visitor lift-call workflows." },
      { title: "Integrations", desc: "HR, identity, building automation and tenant-experience platform connectors." },
    ],
    benefits: [
      "Instant credential revocation when employees, tenants or contractors depart.",
      "One credential, every site — no per-building card sprawl.",
      "Audit trails that satisfy insurance, HR investigations and compliance reviews.",
      "A platform engineered to grow with acquisitions and new buildings.",
    ],
    industriesServed: ["commercial-real-estate", "healthcare", "education", "government", "financial-services"],
    faqs: [
      { q: "Can we keep our existing readers and cards?", a: "Often yes. Many migrations preserve reader hardware while moving the head-end onto a modern cloud platform." },
      { q: "Do you support mobile credentials?", a: "Yes — across leading enterprise access platforms with secure enrollment and deprovisioning." },
      { q: "Can access control integrate with our HR or identity system?", a: "Yes. We integrate with HRIS, SCIM and SSO platforms so onboarding and offboarding flow automatically into access rights." },
    ],
    cta: "Secure Access Now",
    related: ["cctv", "consulting", "cyber"],
  },
  {
    slug: "remote",
    name: "Remote Guarding & Monitoring",
    shortName: "Remote monitoring",
    iconName: "Eye",
    eyebrow: "24/7 Monitoring",
    metaTitle: "Remote Guarding & 24/7 Video Monitoring Canada | Fortega",
    metaDescription: "24/7 remote guarding, video monitoring, virtual patrols and verified alarm response across Canada. Fortega operators turn cameras into active deterrence.",
    h1: "Remote guarding and 24/7 video monitoring with verified response",
    tagline: "24/7 eyes on your sites with intelligent verification and intervention.",
    intro: "Fortega's remote guarding service turns your cameras into an active deterrent. Live operators conduct virtual patrols, verify alarms in real time and intervene with two-way audio — escalating to police, mobile patrol or on-site teams under documented response protocols.",
    bullets: ["Live monitoring", "Virtual patrols", "Alarm verification", "Remote intervention"],
    overview: [
      "Cameras alone don't stop incidents. Remote guarding pairs your video surveillance with trained operators who treat every event as a live response, not a recording to review later.",
      "Voice-down deterrence, verified alarm dispatch and recorded incident reports give clients lower loss rates, lower false-alarm fees and documented evidence of operator action.",
    ],
    capabilities: [
      { title: "Scheduled virtual patrols", desc: "Operators tour your site on a defined schedule, logging anomalies and confirming integrity." },
      { title: "Alarm verification", desc: "Live video tied to every alarm so dispatch only happens on confirmed incidents." },
      { title: "Two-way voice-down", desc: "Operators speak directly to intruders, trespassers or unwanted visitors in real time." },
      { title: "Escalation & dispatch", desc: "Documented paths to police, mobile patrol, key holders and on-site responders." },
      { title: "After-hours coverage", desc: "Targeted monitoring of nights, weekends and shutdowns when risk is highest." },
      { title: "Incident reporting", desc: "Time-stamped reports with video clips for insurance, HR and law enforcement." },
    ],
    benefits: [
      "Active deterrence — would-be intruders are challenged in real time, not reviewed later.",
      "Dramatically lower false-alarm fees with video-verified dispatch.",
      "Coverage for sites where 24/7 on-site guards aren't economical.",
      "Documented evidence of operator response for insurers and law enforcement.",
    ],
    industriesServed: ["industrial-manufacturing", "retail", "commercial-real-estate", "cannabis"],
    faqs: [
      { q: "Can remote guarding replace on-site guards?", a: "It can replace or augment them. Many clients use remote guarding for nights and weekends with a smaller on-site footprint during the day." },
      { q: "What cameras and platforms do you support?", a: "We work with leading enterprise VMS and camera platforms; if you already have surveillance, we'll assess what can be added to a monitored programme." },
      { q: "How fast do operators respond to an alarm?", a: "Verified video alarms are typically actioned within seconds of the trigger, with dispatch following pre-agreed escalation paths." },
    ],
    cta: "Learn About Remote Monitoring",
    related: ["cctv", "intrusion", "guards"],
  },
  {
    slug: "guards",
    name: "Security Guard Services",
    shortName: "Security guards",
    iconName: "UserCheck",
    eyebrow: "Manned Guarding",
    metaTitle: "Licensed Security Guards & Mobile Patrol Canada | Fortega",
    metaDescription: "Licensed on-site security guards, mobile patrol, concierge security and event security across Canada. Vetted, trained and supervised by Fortega.",
    h1: "Licensed security guards, concierge and mobile patrol across Canada",
    tagline: "Licensed, trained personnel for on-site presence and response.",
    intro: "Fortega supplies licensed security personnel for commercial properties, industrial sites, events and concierge environments across Canada. Every guard is vetted, trained on your site procedures and supervised by Fortega — supported by the same monitoring centre that backs our remote guarding service.",
    bullets: ["On-site guards", "Mobile patrol", "Event security", "Concierge security"],
    overview: [
      "Manned guarding still matters where presence, customer experience and physical intervention are non-negotiable. We staff guard programs that integrate cleanly with your access control, video and alarm systems — so guards work with technology, not around it.",
      "Mobile patrol routes, site-specific post orders and verifiable tour data give ownership confidence that the program is delivering what was specified.",
    ],
    capabilities: [
      { title: "On-site guarding", desc: "Static guards for lobbies, loading docks, industrial sites and after-hours coverage." },
      { title: "Mobile patrol", desc: "Scheduled and random patrols across sites with verifiable tour data." },
      { title: "Concierge security", desc: "Front-of-house personnel for Class A office and residential properties." },
      { title: "Event security", desc: "Crowd management, perimeter and access for events of any scale." },
      { title: "Post orders & SOPs", desc: "Site-specific procedures written, trained and audited against your standards." },
      { title: "Integrated with monitoring", desc: "Guards backed by Fortega's monitoring centre for escalation, dispatch and reporting." },
    ],
    benefits: [
      "Licensed, vetted and trained personnel — consistent quality across sites.",
      "Guards that work with your video, access and alarm systems, not around them.",
      "Verifiable tour and post-order compliance reporting.",
      "One vendor for guards, monitoring and electronic security.",
    ],
    industriesServed: ["commercial-real-estate", "retail", "industrial-manufacturing", "education", "government"],
    faqs: [
      { q: "Are your guards licensed?", a: "Yes. Every guard is provincially licensed and trained on site-specific procedures before deployment." },
      { q: "Can you handle short-term and event coverage?", a: "Yes — we routinely staff short-term events, planned shutdowns and surge coverage." },
      { q: "Do you supervise the guards or just supply them?", a: "We supervise. Supervisors conduct inspections, review tour data and report to your account lead." },
    ],
    cta: "Request Security Personnel",
    related: ["remote", "intrusion", "consulting"],
  },
  {
    slug: "smart",
    name: "Smart Building & Automation",
    shortName: "Smart building",
    iconName: "Building2",
    eyebrow: "Smart Building",
    metaTitle: "Smart Building Automation & IoT Integration Canada | Fortega",
    metaDescription: "Building automation, smart lighting, energy controls and secure IoT integration for Canadian commercial properties. Engineered by Fortega.",
    h1: "Smart building automation engineered for safety and efficiency",
    tagline: "Connected buildings that are safer, more efficient and easier to operate.",
    intro: "Fortega brings building automation, lighting, energy and IoT systems together with the security stack — so a single, hardened platform manages access, video, alarms, environmental controls and tenant experience. The result is a building that's safer to operate, cheaper to run and easier for facilities teams to manage.",
    bullets: ["Building automation", "Smart lighting", "Energy control", "IoT integration"],
    overview: [
      "Smart building projects fail when security and automation are bolted together by different vendors. Fortega designs the whole stack with the network, identity and monitoring layer in mind — so the IoT devices you deploy don't become the breach you didn't see coming.",
      "Lighting, HVAC scheduling, environmental sensing and tenant experience workflows tie back into the same access and video platform your security team already uses.",
    ],
    capabilities: [
      { title: "Building automation integration", desc: "BMS and BAS connectors that share data with access, video and monitoring." },
      { title: "Smart lighting", desc: "Scheduled, occupancy-driven and emergency lighting tied to security events." },
      { title: "Energy & environmental control", desc: "Temperature, humidity, leak and energy monitoring with alerting." },
      { title: "Secure IoT integration", desc: "Segmented networks, certificate-based device identity and device lifecycle management." },
      { title: "Tenant experience workflows", desc: "Visitor invites, lift booking and amenity access on the same platform as security." },
      { title: "Lifecycle support", desc: "Patch, monitor and replace devices on a defined cadence — not an emergency basis." },
    ],
    benefits: [
      "Lower operating cost — lighting, HVAC and energy tuned to actual occupancy.",
      "Fewer breach vectors — IoT designed with the same rigor as the security network.",
      "Better tenant experience without sacrificing security posture.",
      "One accountable partner for the whole stack.",
    ],
    industriesServed: ["commercial-real-estate", "education", "healthcare", "industrial-manufacturing"],
    faqs: [
      { q: "Can you integrate with our existing BMS?", a: "Yes. We integrate with major BMS and BAS platforms and design new deployments to remain open." },
      { q: "How do you secure IoT devices?", a: "Segmented networks, certificate-based identity, monitored telemetry and a documented lifecycle for patching and replacement." },
      { q: "Do you provide ongoing operational support?", a: "Yes — most clients run smart building deployments under a Fortega managed-service agreement." },
    ],
    cta: "Modernize Your Building",
    related: ["access", "cyber", "cctv"],
  },
  {
    slug: "cyber",
    name: "Cyber Security",
    shortName: "Cyber security",
    iconName: "Lock",
    eyebrow: "Cyber Defense",
    metaTitle: "Cyber Security Services for Canadian Businesses | Fortega",
    metaDescription: "Network security, endpoint protection, vulnerability assessments, threat monitoring and incident response for Canadian businesses. Delivered by Fortega.",
    h1: "Cyber security engineered alongside your physical security",
    tagline: "Protect networks, endpoints and operations from evolving cyber threats.",
    intro: "Fortega delivers cyber security as part of the same accountable program that protects your buildings — closing the gap that appears when network defense and physical security are owned by different vendors. From assessments to 24/7 threat monitoring and incident response, we secure the network that carries your cameras, controllers and business systems alike.",
    bullets: ["Network security", "Threat monitoring", "Vulnerability assessments", "Endpoint protection", "Incident response"],
    overview: [
      "Modern attackers don't separate physical and cyber — your camera network, access controllers and building automation are all reachable from the same network as your business systems. Fortega closes that gap with one program that owns both sides.",
      "Our cyber team works with the same engineers who design your physical security, so segmentation, identity and monitoring are coherent across the building, the network and the cloud.",
    ],
    capabilities: [
      { title: "Network security & segmentation", desc: "Firewall, NAC and segmentation designs that isolate OT, IoT and corporate traffic." },
      { title: "Endpoint protection", desc: "EDR/MDR deployment, tuning and monitoring across your fleet." },
      { title: "Vulnerability assessments", desc: "External, internal and OT-aware vulnerability assessments with prioritized remediation." },
      { title: "24/7 threat monitoring", desc: "SOC-aligned monitoring of network, endpoint and identity telemetry." },
      { title: "Incident response", desc: "Retainer and on-demand IR with documented containment and recovery playbooks." },
      { title: "Compliance support", desc: "PIPEDA, provincial privacy and frameworks like SOC 2 and ISO 27001 advisory." },
    ],
    benefits: [
      "One program covers both the building network and the business network.",
      "Faster detection — telemetry across endpoints, network and identity in one view.",
      "Defensible compliance posture for insurers, customers and regulators.",
      "Documented incident response — not a scramble when something happens.",
    ],
    industriesServed: ["financial-services", "healthcare", "government", "industrial-manufacturing", "education"],
    faqs: [
      { q: "Do you offer 24/7 monitoring?", a: "Yes. Our cyber monitoring runs alongside the same operations centre that backs our physical security monitoring." },
      { q: "Can you respond to an active incident?", a: "Yes. Retainer and on-demand incident response are available with documented containment and recovery procedures." },
      { q: "Will you work with our existing IT team?", a: "Yes — most engagements augment an existing IT or MSP team rather than replace them." },
    ],
    cta: "Strengthen Cyber Security",
    related: ["consulting", "access", "smart"],
  },
];

export const SERVICE_BY_SLUG: Record<string, ServiceDetail> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
);

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
