/** General service guidance informed by the Semrush Canada research, not local demand or delivery evidence. */
export type SearchFAQ = { q: string; a: string };
type SearchContent = { overview: string; faqs: SearchFAQ[] };

export function isNonPricingQuestion(question: string): boolean {
  return !/\b(costs?|prices?|pricing|quotes?|fees?|budgets?|charges?|hourly rates?|service rates?)\b|\bhow much\b/i.test(question);
}

export const SERVICE_SEARCH_CONTENT: Record<string, SearchContent> = {
  consulting: {
    overview: "Security consulting and a security risk assessment help define protection priorities before equipment is selected. Review physical security, existing controls, operating procedures and assessment deliverables together; the scope determines whether a remote review or further site inspection is needed.",
    faqs: [
      { q: "What is a security risk assessment?", a: "A security risk assessment identifies assets, threats, vulnerabilities and existing safeguards. It records assumptions and prioritizes practical recommendations; it is not a guarantee that incidents will be prevented." },
      { q: "What should a security risk assessment include?", a: "Define the property and systems in scope, building use, access needs, existing controls and operational responsibilities. Agree how findings, exclusions, evidence and follow-up actions will be documented." },
      { q: "How does security consulting help with existing security systems?", a: "An assessment can compare the current CCTV, alarms and door access arrangements with the organization's needs. Equipment inventories and drawings help identify compatibility questions before replacement or integration is recommended." },
      { q: "Can a security assessment start with drawings and layouts?", a: "Fortega can begin an initial review with drawings, layouts, building type and location. Whether an inspection is needed and what the final report covers must be agreed for the project." },
      { q: "When should a business review its physical security plan?", a: "Review the plan when occupancy, operating hours, access permissions or equipment change, and after an incident reveals a gap. The review should consider operating procedures as well as devices." },
    ],
  },
  cctv: {
    overview: "Security camera installation, CCTV installation and surveillance camera installation should begin with the purpose of each view. Commercial security cameras need suitable lighting, cable routes, recording retention and controlled access; camera and recorder compatibility must be checked before an upgrade.",
    faqs: [
      { q: "What should security camera installation include?", a: "Document intended views, camera positions, power and cabling, recording storage and permitted users. Handover should test usable image detail, playback, incident exports and any agreed remote access." },
      { q: "Where should commercial security cameras be positioned?", a: "Start with entrances, loading areas and other areas relevant to the documented purpose. Check lighting, obstructions and the detail required while avoiding unnecessary capture of neighbouring properties and private areas." },
      { q: "Can existing CCTV cameras and cabling be reused?", a: "Provide camera, recorder and cable details for a compatibility review. Reuse depends on condition, supported signals, resolution, power and recording requirements; it should not be assumed from appearance alone." },
      { q: "Do security cameras need internet to record?", a: "Some systems record locally without an internet connection. Cloud recording and off-site viewing need suitable communications; confirm what continues recording when connectivity is interrupted." },
      { q: "How long should CCTV recordings be kept?", a: "Choose retention against the documented surveillance purpose and applicable privacy requirements, not a universal number of days. Limit access and test deletion settings and storage capacity." },
      { q: "How should outdoor surveillance cameras be selected?", a: "Check expected temperature, water exposure, lighting, mounting and cable protection against manufacturer specifications. A town's climate description is not an equipment rating for every mounting position." },
    ],
  },
  intrusion: {
    overview: "Business alarm systems and commercial alarm systems combine selected sensors with arming procedures and communications. Alarm monitoring adds a separate verification and escalation arrangement; intrusion detection, environmental alerts and emergency attendance are not interchangeable services.",
    faqs: [
      { q: "How do business alarm systems work?", a: "Configured door contacts, motion detectors and other sensors report events to an alarm panel. What happens next depends on arming settings, communications and any agreed alarm monitoring arrangement." },
      { q: "What happens after a commercial alarm is triggered?", a: "Follow the agreed verification and escalation procedure, including named contacts and any authorized attendance. Receiving an alarm signal does not guarantee emergency-service arrival or a particular response time." },
      { q: "What is the difference between an alarm and alarm monitoring?", a: "An alarm system detects configured events and may activate a local sounder. Monitoring is an arrangement for receiving and handling signals; confirm hours, verification duties and escalation separately." },
      { q: "Can an existing business alarm system be upgraded?", a: "Review the panel model, sensors, wiring, communications and current configuration. Compatibility and condition determine what can be reused and whether new equipment supports the required monitoring path." },
      { q: "How can a business reduce false alarms?", a: "Check detector positioning, arming schedules, user training and maintenance. Test after changes and agree signal verification so routine activity is not mistaken for an intrusion." },
      { q: "What happens to an alarm during power or network loss?", a: "Behaviour depends on battery capacity, configured communications and signal-loss reporting. Test the specific installation; a backup path only helps if it is available and correctly configured." },
    ],
  },
  access: {
    overview: "Access control systems, including a commercial access control system or door access control system, manage who can enter and when. Reader technology, credentials, door hardware and administration need to be assessed together rather than treating a card reader as a complete solution.",
    faqs: [
      { q: "How do access control systems work?", a: "A reader passes a credential to a controller, which applies the configured permissions and schedule. Door hardware performs the physical locking function; entry permissions and safe exit behaviour must be assessed separately." },
      { q: "What should a commercial access control system include?", a: "Identify controlled openings, compatible readers and controllers, suitable locking hardware, user roles and event records. Include lost-credential revocation, administration responsibilities and a handover test." },
      { q: "Can door access control use cards, fobs or mobile credentials?", a: "Those options depend on the reader, controller and management platform. Confirm supported credential types, enrolment, revocation and whether existing credentials can be reused." },
      { q: "Can access control integrate with CCTV and business alarms?", a: "Integration may allow permitted access events to be reviewed alongside video or alarm activity. Confirm supported interfaces, permissions and test cases before promising a particular workflow." },
      { q: "What happens to controlled doors during a power outage?", a: "Door behaviour depends on the lock, controller, backup supply and required exit function. Review emergency release and safe egress with the appropriate building authority and test the actual opening." },
      { q: "How should visitor and contractor access be managed?", a: "Use named permissions limited to the relevant doors and times. Assign responsibility for approval, expiry and revocation rather than sharing permanent staff credentials." },
    ],
  },
  remote: {
    overview: "Remote video monitoring, live video monitoring and CCTV monitoring describe capabilities that must be scoped clearly. A security camera monitoring service needs usable camera views, communications, agreed monitoring hours and defined escalation; remote viewing alone does not establish operator monitoring.",
    faqs: [
      { q: "How does remote video monitoring work?", a: "Suitable cameras supply images for an agreed observation or event-verification process. The procedure defines when operators review activity, what they may do and who receives an escalation." },
      { q: "Is live video monitoring the same as recording CCTV?", a: "No. Recording stores footage for later review; live video monitoring includes an agreed review and action process. A system can record without an operator actively watching it." },
      { q: "Can existing security cameras support remote monitoring?", a: "Check camera and recorder compatibility, lighting, upload capacity and secure access. Confirm whether views are usable for the intended events and test the communications path." },
      { q: "Does remote video monitoring include on-site attendance?", a: "Not automatically. Physical attendance needs a separately confirmed responder and procedure. A verified video event does not establish local personnel availability or an arrival time." },
      { q: "What happens when the monitoring connection fails?", a: "Agree connection-loss notices, alternate contacts and restoration responsibilities. Local recording may continue on some systems, but operator access and recording continuity must be tested separately." },
      { q: "How is access to monitored video controlled?", a: "Limit access to authorized users and documented purposes. Confirm authentication, activity records, retention and how access is removed when responsibilities change." },
    ],
  },
  guards: {
    overview: "Security guard services and mobile patrol security describe different staffing duties and attendance arrangements. These topics are requirements guidance only: Fortega's delivery eligibility and personnel availability remain unresolved, so this content does not offer coverage.",
    faqs: [
      { q: "What is the difference between security guard services and mobile patrol security?", a: "An assigned guard may carry out agreed duties at a property, while mobile patrol generally involves defined visits between sites. Neither term establishes the schedule, powers, provider or availability for a particular project." },
      { q: "What needs to be confirmed before arranging on-site security?", a: "Verify delivery eligibility, the provider, personnel availability, duties, supervision, reporting and escalation. Fortega's eligibility for that scope is unresolved; this draft is not a coverage offer." },
      { q: "What should a security patrol brief include?", a: "Describe permitted areas, visit requirements, reporting expectations and escalation contacts through an appropriate secure process. Do not expose access codes or detailed vulnerabilities in a public enquiry." },
      { q: "Can remote video monitoring replace on-site security personnel?", a: "Video can support observation and verification, but it cannot perform physical visitor handling or site attendance. Assess required duties separately and do not assume one arrangement replaces the other." },
      { q: "How should incident reporting and escalation be defined?", a: "Agree which events are recorded, who receives reports and which actions are authorized. Attendance and emergency responsibilities require a verified provider and project-specific procedure." },
    ],
  },
  smart: {
    overview: "Building automation systems and smart building automation coordinate selected equipment, schedules and sensors. HVAC, lighting, security and building-management integrations depend on supported interfaces, operating permissions and commissioning; connecting devices alone does not guarantee savings or safe control.",
    faqs: [
      { q: "What is a building automation system?", a: "A building automation system uses controllers, sensors and software to manage selected building functions. The actual scope may include schedules, alerts and control of compatible equipment." },
      { q: "What can smart building automation control?", a: "Depending on supported equipment, a project may include HVAC schedules, lighting or environmental alerts. Confirm the interfaces and operator permissions; not every existing device supports integration." },
      { q: "Can building automation integrate with an existing BMS?", a: "Inventory the platform, controllers, supported protocols and access permissions. Integration should be confirmed through documentation and testing rather than assumed from the BMS name." },
      { q: "What happens if an automation network fails?", a: "Define local control, manual overrides, alert handling and recovery. Test the required behaviour during network or power interruption before relying on remote operation." },
      { q: "How should connected building devices be secured?", a: "Use named accounts, strong authentication where supported, maintained software and network separation. Document who may change settings and how access and backups are managed." },
      { q: "Can building automation guarantee energy savings?", a: "No universal saving can be promised. Establish an operating baseline, agreed measures and a measurement method before evaluating the effect of a specific change." },
    ],
  },
  cyber: {
    overview: "Cybersecurity services, cyber security services and network security services should define the systems, responsibilities and business needs in scope. Strong authentication, maintained software, network separation, protected backups and incident procedures are practical starting points, not proof of a town-specific threat.",
    faqs: [
      { q: "What should cybersecurity services cover?", a: "Define systems in scope and responsibility for assessment, prevention, monitoring and incident response. Review accounts, patching, network separation, backups and recovery requirements." },
      { q: "Why do Canadian businesses need cybersecurity services?", a: "Businesses depend on systems and data that can be disrupted or accessed without authorization. Appropriate controls support continuity and protection of information, but must be selected for the organization's actual risks." },
      { q: "What is the difference between cybersecurity and network security?", a: "Cybersecurity covers protection of systems, accounts, applications and data. Network security focuses on communications and network access; it is one part of the wider security scope." },
      { q: "Can CCTV and access control devices create cyber risks?", a: "Connected cameras and door controllers need maintained software, controlled accounts and appropriate network separation. Assess actual device capabilities and configuration rather than assuming all connected equipment is equally secure." },
      { q: "What should a cybersecurity incident response plan include?", a: "Identify decision-makers, incident contacts, containment responsibilities and recovery priorities. Agree how evidence is preserved and how the organization communicates during an incident." },
      { q: "How can a business check that its backups are usable?", a: "Document backup ownership, protection and recovery requirements. Perform controlled restore tests and check the recovered data and systems; a successful backup notification alone does not prove recovery works." },
    ],
  },
};

export function getServiceSearchFaqs(serviceSlug: string): SearchFAQ[] {
  return (SERVICE_SEARCH_CONTENT[serviceSlug]?.faqs ?? []).filter(faq => isNonPricingQuestion(faq.q));
}

export const PROJECT_ENQUIRY_FAQS: SearchFAQ[] = [
  { q: "Can assessment start remotely?", a: "Fortega can begin with drawings, layouts, building type and location. Any site visit, travelling technician or local partner arrangement is confirmed for the project; no local team or response time is promised." },
  { q: "What should the first enquiry include?", a: "Provide a non-sensitive project summary and existing-equipment details where available. Do not send passwords, access codes or detailed security vulnerabilities through the contact form; agree a suitable way to share drawings." },
];