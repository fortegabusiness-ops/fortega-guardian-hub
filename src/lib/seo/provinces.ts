import { CITIES, CITIES_BY_PROVINCE, type City } from "./cities";

export type Province = {
  /** URL slug used at /locations/province/{slug} */
  slug: string;
  /** Full province or territory name, matching City.province */
  name: string;
  /** Two-letter postal abbreviation */
  abbr: string;
  /** Who licenses private security work in this jurisdiction */
  regulator: string;
  /** One sentence on the licensing regime Fortega works under */
  licensing: string;
  /** Which privacy law governs commercial video/access data here */
  privacy: string;
  /** Economic and operating context that shapes security requirements */
  economy: string;
  /** Environmental factors that affect equipment selection */
  environment: string;
  /** Typical sectors Fortega secures in this jurisdiction */
  sectors: string[];
};

export const PROVINCES: Province[] = [
  {
    slug: "alberta",
    name: "Alberta",
    abbr: "AB",
    regulator: "Alberta Justice (Security Services and Investigators Act)",
    licensing:
      "Security guard and alarm work in Alberta is licensed under the Security Services and Investigators Act, and Fortega's guard and patrol personnel operate under that framework.",
    privacy:
      "Commercial video and access-control records in Alberta fall under the provincial Personal Information Protection Act (PIPA), which sets its own notice and retention expectations rather than PIPEDA.",
    economy:
      "Alberta sites skew toward energy, logistics, agri-food processing and large-format retail, where perimeter coverage, remote yards and lone-worker safety drive the design.",
    environment:
      "Prairie temperature swings and winter extremes mean outdoor cameras, readers and enclosures are specified for cold-weather performance and condensation control.",
    sectors: ["Energy and utilities", "Logistics and warehousing", "Agri-food processing", "Retail", "Commercial real estate"],
  },
  {
    slug: "british-columbia",
    name: "British Columbia",
    abbr: "BC",
    regulator: "BC Ministry of Public Safety (Security Services Act)",
    licensing:
      "British Columbia licenses security consultants, guards and alarm installers under the Security Services Act, and Fortega works within those licence classes on BC projects.",
    privacy:
      "BC has its own Personal Information Protection Act (PIPA), so surveillance notice, access requests and retention rules are governed provincially rather than by PIPEDA.",
    economy:
      "Port logistics, forestry, technology campuses, hospitality and dense multi-residential towers shape most BC security programs.",
    environment:
      "Coastal humidity, heavy rainfall and salt air make weather-sealed housings, corrosion-resistant hardware and drainage-aware mounting essential.",
    sectors: ["Ports and logistics", "Technology and office", "Hospitality", "Multi-family residential", "Natural resources"],
  },
  {
    slug: "manitoba",
    name: "Manitoba",
    abbr: "MB",
    regulator: "Manitoba Justice (Private Investigators and Security Guards Act)",
    licensing:
      "Manitoba regulates guard and investigative services under the Private Investigators and Security Guards Act, and Fortega's field personnel are licensed accordingly.",
    privacy:
      "Commercial surveillance in Manitoba is governed federally by PIPEDA, so notice, purpose limitation and reasonable retention apply to every camera and access log.",
    economy:
      "Distribution, manufacturing, agriculture and a concentrated Winnipeg commercial core drive most Manitoba deployments.",
    environment:
      "Extreme winter cold and long unattended periods on rural sites favour cellular-backed alarm paths and heated outdoor enclosures.",
    sectors: ["Distribution", "Manufacturing", "Agriculture", "Commercial real estate", "Government"],
  },
  {
    slug: "new-brunswick",
    name: "New Brunswick",
    abbr: "NB",
    regulator: "New Brunswick Department of Justice and Public Safety",
    licensing:
      "New Brunswick licenses private security services provincially, and Fortega's guard and technical teams operate under those requirements.",
    privacy:
      "Private-sector video and access data in New Brunswick is governed by PIPEDA, requiring documented purpose, signage and defensible retention limits.",
    economy:
      "Forestry, food processing, energy infrastructure and cross-border trade corridors define most New Brunswick site requirements.",
    environment:
      "Atlantic storm exposure and freeze-thaw cycling call for hardened mounts, surge protection and backup power on critical devices.",
    sectors: ["Forestry and processing", "Energy infrastructure", "Retail", "Healthcare", "Education"],
  },
  {
    slug: "newfoundland-and-labrador",
    name: "Newfoundland and Labrador",
    abbr: "NL",
    regulator: "Newfoundland and Labrador Department of Justice and Public Safety",
    licensing:
      "Private security work in Newfoundland and Labrador is licensed provincially, and Fortega deploys licensed personnel and certified technicians on every engagement.",
    privacy:
      "PIPEDA governs commercial surveillance and access records here, so retention windows and disclosure handling need to be documented before go-live.",
    economy:
      "Offshore energy support, fisheries and processing, aviation and remote community infrastructure shape the risk picture.",
    environment:
      "High winds, salt spray and heavy icing mean marine-grade housings, reinforced mounting and remote diagnostics are standard rather than optional.",
    sectors: ["Offshore and energy support", "Fisheries and processing", "Aviation", "Municipal", "Retail"],
  },
  {
    slug: "northwest-territories",
    name: "Northwest Territories",
    abbr: "NT",
    regulator: "Northwest Territories Department of Justice",
    licensing:
      "Security services in the Northwest Territories are licensed territorially, and Fortega coordinates licensed personnel and certified installers for northern deployments.",
    privacy:
      "PIPEDA applies to commercial surveillance in the territory, alongside any contractual obligations imposed by government or Indigenous partners.",
    economy:
      "Mining, government facilities, transport hubs and community infrastructure account for most security programs across the territory.",
    environment:
      "Extreme cold, limited daylight and long service intervals push designs toward low-maintenance hardware, IR illumination and remote health monitoring.",
    sectors: ["Mining and resources", "Government", "Transport and logistics", "Community infrastructure"],
  },
  {
    slug: "nova-scotia",
    name: "Nova Scotia",
    abbr: "NS",
    regulator: "Nova Scotia Department of Justice (Private Investigators and Private Guards Act)",
    licensing:
      "Nova Scotia licenses guards and private security providers under the Private Investigators and Private Guards Act, which governs Fortega's on-site personnel.",
    privacy:
      "Commercial video and access logs in Nova Scotia fall under PIPEDA, requiring clear signage, defined purpose and a documented retention policy.",
    economy:
      "Port operations, defence and marine supply chains, healthcare, universities and a growing Halifax commercial core drive demand.",
    environment:
      "Coastal salt air, hurricane-season wind loading and driving rain make sealed enclosures, surge protection and UPS backup a baseline requirement.",
    sectors: ["Ports and marine", "Healthcare", "Education", "Commercial real estate", "Retail"],
  },
  {
    slug: "nunavut",
    name: "Nunavut",
    abbr: "NU",
    regulator: "Government of Nunavut Department of Justice",
    licensing:
      "Security work in Nunavut is arranged under territorial requirements, with Fortega mobilising licensed personnel and certified technicians for scheduled deployments.",
    privacy:
      "PIPEDA governs commercial surveillance data, alongside government and Inuit organisation contract terms that often add their own handling rules.",
    economy:
      "Government facilities, mining operations, air transport and community infrastructure make up the bulk of security requirements.",
    environment:
      "Air-only access, extreme cold and long resupply cycles mean designs favour redundant hardware, on-site spares and remote diagnostics over frequent site visits.",
    sectors: ["Government", "Mining and resources", "Aviation", "Community infrastructure"],
  },
  {
    slug: "ontario",
    name: "Ontario",
    abbr: "ON",
    regulator: "Ontario Ministry of the Solicitor General (PSISA)",
    licensing:
      "Ontario guards and security agencies are licensed under the Private Security and Investigative Services Act (PSISA), which governs training, conduct and uniform requirements for Fortega personnel.",
    privacy:
      "Commercial video and access-control records in Ontario are governed by PIPEDA, so purpose, signage and retention must be documented and defensible.",
    economy:
      "Ontario carries the widest mix in the country — corporate offices, distribution centres, manufacturing, healthcare networks, universities and large multi-site retail portfolios.",
    environment:
      "Freeze-thaw cycles, road salt and humid summers drive enclosure ratings, heater requirements and cable routing decisions on outdoor installs.",
    sectors: ["Commercial real estate", "Manufacturing", "Logistics and distribution", "Healthcare", "Education", "Retail"],
  },
  {
    slug: "prince-edward-island",
    name: "Prince Edward Island",
    abbr: "PE",
    regulator: "PEI Department of Justice and Public Safety",
    licensing:
      "Private security providers on Prince Edward Island are licensed provincially, and Fortega supplies licensed guards and certified technical staff for Island work.",
    privacy:
      "PIPEDA governs commercial surveillance and access data on PEI, including notice obligations and retention limits.",
    economy:
      "Agri-food processing, tourism and hospitality, bioscience and municipal facilities account for most Island deployments.",
    environment:
      "Maritime wind, salt exposure and seasonal occupancy swings favour weather-rated hardware and remote monitoring during off-season closures.",
    sectors: ["Agri-food", "Tourism and hospitality", "Bioscience", "Municipal", "Retail"],
  },
  {
    slug: "quebec",
    name: "Quebec",
    abbr: "QC",
    regulator: "Bureau de la sécurité privée (BSP)",
    licensing:
      "Quebec private security is licensed by the Bureau de la sécurité privée, and agency plus individual guard licences are mandatory for any on-site security work.",
    privacy:
      "Quebec applies its own private-sector privacy regime, modernised by Law 25, which sets stricter consent, breach-reporting and governance duties for video and access data than PIPEDA.",
    economy:
      "Manufacturing, aerospace, logistics, institutional campuses and a dense Montreal commercial market shape most Quebec programs.",
    environment:
      "Heavy snow loading, deep winter cold and road salt influence camera placement, enclosure heating and door-hardware selection.",
    sectors: ["Manufacturing and aerospace", "Logistics", "Commercial real estate", "Education", "Healthcare"],
  },
  {
    slug: "saskatchewan",
    name: "Saskatchewan",
    abbr: "SK",
    regulator: "Saskatchewan Ministry of Justice (Private Investigators and Security Guards Act)",
    licensing:
      "Saskatchewan licenses security guards and agencies under the Private Investigators and Security Guards Act, which governs Fortega's field personnel in the province.",
    privacy:
      "Commercial surveillance data in Saskatchewan falls under PIPEDA, requiring documented purpose, signage and retention discipline.",
    economy:
      "Potash and energy operations, agriculture, grain handling and dispersed commercial sites drive requirements across the province.",
    environment:
      "Wide temperature extremes and long distances between sites favour remote monitoring, cellular alarm paths and low-maintenance hardware.",
    sectors: ["Energy and mining", "Agriculture", "Logistics", "Retail", "Municipal"],
  },
  {
    slug: "yukon",
    name: "Yukon",
    abbr: "YT",
    regulator: "Yukon Department of Community Services",
    licensing:
      "Security services in Yukon are licensed territorially, and Fortega mobilises licensed personnel and certified technicians for territorial projects.",
    privacy:
      "PIPEDA governs private-sector video and access records in Yukon, alongside any additional terms in government contracts.",
    economy:
      "Mining and exploration, tourism, government facilities and transport infrastructure make up most territorial deployments.",
    environment:
      "Extreme cold, limited winter daylight and remote access points push designs toward IR-capable cameras, redundant power and remote diagnostics.",
    sectors: ["Mining and exploration", "Government", "Tourism", "Transport"],
  },
];

