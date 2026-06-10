export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  threatHeading: string;
  threats: string[];
  approachHeading: string;
  approach: string[];
  solutions: { title: string; desc: string }[];
  complianceHeading: string;
  compliance: string[];
  whyHeading: string;
  why: string[];
  faqs: { q: string; a: string }[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "commercial-real-estate",
    name: "Commercial Real Estate",
    shortName: "Commercial real estate",
    h1: "Security for commercial real estate portfolios across Canada",
    metaTitle: "Commercial Real Estate Security Systems Canada | Fortega",
    metaDescription:
      "CCTV, access control, alarm monitoring and tenant security for office towers, mixed-use and Class A buildings across Canada. Portfolio-wide standards from Fortega.",
    eyebrow: "Industry",
    intro:
      "Commercial property owners and operators are accountable for the safety of thousands of tenants, visitors and contractors every day — across portfolios that often span dozens of buildings and multiple provinces. Fortega designs and operates security programs that protect Class A offices, mixed-use developments and multi-tenant campuses with consistent standards, transparent reporting and a single point of accountability.",
    threatHeading: "The threat landscape for property owners",
    threats: [
      "Lobby and loading-dock tailgating remains the most exploited weakness in modern office buildings. Without verified credentials at every door, an unbadged visitor can move from the public lobby into tenant-restricted floors in seconds.",
      "After-hours intrusion, vandalism and theft continue to climb in urban centres, with copper, electronics and tenant assets the most common targets. Property managers carry the reputational cost when tenants are affected.",
      "Tenant turnover creates a constant credential-management burden. Lost cards, departed employees and short-term contractors all represent open paths into the building unless access rights are revoked the moment they expire.",
      "Mechanical and electrical rooms are frequently unmonitored. A small water leak, overheating UPS or unauthorised entry into a riser closet can take a full floor offline and trigger insurance claims that dwarf the cost of monitoring.",
    ],
    approachHeading: "How Fortega protects commercial real estate",
    approach: [
      "Fortega builds property security around three layers: deterrence at the perimeter, verification at every entry point and intelligent monitoring on top. Cameras are placed for evidentiary quality, not just coverage; access control is standardised across every door so tenants experience the same credential at every site.",
      "A dedicated portfolio manager owns the relationship across all your buildings. They keep camera firmware, access controllers and monitoring policies aligned as the portfolio grows or assets are sold, and produce monthly reporting that gives property managers and ownership real evidence of system health.",
      "Our 24/7 monitoring centre verifies alarms before dispatch. Operators use live video and two-way audio to confirm a genuine incident, dramatically reducing false-alarm fees and giving police priority response when an intrusion is real.",
    ],
    solutions: [
      { title: "Multi-site access control", desc: "One credential, every building. Cloud platform with tenant self-service and instant revocation." },
      { title: "Lobby & elevator destination dispatch", desc: "Visitor management integrated with elevator banks so guests reach only the floor they're invited to." },
      { title: "AI video surveillance", desc: "Loitering, line-crossing and abandoned-object detection in lobbies, loading docks and parkades." },
      { title: "After-hours remote guarding", desc: "Virtual patrols of garages, rooftops and back-of-house with voice-down deterrence." },
      { title: "Environmental & life-safety monitoring", desc: "Water, temperature, power and door-prop alerts on mechanical rooms and risers." },
      { title: "Tenant security packages", desc: "Optional in-suite alarms, panic stations and after-hours access bundled into leases." },
    ],
    complianceHeading: "Standards, insurance and compliance",
    compliance: [
      "Fortega designs to ULC-listed monitoring practices, Canadian Electrical Code installation standards and the privacy obligations of PIPEDA and provincial equivalents — important when cameras face lobbies, garages and shared amenity spaces.",
      "Verified video evidence and documented response procedures support insurance underwriting and help defend slip-and-fall, theft and incident claims. We provide tenants and owners with retention policies and access logs they can hand to counsel without a scramble.",
    ],
    whyHeading: "Why property owners choose Fortega",
    why: [
      "Portfolio-wide consistency means a tenant moving between your Toronto and Calgary buildings sees the same access experience, and your property managers run the same reports. New acquisitions are onboarded onto the standard within weeks, not quarters.",
      "Because Fortega owns physical security and cyber security under one roof, the network that carries your camera and access traffic is hardened by the same team that installed it — closing the gap exploited by most modern building-system breaches.",
    ],
    faqs: [
      { q: "Can Fortega standardize security across a multi-building portfolio?", a: "Yes. We deploy a single cloud access-control and video platform across every building so credentials, policies, reports and monitoring procedures are identical site to site." },
      { q: "How do you handle tenant move-ins and move-outs?", a: "Tenant administrators get self-service tools to issue and revoke credentials, with Fortega support on standby. All access events are logged and auditable for ownership." },
      { q: "Do you integrate with existing building management systems?", a: "Yes. Fortega integrates with major BMS, elevator dispatch, visitor management and tenant experience platforms so security data flows where it's needed." },
      { q: "What kind of reporting do property managers receive?", a: "Monthly portfolio reports cover system health, incidents, alarm verifications, false-alarm trends and recommended remediation — written for non-technical stakeholders." },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    shortName: "Retail",
    h1: "Loss prevention and retail security solutions for Canadian stores",
    metaTitle: "Retail Security & Loss Prevention Systems Canada | Fortega",
    metaDescription:
      "CCTV, EAS, access control and 24/7 monitoring for single-store and multi-location retailers across Canada. Reduce shrink and protect staff with Fortega.",
    eyebrow: "Industry",
    intro:
      "Retail security has changed faster in the last three years than in the previous twenty. Organised retail crime, smash-and-grab events and staff-directed violence now sit alongside traditional shoplifting and internal shrink as daily operational risks. Fortega helps Canadian retailers protect inventory, customers and frontline associates with integrated systems that produce evidence, not just video.",
    threatHeading: "What retailers are actually dealing with",
    threats: [
      "Organised retail crime crews target categories with high resale value — electronics, designer goods, beauty and tools — and move between stores in the same chain within hours. Without networked video and incident sharing, each location investigates the same offenders in isolation.",
      "Internal shrink still accounts for a substantial share of total loss in most categories. Refund fraud, sweethearting and point-of-sale manipulation are detectable only when video is linked to transaction data and reviewed proactively.",
      "Staff safety has moved to the centre of loss prevention. Frontline associates routinely face verbal abuse, threats and physical confrontation, and turnover spikes when stores feel unsafe. Panic stations and remote-monitored deterrence have become baseline expectations, not premium features.",
      "After-hours intrusion through roofs, back doors and adjacent vacant units continues to grow, particularly in strip malls and street-front retail. A monitored alarm with verification turns a multi-hour ransack into a minutes-long event.",
    ],
    approachHeading: "Fortega's approach to retail security",
    approach: [
      "We start by walking the store at open, peak and close. The right camera plan covers every transaction, every fitting-room corridor entry, every receiving door and every blind aisle — not just the front entrance. Coverage gaps are where shrink hides.",
      "Video is linked to point-of-sale so a loss-prevention manager can search for voids, refunds without receipts or specific SKUs and watch the matching footage in seconds. That same integration produces the evidence packages investigators and insurers actually accept.",
      "Our 24/7 monitoring centre handles after-hours intrusion and panic alerts with verified dispatch. During business hours, remote guards can voice-down loiterers at receiving doors and watch parking lots when staff close alone.",
    ],
    solutions: [
      { title: "AI video analytics", desc: "People counting, dwell time, queue analytics and known-offender alerts across every location." },
      { title: "POS-integrated video", desc: "Transactions overlaid on footage for instant fraud and sweethearting investigation." },
      { title: "Panic & duress systems", desc: "Discreet staff alarms with verified dispatch and two-way audio." },
      { title: "Electronic article surveillance", desc: "RF and AM tagging at entry points integrated with video for proof of incident." },
      { title: "Back-door & receiving control", desc: "Access control, door-prop alarms and remote video on every non-public door." },
      { title: "Multi-site monitoring", desc: "One Canadian monitoring centre handling every location, every alarm, every shift." },
    ],
    complianceHeading: "Privacy, PCI and operational standards",
    compliance: [
      "Retail video is subject to PIPEDA and provincial privacy laws. Fortega designs camera placement, signage and retention policies that meet the regulator's expectations while still producing usable evidence — a balance most off-the-shelf systems get wrong.",
      "Networks carrying camera and access traffic share infrastructure with point-of-sale. Our cyber team segments those networks to keep retail systems PCI-relevant and out of scope for the rest of your environment.",
    ],
    whyHeading: "Why retailers choose Fortega",
    why: [
      "One vendor for stores, distribution centres and head office. Standard hardware, standard reporting, standard escalation — so loss-prevention leaders spend their time investigating, not chasing integrators.",
      "Canadian-staffed monitoring centre with operators trained on retail-specific scenarios: shoplifting in progress, panic alerts, after-hours intrusion and parking-lot incidents during opening and closing.",
    ],
    faqs: [
      { q: "Can you integrate with our existing POS system?", a: "Yes. Fortega integrates with major retail POS platforms so video can be searched by transaction, SKU, void or refund." },
      { q: "Do you provide analytics for marketing and operations teams?", a: "Yes. People-counting, dwell time and conversion data are available to operations and marketing alongside loss-prevention dashboards." },
      { q: "How fast can you onboard a new store?", a: "Single-store fit-outs typically run one to two weeks from design to commissioning. Multi-site rollouts follow a phased schedule with engineering and procurement milestones agreed up-front." },
      { q: "Can Fortega handle our panic alarms 24/7?", a: "Yes. Our Canadian monitoring centre verifies and dispatches on panic, duress and intrusion alarms around the clock, with retail-trained operators." },
    ],
  },
  {
    slug: "industrial-manufacturing",
    name: "Industrial & Manufacturing",
    shortName: "Industrial & manufacturing",
    h1: "Plant security and OT protection for Canadian manufacturers",
    metaTitle: "Industrial & Manufacturing Security Systems Canada | Fortega",
    metaDescription:
      "Perimeter security, access control, video surveillance and OT cyber security for Canadian factories, plants and industrial facilities. End-to-end programs from Fortega.",
    eyebrow: "Industry",
    intro:
      "Manufacturing sites are high-value, high-risk environments. A single hour of unplanned downtime can cost more than a year of security investment, and the same network now carries cameras, badges, robots and production data. Fortega secures Canadian plants and industrial facilities with integrated programs that protect both the perimeter fence and the production line.",
    threatHeading: "Industrial threats that actually matter",
    threats: [
      "Perimeter intrusion — metal theft, vandalism and trespass — is constant at industrial sites with long fence lines, multiple gates and unstaffed hours. Reactive guarding alone leaves gaps that thermal cameras and analytics close quickly.",
      "Insider risk grows with workforce size and shift complexity. Material walking out the receiving door, badge sharing and unauthorised after-hours entry into restricted areas are common — and only visible when access logs and video are correlated.",
      "OT and ICS networks are now actively targeted by ransomware actors who know that production-line downtime forces fast ransom decisions. Most plants still run flat networks where a phishing email on a sales laptop can reach a PLC.",
      "Environmental and life-safety risks — gas, temperature, water, dust — sit alongside security. Modern monitoring should detect a freezer rising five degrees just as reliably as it detects a forced gate.",
    ],
    approachHeading: "How Fortega secures industrial sites",
    approach: [
      "We treat perimeter, building envelope, production floor and back-office as distinct layers, each with its own controls. Long-range cameras and analytics watch the fence line; access control governs the building envelope; tighter zones protect tooling, raw materials and chemical storage; OT is segmented from corporate IT with engineered firewalls.",
      "Engineering is hands-on. Our designers visit during a production shift to understand traffic flows, contractor staging and shipping cadence before drawing a single camera. Systems are then commissioned with the plant's electrical, automation and EHS teams in the room.",
      "Our 24/7 monitoring centre handles after-hours alarms, gate intrusion and environmental alerts with verification and escalation paths tied directly to plant management and on-call maintenance.",
    ],
    solutions: [
      { title: "Perimeter & thermal video", desc: "Long-range and thermal cameras with line-crossing analytics on fence lines and gates." },
      { title: "Industrial access control", desc: "Hardened readers, turnstiles and vehicle gates rated for industrial environments." },
      { title: "Contractor & visitor management", desc: "Pre-registration, certification verification, badging and automatic offboarding." },
      { title: "OT / ICS network security", desc: "Network segmentation, asset discovery and intrusion detection for production networks." },
      { title: "Environmental monitoring", desc: "Temperature, water, gas and door-prop alerts wired into the same monitoring centre." },
      { title: "Remote guarding", desc: "Virtual patrols and voice-down deterrence on yards, loading docks and gates after hours." },
    ],
    complianceHeading: "Standards, audits and regulators",
    compliance: [
      "Fortega aligns OT projects with IEC 62443 and ISA/IEC 62443-3-3 controls and supports clients facing SOC 2, ISO 27001 and customer-driven security audits. Documentation, network diagrams and policy artefacts are produced as deliverables, not afterthoughts.",
      "Physical installs follow the Canadian Electrical Code, ULC-listed monitoring practices and provincial occupational health and safety requirements for working at height, in confined spaces and around energised equipment.",
    ],
    whyHeading: "Why manufacturers choose Fortega",
    why: [
      "Physical and cyber security from a single team means the people who installed your access controllers are the same people who segment your OT network — closing the gap exploited by most building-system and ICS attacks.",
      "Canadian operations, Canadian monitoring centre and field technicians who understand industrial environments. Your plant manager talks to someone who has been on a production floor, not a call-centre script.",
    ],
    faqs: [
      { q: "Can Fortega secure both IT and OT environments?", a: "Yes. Our cyber team specialises in segmenting OT and ICS networks from corporate IT and deploying monitoring that doesn't disrupt production." },
      { q: "Do you support contractor management at scale?", a: "Yes. We deploy contractor portals with pre-registration, certificate-of-insurance and safety-training verification, with auto-expiring credentials." },
      { q: "Can you monitor multi-shift operations?", a: "Yes. Our 24/7 Canadian monitoring centre is staffed for shift-change escalation, after-hours intrusion and environmental alerts." },
      { q: "Do you install in active production environments?", a: "Yes. Phased installations during planned shutdowns or non-production windows are standard practice." },
    ],
  },
  {
    slug: "logistics-warehousing",
    name: "Logistics & Warehousing",
    shortName: "Logistics & warehousing",
    h1: "Distribution centre and warehouse security across Canada",
    metaTitle: "Logistics & Warehouse Security Systems Canada | Fortega",
    metaDescription:
      "Yard, dock and warehouse security: cameras, access control, telematics integration and 24/7 monitoring for Canadian DCs and 3PLs. Engineered by Fortega.",
    eyebrow: "Industry",
    intro:
      "Distribution centres operate on tight margins where a single trailer of stolen freight can erase a quarter of profit on a route. Fortega protects Canadian warehouses, 3PLs and last-mile hubs with integrated programs covering yards, docks, racking and the back office — built for sites that run 20 hours a day, every day.",
    threatHeading: "Where logistics losses come from",
    threats: [
      "Cargo theft has become more organised and more violent. Trailer theft, pilferage from drop yards and fraudulent pickups using cloned BOLs are routine. Yards without good video and access control are easy targets.",
      "Internal theft from receiving, picking and shipping accounts for a meaningful share of inventory variance. Without dock-door cameras tied to gate logs and TMS data, the loss is invisible until cycle counts surface it weeks later.",
      "Tailgating at gates and pedestrian doors lets unverified drivers and contractors into the yard. The cost is usually counted only when something is missing or someone is hurt.",
      "Dock collisions, pedestrian-forklift incidents and after-hours unauthorized entry to racking carry both safety and financial consequences. Video-verified incident review reduces both.",
    ],
    approachHeading: "Fortega's logistics security model",
    approach: [
      "We design around the flow of freight: gatehouse to yard to dock to rack to outbound. Each transition gets the right control — license-plate recognition at gates, dock-door cameras tied to bay numbers, RFID or PIN at pedestrian doors, analytics watching pedestrian-equipment interactions on the floor.",
      "Camera footage is searchable by trailer number, BOL or driver ID through integration with yard-management and transportation-management systems, so investigations take minutes not days.",
      "Our 24/7 monitoring centre handles gate intrusion, dock-door props, after-hours yard activity and panic alarms with verified dispatch — including voice-down challenge over loudspeakers when an intruder is detected in the yard.",
    ],
    solutions: [
      { title: "Yard & gate security", desc: "License-plate recognition, vehicle barriers and long-range camera coverage of the full yard." },
      { title: "Dock-door surveillance", desc: "Per-bay cameras tied to dock-door sensors and WMS events for incident reconstruction." },
      { title: "Driver & visitor management", desc: "Pre-arrival booking, ID verification and self-service kiosks for drivers." },
      { title: "Racking & high-value cages", desc: "Cage access control, motion-activated cameras and seal-break detection." },
      { title: "Forklift & pedestrian safety video", desc: "Analytics on aisle intersections, pedestrian walkways and loading zones." },
      { title: "24/7 remote guarding", desc: "Virtual patrols, voice-down challenge and dispatch from a Canadian monitoring centre." },
    ],
    complianceHeading: "Compliance and customer audits",
    compliance: [
      "Most 3PLs and DCs face customer security audits — CTPAT, PIP, GDP for pharma freight, and brand-owner physical-security requirements for high-value categories. Fortega's deliverables (camera coverage maps, retention policies, access-event logs, monitoring procedures) line up with what auditors actually ask for.",
      "Networks carrying camera, access and WMS traffic are segmented and hardened to keep auditable systems out of scope of the rest of corporate IT.",
    ],
    whyHeading: "Why logistics operators choose Fortega",
    why: [
      "We understand that downtime in a DC means missed cutoffs and SLA penalties. Installations are phased around peak and quiet windows, and changes are tested before they touch a live dock.",
      "Cyber and physical security under one roof, with one accountable team — important when the same network carries WMS, cameras and gate controllers.",
    ],
    faqs: [
      { q: "Can you integrate with our WMS or YMS?", a: "Yes. Fortega integrates with major WMS, YMS and TMS platforms so video and access events can be searched by trailer, BOL, dock door or driver." },
      { q: "Do you support multi-DC rollouts?", a: "Yes. We standardise hardware, configuration and monitoring procedures across portfolios so every DC reports the same way." },
      { q: "Can you handle high-value cage monitoring?", a: "Yes. Caged areas get tighter access control, motion-triggered video and seal-break alerts wired to our monitoring centre." },
      { q: "How do you reduce false-alarm fees in big yards?", a: "Operators verify every alarm with live video and voice-down before requesting dispatch, eliminating the bulk of false-alarm charges." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    shortName: "Healthcare",
    h1: "Security systems for hospitals, clinics and long-term care",
    metaTitle: "Healthcare Security Systems Canada — Hospitals & Clinics | Fortega",
    metaDescription:
      "Access control, video surveillance, infant protection, panic systems and cyber security for Canadian healthcare. Quiet, patient-centred installations by Fortega.",
    eyebrow: "Industry",
    intro:
      "Healthcare environments balance an unusual set of pressures: open public access, strict privacy regulation, vulnerable patients, expensive equipment and increasingly aggressive cyber threats. Fortega builds security programs for Canadian hospitals, clinics, long-term care homes and ambulatory facilities that protect people and information without making the building feel like an airport.",
    threatHeading: "Healthcare's evolving threat profile",
    threats: [
      "Workplace violence against frontline healthcare workers has climbed sharply. Emergency departments, mental-health units and triage areas need duress systems and clear video evidence as a baseline expectation, not a premium add-on.",
      "Infant abduction risk in maternity wards and elopement risk in dementia and behavioural-health units demand specialised tracking, alerting and door control that ties directly to clinical workflow.",
      "Pharmacy and biomedical equipment theft — particularly mobile ultrasound, infusion pumps and controlled substances — requires layered access, tagging and audit trails.",
      "Ransomware against healthcare is at an all-time high. Hospital networks now carry cameras, badges, EMR, lab and biomed traffic; a flat network turns a single phishing email into an enterprise-wide outage.",
    ],
    approachHeading: "How Fortega protects healthcare environments",
    approach: [
      "We design with infection control, patient dignity and accessibility front of mind. Cameras are placed for incident-quality evidence in public corridors, parkades, EDs and pharmacy — not in patient rooms or treatment areas. Access control supports clinical role changes, locum credentials and rapid lockdown.",
      "Duress systems for clinical staff are wired into the same monitoring fabric as access and video, so when a nurse triggers an alert, the operator already sees the room and can dispatch security or police with full context.",
      "On the cyber side, we segment clinical, biomed and corporate networks; harden building systems that frequently get ignored (BMS, nurse-call, RTLS); and run vulnerability and incident-response programs aligned to Canadian provincial health-privacy expectations.",
    ],
    solutions: [
      { title: "Clinical access control", desc: "Role-based access, lockdown, infant-protection and elopement-control integrated with clinical workflow." },
      { title: "Workplace-violence video", desc: "Coverage of EDs, triage, registration and back-of-house with retention aligned to regulators." },
      { title: "Staff duress & panic", desc: "Wearable and fixed duress devices with verified response and location data." },
      { title: "Pharmacy & biomed security", desc: "Tighter access, video and tagging for controlled substances and mobile equipment." },
      { title: "Healthcare cyber security", desc: "Network segmentation, biomed asset visibility and incident response for clinical environments." },
      { title: "24/7 verified monitoring", desc: "Canadian monitoring centre handling alarms, duress and intrusion with healthcare-trained operators." },
    ],
    complianceHeading: "Privacy, accreditation and standards",
    compliance: [
      "Fortega designs to PIPEDA, PHIPA, HIA and other provincial health-privacy laws — including signage, retention, masking and access-control practices for surveillance in care environments.",
      "Deliverables support Accreditation Canada, provincial health-authority audits and customer-driven cyber requirements (NIST CSF, ISO 27001, HITRUST-aligned controls).",
    ],
    whyHeading: "Why healthcare organizations choose Fortega",
    why: [
      "Quiet, low-impact installations sequenced around clinical activity. We don't take an ED offline because an installer wants daytime hours.",
      "One team for cameras, access, duress and the networks they ride on — so a single accountable vendor can answer when something fails at 3 a.m.",
    ],
    faqs: [
      { q: "Can Fortega support a hospital-wide lockdown?", a: "Yes. Our access platforms support facility-wide and zone-specific lockdown initiated from designated stations or integrated with overhead paging." },
      { q: "Do you offer infant-protection and elopement systems?", a: "Yes. We deploy and monitor RTLS-based infant protection and wander-prevention systems integrated with door controllers." },
      { q: "How do you handle privacy in patient areas?", a: "Cameras are placed in public and back-of-house areas only; signage, retention and access logs follow PIPEDA and provincial health-privacy law." },
      { q: "Can you secure biomedical devices on our network?", a: "Yes. Our cyber team segments biomed VLANs, inventories connected devices and monitors for anomalous traffic." },
    ],
  },
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    h1: "Campus security for Canadian K–12, college and university",
    metaTitle: "School & Campus Security Systems Canada | Fortega",
    metaDescription:
      "Lockdown, access control, video surveillance and cyber security for Canadian schools, colleges and universities. Designed with educators by Fortega.",
    eyebrow: "Industry",
    intro:
      "Schools, colleges and universities are uniquely exposed: open campuses, large transient populations, valuable research and a duty of care to minors and young adults. Fortega designs security programs for Canadian education clients that prioritise lockdown readiness, day-to-day operational simplicity and respectful, privacy-aware surveillance.",
    threatHeading: "What modern campuses are facing",
    threats: [
      "Lockdown and hold-and-secure events are now planned for in every Canadian district. Without integrated access control and clear communication channels, the difference between a 30-second lockdown and a 5-minute one comes down to luck.",
      "After-hours trespass, vandalism and copper theft on school properties remain stubbornly common, especially during summer and long weekends. Verified video monitoring turns repeat offenders into solved cases.",
      "Higher education faces sustained cyber attack against research data, student records and financial aid systems. Most universities still run flat networks across academic and administrative environments.",
      "Mental-health and threat-assessment incidents demand tools — duress, hot-line escalation, audit trails — that traditional school security never planned for.",
    ],
    approachHeading: "Fortega's approach to education security",
    approach: [
      "We work with administration, facilities and local police to design lockdown procedures that match the buildings as they actually exist — including doors that lock from the inside, intercom plans and visitor management at every public entrance.",
      "Cameras prioritise perimeters, parking lots, hallways and gathering spaces — not classrooms. Retention policies, signage and access controls follow the privacy expectations of school boards and provincial regulators.",
      "On the cyber side, we segment academic, administrative and research networks, deploy modern endpoint protection and run incident-response programs aligned to provincial education-sector expectations.",
    ],
    solutions: [
      { title: "Lockdown & door control", desc: "One-button lockdown across access controllers, with intercom and PA integration." },
      { title: "Visitor management", desc: "Single-point entry, ID scanning and watch-list checks at front offices." },
      { title: "Campus video", desc: "Perimeter, parking-lot and corridor coverage with respectful indoor placement and clear retention rules." },
      { title: "Duress & threat reporting", desc: "Staff duress, anonymous tip lines and integrated escalation to administration and police." },
      { title: "Cyber security for districts and universities", desc: "Segmentation, endpoint protection, vulnerability management and incident response." },
      { title: "24/7 monitoring & response", desc: "Verified after-hours intrusion and alarm response from our Canadian monitoring centre." },
    ],
    complianceHeading: "Privacy, child safety and standards",
    compliance: [
      "Fortega designs to PIPEDA and provincial education and privacy law (e.g., MFIPPA, FIPPA, FOIP), with retention and access policies that match what regulators and school-board counsel expect.",
      "We support routine police-liaison reviews, lockdown drills and threat-assessment processes with documented procedures, system maps and access-event evidence.",
    ],
    whyHeading: "Why schools and campuses choose Fortega",
    why: [
      "We treat schools as schools — quiet installs, low-profile hardware, finishes that respect the building, and training pitched at administrators and facilities managers, not security engineers.",
      "One vendor handles physical and cyber security across a district or campus, so accountability sits in one place when something matters.",
    ],
    faqs: [
      { q: "Can Fortega support a board-wide rollout?", a: "Yes. We standardise hardware, configuration and monitoring across districts and campuses so every site reports the same way." },
      { q: "Do you provide cameras inside classrooms?", a: "Generally no. Cameras are placed in public and shared spaces; classroom placement is rare and considered case-by-case with administration." },
      { q: "Can you integrate with our existing PA and intercom?", a: "Yes. Lockdown actions and access events can trigger PA and intercom systems from major manufacturers." },
      { q: "Do you have experience with university research environments?", a: "Yes. We secure research labs, animal facilities and high-value equipment areas with layered access, video and audit trails." },
    ],
  },
  {
    slug: "government",
    name: "Government & Public Sector",
    shortName: "Government & public sector",
    h1: "Security and cyber programs for Canadian government clients",
    metaTitle: "Government & Public Sector Security Solutions Canada | Fortega",
    metaDescription:
      "Federal, provincial and municipal security: access control, video, cleared personnel and cyber security for Canadian government facilities. Delivered by Fortega.",
    eyebrow: "Industry",
    intro:
      "Government facilities operate under public scrutiny, fixed budgets and security obligations that span everything from front-counter safety to classified-data protection. Fortega delivers integrated programs for federal, provincial and municipal clients across Canada with disciplined documentation, accountable delivery and the discretion the sector expects.",
    threatHeading: "Threats facing public-sector clients",
    threats: [
      "Front-counter aggression toward public-facing employees is rising across municipal services, social assistance, courts and licensing offices. Duress and verified response are now baseline expectations.",
      "Critical infrastructure — water, wastewater, transit, public works — increasingly faces cyber attack from both criminal and state-linked actors. Many sites still rely on flat networks and unsupported control systems.",
      "Records, evidence and chain-of-custody requirements demand tamper-evident video and access logs that hold up in court and in freedom-of-information disclosures.",
      "Procurement timelines and vendor scrutiny mean a security partner must produce documentation, references and compliance evidence as a matter of course — not as a one-off ask.",
    ],
    approachHeading: "How Fortega delivers for government",
    approach: [
      "We respond to public procurement with the documentation, references, financial disclosures and compliance evidence Canadian buyers require. Project management is disciplined and audit-friendly from kickoff to handover.",
      "Designs respect classified, protected and unclassified zoning, with access control and video architecture that matches each zone's requirements. Cleared technicians are available when projects require them.",
      "On the cyber side, we align programs to ITSG-33, NIST CSF and CCCS guidance, and segment OT networks for water, transit and public-works clients.",
    ],
    solutions: [
      { title: "Zoned access control", desc: "Architecture aligned with public, operations and protected zones with auditable change control." },
      { title: "Public-facing video & duress", desc: "Counter, lobby and parkade coverage with staff duress wired to verified monitoring." },
      { title: "Critical-infrastructure OT security", desc: "Network segmentation, asset discovery and intrusion detection for control systems." },
      { title: "Records & evidence retention", desc: "Tamper-evident video and access logs that support FOI and court disclosure." },
      { title: "Cleared personnel & vetted vendors", desc: "Security-cleared field staff available where projects require them." },
      { title: "24/7 Canadian monitoring", desc: "Verified alarm, duress and intrusion response from a Canadian monitoring centre." },
    ],
    complianceHeading: "Standards, frameworks and procurement",
    compliance: [
      "Programs align with ITSG-33, NIST CSF, CCCS guidance, PIPEDA and provincial freedom-of-information and privacy law. Where required, we deliver against CATSA, Transport Canada and provincial sector-specific frameworks.",
      "Procurement responses include references, financials, insurance, safety records and prior public-sector delivery history — the package Canadian buyers expect.",
    ],
    whyHeading: "Why government clients choose Fortega",
    why: [
      "Canadian-owned and Canadian-operated, with a single accountable team for physical and cyber security across multi-year programs.",
      "Disciplined documentation, change control and reporting — the difference between a vendor who delivers a system and a partner who can be audited.",
    ],
    faqs: [
      { q: "Do you respond to public RFPs?", a: "Yes. Fortega regularly responds to federal, provincial and municipal procurements with full documentation and references." },
      { q: "Can you provide security-cleared personnel?", a: "Yes. We make cleared field staff available where project requirements demand them." },
      { q: "Do you support critical-infrastructure OT environments?", a: "Yes. Our cyber team specialises in segmenting and monitoring OT networks for water, transit and public works." },
      { q: "How do you handle FOI requests touching video?", a: "Retention, masking and disclosure procedures are documented up-front so FOI requests can be answered without ad-hoc engineering." },
    ],
  },
  {
    slug: "multi-family-residential",
    name: "Multi-Family Residential",
    shortName: "Multi-family residential",
    h1: "Security solutions for multi-family residential properties",
    metaTitle: "Multi-Family Residential Security Systems Canada | Fortega",
    metaDescription:
      "Lobby, parkade and amenity security for Canadian condos, rentals and student housing. Cloud access control and verified monitoring from Fortega.",
    eyebrow: "Industry",
    intro:
      "Multi-family buildings juggle the security expectations of hundreds of residents with the budget realities of a board or operator. Fortega protects Canadian condos, purpose-built rentals and student housing with cloud-based access, smart video and 24/7 monitoring designed for residential life — from move-in day to lost-fob Monday morning.",
    threatHeading: "What residential operators are dealing with",
    threats: [
      "Lobby and parkade tailgating remains the most common point of unauthorized entry. Once inside, package theft, mail-room break-ins and vehicle break-ins follow quickly.",
      "Fob and key duplication, lost credentials and roommate sharing make legacy access systems leaky. Cloud platforms with mobile credentials and self-service revocation close that gap.",
      "Short-term rental misuse turns suites into hospitality units overnight, with strangers gaining building credentials. Without intelligent access policies, operators have no visibility.",
      "Resident-on-resident incidents and disputes increasingly need verifiable video evidence to support concierge, property management and police.",
    ],
    approachHeading: "Fortega's residential approach",
    approach: [
      "We design for resident experience first. Mobile credentials, visitor pre-authorisation and intercom integration mean residents move through the building seamlessly while operators retain control.",
      "Common-area video covers lobbies, mail rooms, parkades, amenity spaces and back-of-house — never inside suites. Retention and signage follow PIPEDA and provincial privacy expectations.",
      "Our 24/7 monitoring centre handles after-hours intrusion, panic and amenity-space alarms with verified dispatch, taking pressure off concierge and on-call property management.",
    ],
    solutions: [
      { title: "Cloud access control", desc: "Mobile credentials, instant revocation and per-suite access logs." },
      { title: "Lobby & parkade video", desc: "Tailgating, line-crossing and vehicle-event analytics with evidentiary retention." },
      { title: "Intercom & visitor management", desc: "Video intercom, visitor pre-auth and delivery handling for parcels." },
      { title: "Amenity & short-term-rental controls", desc: "Time-bound access to gyms, pools and party rooms; policy controls on short-term-rental use." },
      { title: "Concierge & panic systems", desc: "Front-desk duress and verified response to support concierge teams." },
      { title: "Mailroom & parcel security", desc: "Camera coverage and access control on parcel rooms and locker installations." },
    ],
    complianceHeading: "Privacy and tenancy considerations",
    compliance: [
      "Fortega designs to PIPEDA and provincial privacy law (e.g., Quebec's Law 25), with retention, signage and access policies that match what residents, regulators and tenancy boards expect.",
      "Common-area video, intercom recording and access logs are configured for landlord-tenant disputes without crossing into in-suite surveillance.",
    ],
    whyHeading: "Why operators choose Fortega",
    why: [
      "One vendor for access, video, intercom and monitoring across a portfolio of buildings, with consistent resident experience and consistent management reporting.",
      "Canadian monitoring centre and Canadian field service, with operators trained on residential scenarios — not commercial scripts.",
    ],
    faqs: [
      { q: "Can residents use mobile phones as fobs?", a: "Yes. Our cloud access platforms support mobile credentials on iOS and Android with secure provisioning." },
      { q: "Can you integrate with our intercom and elevator?", a: "Yes. Major video intercom and elevator destination-dispatch platforms are supported." },
      { q: "How do you handle short-term rental restrictions?", a: "Access policies, time-bound credentials and analytics give operators visibility and control over short-term rental activity." },
      { q: "What happens when a resident loses their fob?", a: "Concierge or operator staff revoke and reissue credentials instantly through the cloud portal — no truck roll required." },
    ],
  },
  {
    slug: "cannabis",
    name: "Cannabis",
    shortName: "Cannabis",
    h1: "Health Canada–compliant security for licensed cannabis facilities",
    metaTitle: "Cannabis Security Systems Canada — Health Canada Compliant | Fortega",
    metaDescription:
      "Cultivation, processing and retail cannabis security: cameras, access control, vault monitoring and Health Canada–aligned documentation from Fortega.",
    eyebrow: "Industry",
    intro:
      "Cannabis licence holders operate under one of the most prescriptive physical-security regimes in Canada. Cultivation, processing, distribution and retail each face specific obligations under the Cannabis Act and Cannabis Regulations. Fortega designs compliant systems for licence holders across Canada — and produces the documentation Health Canada and provincial regulators actually want to see.",
    threatHeading: "The cannabis security landscape",
    threats: [
      "Diversion is the single largest regulator concern. Every gram leaving a site must be accounted for, and security systems exist primarily to make diversion detectable.",
      "External theft, break-in and robbery target retail and distribution. Verified monitoring with armed-response coordination is increasingly standard at high-volume retail.",
      "Internal theft and insider risk grow with workforce scale. Cameras tied to seed-to-sale platforms, vault access and waste-disposal procedures are the controls regulators expect.",
      "Provincial retail rules add their own physical-security requirements — entrance controls, age verification, vault placement, opaque windowing — varying by province.",
    ],
    approachHeading: "How Fortega builds compliant cannabis programs",
    approach: [
      "Designs are mapped to s.62–82 of the Cannabis Regulations and provincial retail rules from day one. Camera coverage of every perimeter point, every restricted-access door, every storage area and every destruction event is documented in a coverage map regulators can read.",
      "Access control segments operations, storage, vault and waste handling, with audit trails that line up with seed-to-sale data. Two-person rule enforcement is supported at the vault and during destruction.",
      "Our 24/7 monitoring centre handles intrusion, panic and after-hours alarms with verified dispatch and the recording retention required by regulation.",
    ],
    solutions: [
      { title: "Regulation-aligned video", desc: "Perimeter, restricted-area and vault coverage meeting Cannabis Regulations and provincial retail rules." },
      { title: "Vault & restricted-access control", desc: "Two-person rule support, audit trails and time-locked storage." },
      { title: "Seed-to-sale integration", desc: "Access and video events tied to inventory and destruction records." },
      { title: "Retail entrance & age control", desc: "Vestibule controls, ID verification and panic systems aligned with provincial rules." },
      { title: "Cyber security for licence holders", desc: "Network segmentation and protection for seed-to-sale, GACP and corporate systems." },
      { title: "24/7 verified monitoring", desc: "Canadian monitoring centre with cannabis-trained operators and regulator-aligned retention." },
    ],
    complianceHeading: "Health Canada and provincial regulators",
    compliance: [
      "Fortega designs against the Cannabis Regulations Part 4 (Physical Security), Health Canada Directives, and the retail security frameworks of AGCO, AGLC, BCCS, SAQ and other provincial bodies.",
      "Documentation deliverables — coverage maps, retention proofs, access policies, monitoring procedures and incident logs — are produced as part of every project so audits and renewals are routine.",
    ],
    whyHeading: "Why licence holders choose Fortega",
    why: [
      "We've designed against cannabis regulation since legalization and stay current as Health Canada and provincial bodies update their expectations.",
      "One accountable team for design, install, monitoring and cyber — so a single vendor stands behind the program when an inspector arrives.",
    ],
    faqs: [
      { q: "Does Fortega produce documentation for Health Canada audits?", a: "Yes. Coverage maps, retention proofs, access policies and monitoring procedures are standard deliverables on every cannabis project." },
      { q: "Can you support both cultivation and retail?", a: "Yes. Fortega works with cultivators, processors, distributors and provincial-authorised retailers across Canada." },
      { q: "Do you handle vault and destruction-event recording?", a: "Yes. Vaults are designed with two-person rule support and destruction events are captured on dedicated, time-stamped video." },
      { q: "Can you secure seed-to-sale systems on the network?", a: "Yes. Our cyber team segments cannabis operational systems from corporate IT and monitors for anomalous activity." },
    ],
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    shortName: "Financial services",
    h1: "Branch and operations security for Canadian financial institutions",
    metaTitle: "Financial Services & Bank Security Systems Canada | Fortega",
    metaDescription:
      "Branch, ATM, cash-handling and back-office security for Canadian banks, credit unions and fintechs. Verified monitoring and cyber protection from Fortega.",
    eyebrow: "Industry",
    intro:
      "Financial institutions face threats across a wide spectrum: branch robbery, ATM attack, cash-in-transit risk, insider fraud and an unrelenting cyber adversary. Fortega designs and operates security programs for Canadian banks, credit unions, wealth managers and fintech operations that protect customers, employees and the brand — without making the branch feel hostile.",
    threatHeading: "Threats facing financial institutions",
    threats: [
      "Branch robbery has declined in volume but increased in violence and sophistication. Duress, verified response and evidentiary video remain non-negotiable.",
      "ATM attacks — physical removal, deposit fraud, skimming and explosive attacks — continue to evolve and demand layered camera, sensor and monitoring response.",
      "Insider fraud and account manipulation are detectable only when teller-area cameras, access logs and transaction data can be correlated quickly.",
      "Ransomware and account-takeover campaigns target both core systems and the office networks that increasingly run branch infrastructure.",
    ],
    approachHeading: "Fortega's financial-services approach",
    approach: [
      "Branch designs cover teller areas, vault rooms, ATM lobbies and after-hours vestibules with the camera quality and retention regulators and insurers expect. Duress is wired to verified response from our Canadian monitoring centre.",
      "Cash-handling areas, back-office and IT closets carry tighter access control with audit trails that survive an internal investigation.",
      "On the cyber side, we segment branch, ATM and corporate networks, harden building systems and run programs aligned to OSFI guidance and customer-driven audit expectations.",
    ],
    solutions: [
      { title: "Branch & ATM video", desc: "Teller, vestibule and ATM-lobby coverage with evidentiary retention and tamper-evident logs." },
      { title: "Teller duress & verified response", desc: "Discreet duress devices with two-way audio and verified dispatch." },
      { title: "Vault & cash-handling access", desc: "Layered access control with audit trails for internal investigation support." },
      { title: "ATM attack monitoring", desc: "Vibration, gas and forced-entry sensors integrated with verified video monitoring." },
      { title: "Cyber security for FIs", desc: "Segmentation, endpoint protection, vulnerability management and incident response aligned to OSFI guidance." },
      { title: "24/7 Canadian monitoring", desc: "Verified alarm, duress and intrusion response by operators trained on financial-services scenarios." },
    ],
    complianceHeading: "Regulatory and audit alignment",
    compliance: [
      "Programs align with OSFI guidance (E-21, B-13), PIPEDA, provincial credit-union regulators, FINTRAC reporting needs and customer-driven cyber audit (NIST CSF, ISO 27001, SOC 2).",
      "Camera retention, access logs and incident documentation are produced in formats internal audit, external assessors and law enforcement actually accept.",
    ],
    whyHeading: "Why FIs choose Fortega",
    why: [
      "Canadian-owned, Canadian-monitored, with a single accountable team across branches, ATM fleet, back-office and corporate environments.",
      "Cyber and physical security under one roof — important when the same network carries cameras, ATMs and core banking traffic.",
    ],
    faqs: [
      { q: "Can Fortega monitor our ATM fleet?", a: "Yes. ATM sensors, cameras and alarms can all be brought into our Canadian monitoring centre for verified response." },
      { q: "Do you support credit-union and second-tier FI needs?", a: "Yes. Fortega works with banks, credit unions, wealth managers and fintech operations of every scale across Canada." },
      { q: "Can you align with OSFI cyber expectations?", a: "Yes. Our cyber programs map to OSFI E-21 and B-13 and support customer-driven third-party assessments." },
      { q: "Do you handle branch openings and refurbishments?", a: "Yes. Fortega delivers full branch security programs as part of new builds and refurbishments, on disciplined construction schedules." },
    ],
  },
];

export const INDUSTRY_BY_SLUG: Record<string, Industry> = Object.fromEntries(
  INDUSTRIES.map((i) => [i.slug, i]),
);