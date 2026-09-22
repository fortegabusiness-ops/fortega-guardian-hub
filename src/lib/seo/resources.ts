/**
 * Answer-first guides for the /resources hub.
 *
 * Every guide answers a question Canadian businesses actually search for when
 * they are scoping commercial security. Content is written to be genuinely
 * useful and factual: no invented Fortega clients, numbers or certifications.
 * Ranges given as "typical" are described as planning ranges, not quotes.
 */

export type GuideSection = { heading: string; body: string[]; list?: string[] };

export type Guide = {
  slug: string;
  title: string;      // H1
  metaTitle: string;  // <= 60 chars
  question: string;   // the search question this page answers
  answer: string;     // answer-first paragraph (AEO/GEO)
  description: string; // meta description, <= 155 chars
  category: "Cost & planning" | "Technology" | "Compliance" | "Operations";
  readMinutes: number;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  related: string[]; // slugs
};

export const GUIDES: Guide[] = [
  {
    slug: "commercial-security-system-cost-canada",
    title: "What does a commercial security system cost in Canada?",
    metaTitle: "Commercial Security System Cost in Canada",
    question: "How much does a commercial security system cost in Canada?",
    answer:
      "There is no single price: a commercial security system is quoted from door count, camera count, how much cabling the building needs, and whether monitoring and service are included. Most Canadian businesses plan for a one-time design and installation cost plus a recurring monthly cost for monitoring, cloud video and support. The honest way to get a number is a site assessment — anything quoted before someone has seen the building is a guess.",
    description:
      "What drives the price of a commercial security system in Canada — equipment, cabling, monitoring and service — and how to compare quotes fairly.",
    category: "Cost & planning",
    readMinutes: 6,
    sections: [
      {
        heading: "The four things that actually move the price",
        body: [
          "Two buildings of the same square footage can differ by a factor of three in cost. The variables that matter are rarely the camera brand on the quote.",
        ],
        list: [
          "Openings: every controlled door needs a reader, a controller port, a lock or strike, request-to-exit hardware and, often, an electrician.",
          "Cabling conditions: open ceilings and existing conduit are cheap; finished drywall, concrete, heritage buildings and outdoor runs are not.",
          "Camera count and retention: 30 days of 4K on 40 cameras is a very different storage bill than 14 days of 1080p on 12.",
          "Recurring services: monitoring, cloud video licensing, remote guarding hours, maintenance and software subscriptions.",
        ],
      },
      {
        heading: "One-time versus monthly",
        body: [
          "Treat the two budgets separately. The one-time budget covers design, hardware, cabling, installation, configuration, commissioning and training. The monthly budget covers alarm monitoring, cloud video or access licences, remote guarding if used, and a service agreement.",
          "A cheap installation with expensive proprietary licensing can cost more over five years than a higher install price on open hardware. Ask any vendor for a five-year total, not just the install number.",
        ],
      },
      {
        heading: "How to compare quotes fairly",
        body: [
          "Quotes are rarely like-for-like. Before comparing, normalise them.",
        ],
        list: [
          "Same camera count, same resolution, same retention days.",
          "Same number of controlled doors and the same lock hardware type.",
          "Cabling included or excluded — and who pays if the walls surprise everyone.",
          "Who owns the recordings, the licences and the account when the contract ends.",
          "Contract length, escalation clauses and what happens after a monitoring contract expires.",
          "Response time and service levels in writing, not implied.",
        ],
      },
      {
        heading: "Where budgets usually get blown",
        body: [
          "The common overruns are not equipment: they are network switches and power that nobody scoped, an electrician needed for door hardware, storage sized for the wrong retention period, and a second mobilisation because the site was not ready on install day.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it cheaper to buy or lease a commercial security system?",
        a: "Buying costs more up front and less over time; leasing or bundling hardware into a monitoring contract spreads the cost but usually locks you in for several years and can mean you do not own the equipment. Compare the five-year total and check who owns the hardware at the end.",
      },
      {
        q: "Does a security system reduce commercial insurance premiums?",
        a: "Often yes — monitored intrusion detection and, in some cases, video surveillance can reduce premiums or be a condition of coverage. Ask your broker what evidence they need; monitoring certificates and system documentation are usually part of it.",
      },
      {
        q: "How long does a commercial installation take?",
        a: "A small single-site system is typically days; a multi-door, multi-camera building is usually one to three weeks of on-site work after design approval and equipment delivery. Long-lead hardware and after-hours work in occupied buildings extend the schedule.",
      },
    ],
    related: ["how-many-security-cameras-does-my-business-need", "remote-guarding-vs-security-guards", "commercial-vs-residential-security-systems"],
  },
  {
    slug: "how-many-security-cameras-does-my-business-need",
    title: "How many security cameras does my business need?",
    metaTitle: "How Many Security Cameras Does a Business Need?",
    question: "How many security cameras does my business need?",
    answer:
      "Count objectives, not square footage. Every camera on a commercial system should exist to do one identifiable job: identify a face at an entrance, read a plate at a gate, prove a transaction at a till, or cover a high-value asset. A small retail store commonly lands between 8 and 16 cameras, an office floor between 6 and 12, and a warehouse can run well past 30 — but the right number comes from a walk-through that lists every entrance, blind spot and asset worth proving.",
    description:
      "A practical method for scoping camera coverage in a commercial building — entrances, assets, blind spots — plus placement and retention guidance.",
    category: "Cost & planning",
    readMinutes: 5,
    sections: [
      {
        heading: "Start with a coverage list, not a number",
        body: ["Walk the building and write down each thing a camera must accomplish. The list, not a rule of thumb, is your camera count."],
        list: [
          "Every exterior door, including fire exits and loading doors.",
          "Points of sale, cash handling areas and safes.",
          "Receiving and shipping areas where inventory changes hands.",
          "Server rooms, electrical rooms and anywhere keys or stock are stored.",
          "Parking areas and approach routes where incidents usually begin.",
          "Any area that has generated an incident, a complaint or an insurance claim before.",
        ],
      },
      {
        heading: "Identification versus overview",
        body: [
          "The most common design mistake is mounting everything high and wide. A camera at 3.5 m covering a whole room produces footage that shows something happened but not who did it.",
          "Pair the two roles: an overview camera for context, and an identification camera at head height near each entry that captures usable faces. Same for vehicles — a plate camera is a dedicated, tightly framed camera, not a corner of a wide shot.",
        ],
      },
      {
        heading: "Retention drives storage, storage drives price",
        body: [
          "Decide how far back you need to look before you size recording. Many businesses settle on 30 days; insurance, franchise agreements or regulated sectors may require longer. Doubling retention roughly doubles storage, and 4K roughly quadruples the bill versus 1080p for the same days.",
          "Under Canadian privacy expectations, keep footage no longer than you have a reason to — an indefinite retention policy is both a storage cost and a liability.",
        ],
      },
      {
        heading: "Analytics reduce the number of cameras people watch",
        body: [
          "AI analytics do not reduce how many cameras you need, but they change how the system is used: line-crossing, loitering and person/vehicle classification turn passive recording into alerts that a monitoring centre or your own staff can act on.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long should a business keep CCTV footage in Canada?",
        a: "Keep it only as long as you have a purpose for it. Thirty days is a common commercial default; some sectors and insurers require more. Set the period in writing, apply it automatically, and document why you chose it.",
      },
      {
        q: "Do I need cameras inside as well as outside?",
        a: "Outside cameras prove approach and entry; inside cameras prove what happened. Most commercial losses — internal theft, disputes, slip-and-fall claims — are resolved by interior coverage of transaction and stock areas.",
      },
      {
        q: "Can I use my existing cameras with a new system?",
        a: "Often yes if they are IP cameras that support ONVIF, though older units may not meet the resolution or cyber-hardening standard of the new platform. Analog cameras can sometimes be retained with encoders as an interim step.",
      },
    ],
    related: ["commercial-security-system-cost-canada", "cctv-privacy-rules-canada", "integrating-access-control-and-cctv"],
  },
  {
    slug: "remote-guarding-vs-security-guards",
    title: "Remote guarding vs on-site security guards: which is right?",
    metaTitle: "Remote Guarding vs Security Guards Compared",
    question: "Is remote guarding cheaper than on-site security guards?",
    answer:
      "Remote guarding is usually less expensive per covered hour than a staffed guard post, because one operator supervises many sites through cameras, analytics and speakers. On-site guards are still the right answer when you need physical presence: customer interaction, access screening, escorts, key holding and hands-on incident response. Most mature programs blend the two — remote coverage overnight and weekends, guards during operating hours or at high-risk sites.",
    description:
      "How remote video guarding and on-site guards compare on cost, deterrence and response — and when a blended program makes more sense than either.",
    category: "Operations",
    readMinutes: 5,
    sections: [
      {
        heading: "What each one is actually good at",
        body: ["They solve different problems, which is why cost-per-hour comparisons alone mislead."],
        list: [
          "Remote guarding: wide coverage for low cost, live voice-down deterrence, verified alarms, virtual patrols on a schedule, full audit trail of every event.",
          "On-site guards: physical presence, access screening and visitor handling, de-escalation, escorts, key holding, first response and site knowledge.",
        ],
      },
      {
        heading: "Verified response matters more than either label",
        body: [
          "The practical value of remote guarding is verification. An operator who can see the event tells responders what is actually happening, which improves prioritisation and reduces false-alarm costs. Many municipalities charge for repeated false dispatches, so verification has a hard dollar value on top of the deterrence.",
        ],
      },
      {
        heading: "Where remote guarding works best",
        body: [
          "Sites with a defined perimeter and good camera coverage: construction sites, car and equipment lots, yards, self-storage, warehouses, closed retail after hours, and multi-site portfolios where staffing every location is impossible.",
        ],
      },
      {
        heading: "Where you still want people on site",
        body: [
          "Lobbies and reception, venues and events, healthcare and education settings, buildings with public access during the day, and anywhere policy requires a documented human presence.",
        ],
      },
      {
        heading: "Designing a blended program",
        body: [
          "The usual pattern: guards during staffed hours, remote guarding with voice-down and virtual patrols from close to open, and a mobile patrol or keyholder on call for physical response. Coverage is continuous; cost sits well below a 24/7 guard post.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does remote guarding replace alarm monitoring?",
        a: "No — it builds on it. Alarm monitoring reacts to a sensor; remote guarding adds trained operators watching live video, intervening by speaker, and verifying events before anyone is dispatched.",
      },
      {
        q: "Is remote guarding effective in bad weather or at night?",
        a: "Yes, with the right design: infrared or thermal cameras, adequate lighting, and analytics tuned for the site. Snow, rain and headlights all cause nuisance alerts if the system is not tuned for the local conditions.",
      },
      {
        q: "Do security guards need a licence in Canada?",
        a: "Yes. Guard licensing is provincial — each province or territory licenses individual guards and the agencies that employ them, with its own training and renewal rules. Always confirm both the agency licence and individual licences.",
      },
    ],
    related: ["commercial-security-system-cost-canada", "reduce-false-alarms-commercial", "commercial-vs-residential-security-systems"],
  },
  {
    slug: "choosing-a-commercial-access-control-system",
    title: "How to choose a commercial access control system",
    metaTitle: "How to Choose Commercial Access Control",
    question: "What type of access control system does my business need?",
    answer:
      "Choose by how you need to manage people, not by hardware brand. If you have one site and rarely change staff, a local controller with cards is enough. If you have turnover, contractors, several sites or after-hours access rules, cloud-managed access with mobile credentials pays for itself in administration alone. In every case, insist on modern encrypted credentials and OSDP-capable readers — legacy 125 kHz fobs are trivially cloned.",
    description:
      "Cloud vs on-premise, cards vs mobile credentials, and the door hardware questions that decide the real cost of access control.",
    category: "Technology",
    readMinutes: 6,
    sections: [
      {
        heading: "Cloud-managed or on-premise?",
        body: [
          "Cloud platforms give you one console for every site, automatic updates, remote unlock and instant credential revocation, for a per-door subscription. On-premise servers avoid subscriptions and keep everything inside your network, but you own patching, backups and remote access.",
          "Multi-site portfolios and organisations without IT staff generally land on cloud. Single sites with strict data-residency or air-gap requirements often stay on-premise.",
        ],
      },
      {
        heading: "Credentials: what to avoid and what to use",
        body: ["The credential decides how secure the door really is."],
        list: [
          "Avoid legacy 125 kHz proximity fobs — they can be copied at a kiosk for a few dollars.",
          "Use encrypted smart credentials (for example DESFire EV2/EV3) or mobile credentials over Bluetooth/NFC.",
          "Mobile credentials cut issuing and collection costs and are revoked instantly when someone leaves.",
          "Use OSDP rather than Wiegand between reader and controller, so the reader link itself is encrypted and supervised.",
          "Add multi-factor (credential plus PIN or biometric) only where the risk justifies the friction.",
        ],
      },
      {
        heading: "The door is half the project",
        body: [
          "The software is the visible part; the opening is where the money goes. Each controlled door needs the right lock type for its fire and code requirements, request-to-exit hardware, position monitoring, power, and often an electrician and a door-hardware specialist.",
          "Life safety wins every argument: free egress must work when power is lost, and fire-rated doors cannot be modified without regard to their rating. Get the authority having jurisdiction involved early on any change to an exit route.",
        ],
      },
      {
        heading: "Administration is the recurring cost nobody quotes",
        body: [
          "Ask how a new hire, a departing employee, a lost credential and a contractor with three-week access are handled. If the answer involves someone walking to a PC in a back office, the system will drift out of date — and stale credentials are the most common audit failure in access control.",
          "Look for scheduled access rules, temporary visitor credentials, HR or directory sync, and an exportable audit trail.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can access control integrate with our existing cameras and alarm?",
        a: "Usually yes. Modern platforms expose APIs or native integrations so a door event can call up video and an alarm partition can be armed or disarmed from the access system. Confirm the specific integration exists before you buy — 'open platform' is not the same as a supported integration.",
      },
      {
        q: "What happens to the doors during a power or internet outage?",
        a: "Controllers keep credentials and decisions locally, so doors keep working offline; cloud is used for management and reporting. Battery backup keeps hardware alive, and fail-safe or fail-secure behaviour is decided per door based on code and risk.",
      },
      {
        q: "How many doors should we control?",
        a: "Start with perimeter doors and any room holding cash, stock, data or hazardous material. Interior doors can be added later if the controller capacity and cabling were planned for it — which is why the design should allow expansion from day one.",
      },
    ],
    related: ["integrating-access-control-and-cctv", "commercial-security-system-cost-canada", "security-system-cyber-hardening"],
  },
  {
    slug: "integrating-access-control-and-cctv",
    title: "Integrating access control with CCTV: what it changes",
    metaTitle: "Integrating Access Control With CCTV",
    question: "Why integrate access control with video surveillance?",
    answer:
      "Integration links every door event to the video of that moment, so a badge swipe, a denied entry or a forced-door alarm opens the matching clip instead of an hour of scrubbing footage. For commercial sites it turns two separate systems into one investigation and compliance record, and lets the alarm, the door and the camera respond to each other automatically.",
    description:
      "How linking door events to video shortens investigations, cuts false alarms and produces a defensible audit trail for commercial sites.",
    category: "Technology",
    readMinutes: 5,
    sections: [
      {
        heading: "What integration actually does",
        body: ["At a minimum, the access platform and the video platform share events and time."],
        list: [
          "Every credential event is bookmarked in video, so an investigation takes seconds.",
          "Denied entries, door-held and door-forced alarms trigger recording, alerts and camera call-up.",
          "Photo-on-badge lets an operator compare the credential holder with the person at the door — the practical defence against passback and tailgating.",
          "Alarm arming and disarming can follow the first-in / last-out door event.",
        ],
      },
      {
        heading: "What it takes technically",
        body: [
          "Both systems need to be on a common, time-synchronised network with a supported integration — either native (same vendor or a certified partner) or through an API or middleware. Time sync via NTP is not optional: if clocks drift, every bookmark points at the wrong footage.",
          "Plan network capacity and VLAN segmentation up front. Cameras and door controllers belong on a segmented network, not on the guest Wi-Fi.",
        ],
      },
      {
        heading: "Payoff in three places",
        body: [
          "Investigations drop from hours to minutes. Verified alarms reduce nuisance dispatches and the fines that come with them. And compliance requests — an insurer, a regulator, a lawyer — get a single, coherent record instead of two exports that need to be reconciled.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do both systems have to come from the same manufacturer?",
        a: "No, but same-vendor or certified-partner combinations are the least fragile. With mixed vendors, confirm a documented, supported integration and who is responsible when a firmware update breaks it.",
      },
      {
        q: "Can we integrate the intrusion alarm as well?",
        a: "Yes — most commercial panels support integration so that disarming follows a valid credential at the first door and arming happens on last-out, which removes the most common cause of accidental alarms.",
      },
      {
        q: "Is integration worth it for a single small site?",
        a: "Often yes, because the same investigation benefit applies. The question is cost: if the integration requires an expensive licence tier, a small site may get most of the value from tight time sync and matching camera coverage at each controlled door.",
      },
    ],
    related: ["choosing-a-commercial-access-control-system", "how-many-security-cameras-does-my-business-need", "security-system-cyber-hardening"],
  },
  {
    slug: "cctv-privacy-rules-canada",
    title: "CCTV and privacy rules for Canadian businesses",
    metaTitle: "CCTV Privacy Rules for Canadian Businesses",
    question: "What are the rules for using security cameras at a business in Canada?",
    answer:
      "You need a defensible reason to record, notice for the people recorded, limits on who can view the footage, and a retention period tied to your purpose. Commercial video is personal information: federally it falls under PIPEDA, with substantially similar provincial laws in Quebec, British Columbia and Alberta, and separate rules for employee monitoring and public bodies. Cameras in areas with a high expectation of privacy — washrooms, change rooms — are not defensible in any province.",
    description:
      "Notice, purpose, retention and employee monitoring: the privacy basics Canadian businesses must document before installing security cameras.",
    category: "Compliance",
    readMinutes: 6,
    sections: [
      {
        heading: "Four things to document before installation",
        body: ["Privacy regulators consistently look for the same evidence, and it is easiest to produce at design time."],
        list: [
          "Purpose: the specific problem each camera addresses, written down.",
          "Notice: visible signage at entrances telling people recording is taking place and who to contact.",
          "Access: who may view live and recorded video, and how each viewing is logged.",
          "Retention: how long footage is kept, why that period, and automatic deletion after it.",
        ],
      },
      {
        heading: "Where you may not point a camera",
        body: [
          "Washrooms, change rooms, showers and similar areas are out. Beyond that, proportionality is the test: recording a stock room is easy to justify; continuously recording a single employee's workstation or a break room usually is not.",
          "Audio recording carries a higher bar than video in Canada and should not be enabled by default.",
        ],
      },
      {
        heading: "Employee monitoring has extra rules",
        body: [
          "Quebec's Law 25 imposes its own consent, transparency and breach obligations, and Ontario requires employers above a headcount threshold to maintain a written electronic monitoring policy. In unionised environments, surveillance is often a bargaining matter.",
          "The safe pattern everywhere: tell staff in writing what is recorded, why, who can see it and for how long — before the cameras go live.",
        ],
      },
      {
        heading: "Retention and disclosure in practice",
        body: [
          "Set retention automatically in the recorder, not as a policy someone remembers. Handle police and insurer requests through one named person, log every export, and release only the clip that is responsive to the request.",
          "Individuals may have a right to access footage of themselves; systems that can export a single clip with other people redacted make that request manageable rather than alarming.",
        ],
      },
      {
        heading: "Cross-border storage",
        body: [
          "If cloud video is stored outside Canada, disclose that. Quebec in particular requires an assessment before transferring personal information outside the province. Canadian data residency is available from most major platforms — ask for it explicitly rather than assuming it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need signs for security cameras in a business?",
        a: "Yes. Clear notice at each entrance is the baseline expectation across Canadian privacy regimes: it should state that video recording is in use and give a contact for questions.",
      },
      {
        q: "How long can a business keep security footage?",
        a: "As long as the stated purpose requires and no longer. Thirty days is a common commercial default; longer periods need a documented reason such as an insurance, franchise or regulatory requirement.",
      },
      {
        q: "Can employees ask to see footage of themselves?",
        a: "In many cases yes. Under Canadian privacy law individuals can generally request their own personal information, including video, subject to exceptions and to protecting other people who appear in it.",
      },
    ],
    related: ["how-many-security-cameras-does-my-business-need", "security-system-cyber-hardening", "commercial-security-system-cost-canada"],
  },
  {
    slug: "reduce-false-alarms-commercial",
    title: "How to reduce false alarms at a commercial site",
    metaTitle: "How to Reduce Commercial False Alarms",
    question: "How do we stop false alarms at our business?",
    answer:
      "Most commercial false alarms come from four causes: user error while arming or disarming, doors and sensors that are out of adjustment, environmental movement inside the detection area, and stale user lists. Fix them with verified alarm signals, correct detector selection and placement, scheduled maintenance, and access-driven arming — in that order. Verification matters most, because several Canadian municipalities charge for repeated police dispatches to unverified alarms.",
    description:
      "The four real causes of commercial false alarms and the fixes that work: verification, detector placement, maintenance and access-driven arming.",
    category: "Operations",
    readMinutes: 4,
    sections: [
      {
        heading: "Verify before anyone is dispatched",
        body: [
          "Video verification or an audio/operator check turns a sensor trip into a described event. Responders prioritise verified alarms, and your site stops accumulating chargeable false dispatches.",
        ],
      },
      {
        heading: "Fix the physical causes",
        body: ["Nuisance trips are usually mechanical or environmental, not electronic."],
        list: [
          "Doors that no longer close squarely, and contacts drifting out of gap tolerance.",
          "Motion detectors aimed at heaters, vents, hanging signage, or glass with moving headlights beyond it.",
          "Dust, insects and cobwebs inside detectors — a maintenance issue, not a fault.",
          "Stock, seasonal displays or racking moved into a detection zone after installation.",
        ],
      },
      {
        heading: "Fix the human causes",
        body: [
          "Keep the user list current — deactivate codes the day someone leaves. Give every user their own code so events are attributable. Post a simple arming procedure at the panel, and set schedules so an early arrival does not trip the system.",
          "Access-driven arming removes most of this: the system disarms on a valid credential at the first door and arms on last-out.",
        ],
      },
      {
        heading: "Maintain on a schedule",
        body: [
          "Test the system on a defined cycle, replace batteries before they fail, confirm communication paths (IP and cellular) actually report, and re-walk-test detectors after any renovation, racking change or tenant change.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do municipalities charge for false alarms in Canada?",
        a: "Many do. Policies vary by municipality — some charge after a set number of false dispatches per year, and some require verification before police will attend at all. Check your local police service's alarm bylaw.",
      },
      {
        q: "What is a verified alarm?",
        a: "An alarm confirmed by a second source — video, audio, an operator's observation, or two independent sensor activations — before responders are dispatched.",
      },
      {
        q: "How often should a commercial alarm be tested?",
        a: "At least annually as a full documented test, plus a quick monthly communication test and a re-test after any change to the building layout, network or tenants.",
      },
    ],
    related: ["remote-guarding-vs-security-guards", "integrating-access-control-and-cctv", "commercial-vs-residential-security-systems"],
  },
  {
    slug: "commercial-vs-residential-security-systems",
    title: "Commercial vs residential security systems: the real differences",
    metaTitle: "Commercial vs Residential Security Systems",
    question: "How is a commercial security system different from a home system?",
    answer:
      "A commercial system is built for many users, longer retention, higher uptime and an audit trail; a home system is built for a couple of users and a short look-back window. The hardware can look similar, but commercial design assumes staff turnover, insurance and privacy obligations, multi-site management, and the expectation that footage and access logs will be used as evidence.",
    description:
      "Users, retention, uptime, compliance and support: why business security systems are designed differently from residential alarm packages.",
    category: "Cost & planning",
    readMinutes: 4,
    sections: [
      {
        heading: "Five structural differences",
        body: [],
        list: [
          "Users: homes have two or three; a business needs per-person credentials, roles and revocation.",
          "Retention: homes keep days of video; businesses commonly keep 30 days or more for insurance and liability.",
          "Uptime: a business needs redundancy, offline alerts and a service agreement — a camera down for a week is a coverage gap.",
          "Compliance: notice, retention policy, employee monitoring rules and audit trails apply to businesses, not households.",
          "Integration: commercial sites tie cameras, doors, alarm and sometimes HVAC and lighting into one program.",
        ],
      },
      {
        heading: "Why consumer kits struggle in a business",
        body: [
          "Consumer platforms limit user counts and roles, throttle storage, rely on Wi-Fi and a single cloud account, and rarely produce exportable, time-stamped evidence. They are also hard to hand over when the person who set them up leaves.",
        ],
      },
      {
        heading: "What to insist on for a commercial site",
        body: [
          "Wired PoE cameras where possible, a segmented network, per-user credentials with an audit trail, documented retention, monitored intrusion detection, and a maintenance agreement with a defined response time.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I use a consumer camera system for a small shop?",
        a: "It may cover the basics, but expect limits on users, retention and evidence export, and no service agreement when it fails. Most shops that start there migrate once they need footage for an insurance or police matter.",
      },
      {
        q: "Is a commercial system much more expensive?",
        a: "Per camera it can be comparable; the difference is in cabling, storage, licensing and service. You are largely paying for reliability, retention and accountability rather than for the camera itself.",
      },
    ],
    related: ["commercial-security-system-cost-canada", "how-many-security-cameras-does-my-business-need", "choosing-a-commercial-access-control-system"],
  },
  {
    slug: "security-system-cyber-hardening",
    title: "Cyber hardening a security system: cameras, doors and networks",
    metaTitle: "Cyber Hardening Security Cameras & Doors",
    question: "How do we keep our security cameras and access control from being hacked?",
    answer:
      "Treat cameras and door controllers as computers on your network, because that is what they are. The essentials: change every default password, put security devices on their own VLAN with no direct internet exposure, keep firmware current, use encrypted protocols (HTTPS, OSDP, TLS), and remove accounts when people leave. Most real-world incidents involve default credentials or an unpatched device reachable from the internet — not a sophisticated attack.",
    description:
      "Default passwords, network segmentation, firmware and supply-chain checks: a practical hardening checklist for commercial security devices.",
    category: "Compliance",
    readMinutes: 5,
    sections: [
      {
        heading: "The hardening checklist",
        body: [],
        list: [
          "Unique strong passwords on every device; no shared installer account left in place after handover.",
          "A dedicated VLAN for cameras, recorders and controllers, with firewall rules to the rest of the network.",
          "No port forwarding to a recorder — use the platform's cloud relay or a VPN for remote access.",
          "Firmware updates on a schedule, with a record of versions in service.",
          "HTTPS for management, TLS for cloud traffic, OSDP instead of Wiegand at readers.",
          "Multi-factor authentication on the video and access management consoles.",
          "Named user accounts with roles, removed on the day someone leaves.",
          "Logging and alerting on failed logins, configuration changes and devices going offline.",
        ],
      },
      {
        heading: "Supply chain matters too",
        body: [
          "Check where the hardware and its firmware come from, and whether the manufacturer publishes vulnerability advisories and a support lifecycle. Devices banned or restricted in other jurisdictions, or long past end-of-support, are a risk you inherit for the life of the system.",
        ],
      },
      {
        heading: "Physical and cyber are one program",
        body: [
          "An attacker who reaches the video network can watch you; one who reaches the access platform can open doors. Conversely, physical access to a switch or recorder bypasses much of the network security. Lock the equipment room, and treat the two disciplines as one risk register.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should security cameras be on the same network as our business systems?",
        a: "No. Put them on a separate VLAN or physical network with controlled routing. It limits the blast radius in both directions and usually improves video performance as well.",
      },
      {
        q: "How often should camera firmware be updated?",
        a: "On a scheduled cycle — quarterly is a common commercial rhythm — plus immediately for advisories that address a remotely exploitable vulnerability.",
      },
      {
        q: "Who is responsible for hardening: the integrator or the IT team?",
        a: "Both, with the split agreed in writing at handover. The integrator hardens the devices and documents them; IT owns the network, accounts and ongoing patching unless a managed service covers it.",
      },
    ],
    related: ["integrating-access-control-and-cctv", "cctv-privacy-rules-canada", "choosing-a-commercial-access-control-system"],
  },
];

export const GUIDE_BY_SLUG: Record<string, Guide> = Object.fromEntries(
  GUIDES.map((g) => [g.slug, g]),
);

export const GUIDE_CATEGORIES = [
  "Cost & planning",
  "Technology",
  "Compliance",
  "Operations",
] as const;