export const PROVINCE_BY_NAME: Record<string, Province> = Object.fromEntries(
  PROVINCES.map((p) => [p.name, p]),
);

export const PROVINCE_BY_SLUG: Record<string, Province> = Object.fromEntries(
  PROVINCES.map((p) => [p.slug, p]),
);

/**
 * Short, factual geographic/economic context for cities where it adds genuine
 * local value. Cities without an entry fall back to province-level context.
 */
export const CITY_CONTEXT: Record<string, string> = {
  toronto: "Canada's largest commercial market, with high-rise office portfolios, transit-adjacent retail and dense multi-tenant buildings that need credential-based access and shared-space video coverage.",
  "north-york": "A major Toronto district combining office towers, plazas, healthcare facilities and high-density residential — sites that typically need after-hours monitoring and multi-tenant access management.",
  etobicoke: "A west-Toronto district with a strong industrial and warehousing base alongside residential and retail corridors, where yard coverage and loading-dock control matter most.",
  scarborough: "An east-Toronto district mixing industrial parks, retail plazas and large residential communities, where perimeter video and after-hours alarm response are common priorities.",
  mississauga: "Home to one of Canada's densest concentrations of warehousing, distribution and corporate head offices near Pearson, driving demand for dock-door video and multi-site access control.",
  brampton: "A high-volume logistics and manufacturing hub in the western GTA, where trailer yards, dock doors and shift-change access control drive most security requirements.",
  ottawa: "The federal capital, with government-adjacent offices, technology campuses and institutional facilities that carry heightened vetting and documentation expectations.",
  hamilton: "A steel, manufacturing and port city with large industrial footprints and a growing commercial core, where perimeter protection and scrap-theft deterrence are recurring themes.",
  guelph: "A southwestern Ontario manufacturing and research centre with a large university presence, where campus-style access control and after-hours monitoring are common.",
  chatham: "A southwestern Ontario agricultural and automotive-supply centre, where equipment theft, dispersed rural sites and seasonal operations shape the security design.",
  barrie: "A central Ontario commercial hub serving the Simcoe region, with retail, light industrial and healthcare sites that often need remote monitoring across dispersed locations.",
  sudbury: "A northern Ontario mining and services centre, where remote sites, heavy equipment and long response distances make verified alarm monitoring especially valuable.",
  "thunder-bay": "A northwestern Ontario transport and resource hub with port, rail and industrial operations across a wide geographic area.",
  windsor: "A border city with automotive manufacturing and cross-border logistics, where trailer yards and cargo-handling areas need continuous coverage.",
  london: "A southwestern Ontario centre for healthcare, education and manufacturing, with large institutional campuses and multi-building access requirements.",
  kingston: "An eastern Ontario city with institutional, correctional-adjacent and university facilities where documented access control and audit trails are expected.",
  montreal: "Quebec's largest commercial market, with aerospace and manufacturing plants, logistics corridors and dense office and institutional real estate — all under Quebec's Law 25 privacy regime.",
  "quebec-city": "The provincial capital, with government, tourism and institutional facilities where French-language signage and Law 25 compliance are part of every deployment.",
  laval: "A large Montreal-area city combining industrial parks, retail centres and institutional campuses across a wide suburban footprint.",
  gatineau: "Sits opposite Ottawa, serving government-adjacent offices and commercial operations under Quebec's provincial privacy and licensing regime.",
  vancouver: "A Pacific port and technology centre with dense office towers, multi-residential developments and marine logistics, all under BC's own PIPA privacy law.",
  surrey: "One of BC's fastest-growing cities, with industrial parks, commercial corridors and large residential developments requiring scalable multi-site coverage.",
  burnaby: "A Metro Vancouver centre for technology, film production and light industry, where IP infrastructure and asset protection dominate the requirements.",
  victoria: "BC's capital, combining government facilities, tourism operations and marine-adjacent sites exposed to coastal weather.",
  "prince-rupert": "A north-coast BC port handling container and bulk cargo, where terminal perimeters, marine weather and remote operations drive the design.",
  kelowna: "An Okanagan commercial centre serving agriculture, tourism and a growing technology sector across dispersed sites.",
  calgary: "A corporate and energy centre with head-office towers, industrial parks and large logistics facilities under Alberta's PIPA privacy regime.",
  edmonton: "A northern Alberta industrial and government hub, with heavy-industry laydown yards, warehousing and institutional campuses.",
  "fort-mcmurray": "Serves Alberta's oil sands region, where remote camp facilities, laydown yards and long response distances make verified remote monitoring essential.",
  brooks: "A southern Alberta agri-food centre known for large-scale meat processing, where shift-based access control and cold-environment hardware matter.",
  "grande-prairie": "A northwestern Alberta energy and agriculture hub servicing widely dispersed sites and equipment yards.",
  banff: "A mountain tourism centre with hospitality properties and seasonal occupancy swings that make off-season monitoring a priority.",
  jasper: "A mountain-park community where hospitality and municipal facilities face seasonal staffing and remote-response constraints.",
  winnipeg: "Manitoba's commercial core and a national distribution crossroads, with rail, warehousing and multi-tenant office portfolios.",
  regina: "Saskatchewan's capital, with government facilities, agricultural services and commercial operations spread across a wide service area.",
  saskatoon: "A Saskatchewan centre for potash services, agriculture research and healthcare, with campus-style access requirements.",
  estevan: "A southeast Saskatchewan energy centre serving oil, coal and power-generation operations, where remote sites and equipment yards are the main exposure.",
  halifax: "Atlantic Canada's largest city and a major port and defence centre, with marine terminals, healthcare networks and universities exposed to coastal weather.",
  dartmouth: "Part of the Halifax region, with industrial parks, marine-adjacent operations and commercial facilities across the harbour.",
  sydney: "A Cape Breton commercial and port centre serving healthcare, education and municipal facilities in the region.",
  moncton: "A New Brunswick transport and distribution hub at the centre of the Maritime trade corridor, with warehousing and retail portfolios.",
  saintjohn: "A New Brunswick port and energy-refining city where industrial perimeters and marine terminal access dominate requirements.",
  fredericton: "New Brunswick's capital, with government, university and healthcare facilities requiring auditable access control.",
  "st-johns": "Newfoundland's capital and offshore-energy support base, with harbour operations, institutional facilities and severe coastal weather exposure.",
  gander: "A central Newfoundland aviation and transport hub, where airport-adjacent facilities and remote regional sites drive monitoring requirements.",
  "corner-brook": "A western Newfoundland centre for forestry, healthcare and education, servicing a wide surrounding region.",
  charlottetown: "PEI's capital, with tourism, government and agri-food facilities and pronounced seasonal occupancy swings.",
  cavendish: "A PEI tourism destination where seasonal properties sit largely unoccupied off-season, making remote monitoring and verified alarm response the priority.",
  iqaluit: "Nunavut's capital, accessible primarily by air, where equipment reliability, on-site spares and remote diagnostics matter more than rapid technician dispatch.",
  yellowknife: "The Northwest Territories capital, serving government, mining support and transport operations under extreme cold conditions.",
  whitehorse: "Yukon's capital and service centre for mining, tourism and government facilities across the territory.",
  dalhousie: "A northern New Brunswick community on the Chaleur coast, where industrial, municipal and retail sites face Atlantic weather exposure.",
};

/** Cities in the same province, excluding the given city, capped for linking. */
export function nearbyCities(city: City, limit = 8): City[] {
  const list = CITIES_BY_PROVINCE[city.province] ?? [];
  const others = list.filter((c) => c.slug !== city.slug);
  if (others.length <= limit) return others;
  // Deterministic spread: pick the city's neighbours in the alphabetical list,
  // wrapping around, so each city links to a different set.
  const idx = others.findIndex((c) => c.slug > city.slug);
  const start = idx === -1 ? 0 : idx;
  return Array.from({ length: limit }, (_, i) => others[(start + i) % others.length]!);
}

export function provinceOf(city: City): Province | undefined {
  return PROVINCE_BY_NAME[city.province];
}

export function citiesInProvince(slug: string): City[] {
  const p = PROVINCE_BY_SLUG[slug];
  if (!p) return [];
  return CITIES_BY_PROVINCE[p.name] ?? [];
}

export const TOTAL_CITIES = CITIES.length;
