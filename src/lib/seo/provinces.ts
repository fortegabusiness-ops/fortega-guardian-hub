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
  lethbridge: "A southern Alberta agricultural processing and university city, where food-plant compliance, campus access and dispersed rural operations shape most security programs.",
  "medicine-hat": "A southeastern Alberta centre for natural gas, petrochemicals and greenhouse agriculture, with spread-out industrial sites that suit verified remote monitoring.",
  "red-deer": "A central Alberta hub between Calgary and Edmonton serving oilfield services, manufacturing and regional retail, often with multi-yard coverage requirements.",
  "saint-albert": "A commercial and residential centre on Edmonton's northwest edge, with professional offices, retail and civic facilities rather than heavy industry.",
  kamloops: "An interior British Columbia transport and resource hub where rail, distribution yards and wide-area sites benefit from remote verification over long response distances.",
  "prince-george": "Northern BC's forestry, rail and distribution centre, with large industrial yards and long travel distances that make verified alarm response and remote patrols practical.",
  nanaimo: "A Vancouver Island commercial and ferry-port centre serving retail, marine and institutional sites across the mid-island.",
  "north-vancouver": "A North Shore mix of port and industrial waterfront, film production facilities and commercial districts backing onto steep terrain.",
  "west-vancouver": "A North Shore community of retail, professional offices and high-value residential property where discreet system design matters.",
  "new-westminster": "A Fraser River city with heritage commercial blocks, riverfront industrial land and institutional facilities in a compact footprint.",
  langley: "A Fraser Valley centre combining agriculture, light manufacturing and fast-growing commercial corridors with dispersed sites.",
  delta: "A Fraser Valley municipality with port-adjacent logistics at Deltaport, greenhouse agriculture and industrial parks needing yard and dock coverage.",
  chilliwack: "A Fraser Valley agricultural and light-industrial centre, with farm operations, processing facilities and dispersed rural properties.",
  vernon: "A north Okanagan commercial and agricultural centre serving retail, orchards and tourism operators across a dispersed valley.",
  penticton: "A south Okanagan tourism, wine and retail centre with seasonal occupancy swings that affect alarm and monitoring design.",
  "campbell-river": "A Vancouver Island resource and aquaculture centre with marine, forestry and remote-site operations.",
  cranbrook: "An East Kootenay transport and regional-services centre serving mining, retail and healthcare facilities across a wide area.",
  trail: "A West Kootenay industrial town anchored by large-scale metals processing, with controlled industrial perimeters.",
  "fort-saint-john": "A northeastern BC oil, gas and agriculture centre where remote wellsite and yard coverage is a routine requirement.",
  "dawson-creek": "A Peace region agricultural and energy-services hub at the start of the Alaska Highway, with dispersed yards and equipment storage.",
  kitimat: "A northern BC industrial port town anchored by large-scale processing and LNG-related construction, with controlled site access and contractor screening needs.",
  revelstoke: "A mountain transport and tourism town on the Trans-Canada corridor, with seasonal resort operations and rail activity.",
  brandon: "Manitoba's second city, an agricultural processing and regional-services centre serving food plants, retail and healthcare facilities.",
  thompson: "A northern Manitoba mining and regional-services centre where long distances and harsh winters make verified remote monitoring particularly useful.",
  "flin-flon": "A northern Manitoba mining town with remote industrial operations and limited on-site staffing after hours.",
  churchill: "A remote northern port and tourism community on Hudson Bay, accessible only by rail and air, where equipment reliability and remote support are decisive.",
  "saint-john": "New Brunswick's port and refining city, with heavy industry, marine terminals and a compact commercial core.",
  miramichi: "A northeastern New Brunswick forestry and regional-services centre spread across a wide river-valley footprint.",
  bathurst: "A northern New Brunswick mining, forestry and regional-retail centre serving a dispersed catchment area.",
  "grand-falls-windsor": "A central Newfoundland regional-services and forestry town serving healthcare, retail and municipal facilities.",
  "labrador-city": "A western Labrador iron-ore mining town where remote operations, contractor access and extreme winter conditions shape system design.",
  "happy-valley-goose-bay": "A central Labrador air-transport and services hub supporting military, aviation and regional facilities.",
  "channel-port-aux-basques": "A southwestern Newfoundland ferry terminal town where marine traffic and transport facilities dominate commercial activity.",
  "hay-river": "A Northwest Territories transport hub on Great Slave Lake, moving freight by barge, rail and road to northern communities.",
  inuvik: "A western Arctic administrative and services centre at the end of the Dempster Highway, where equipment must tolerate extreme cold and support is remote.",
  "fort-smith": "A Northwest Territories administrative and education centre on the Alberta border with government and institutional facilities.",
  "glace-bay": "A Cape Breton community with commercial main-street property and municipal facilities in a post-coal-industry economy.",
  yarmouth: "A southwestern Nova Scotia fishing, ferry and regional-retail town with marine-facing operations.",
  lunenburg: "A UNESCO-listed Nova Scotia heritage port with tourism, marine trades and heritage buildings that constrain cabling and mounting.",
  "port-hawkesbury": "A Strait of Canso industrial and port town with large-scale processing and marine terminals.",
  pictou: "A northern Nova Scotia harbour town with marine, manufacturing and tourism operations.",
  kitchener: "A core Waterloo Region city with technology offices, advanced manufacturing and dense downtown commercial property.",
  waterloo: "A technology and university city where campus-scale access control, research-facility protection and IT-integrated systems are standard expectations.",
  cambridge: "A Waterloo Region manufacturing and logistics centre along the 401 corridor, with large plants and dock-door operations.",
  burlington: "A Halton commercial and light-industrial city between Hamilton and the GTA, with business parks and multi-tenant offices.",
  oakville: "A Halton centre for corporate offices, automotive manufacturing and upscale retail along the Lake Ontario corridor.",
  oshawa: "A Durham automotive manufacturing and education city with large plant footprints and a growing institutional presence.",
  brantford: "A southwestern Ontario manufacturing and distribution city with industrial parks and a redeveloping downtown core.",
  "saint-catharines": "A Niagara manufacturing, healthcare and education centre serving the region's largest urban population.",
  "niagara-falls": "A high-volume tourism and hospitality market with hotels, attractions and border-adjacent commercial property, where seasonal peaks drive staffing and coverage.",
  welland: "A Niagara canal-corridor manufacturing town with industrial properties and municipal facilities.",
  peterborough: "A central Ontario manufacturing, healthcare and education centre serving a wide rural catchment.",
  belleville: "An eastern Ontario manufacturing and distribution city on the 401 corridor, with food processing and logistics operations.",
  "kawartha-lakes": "A large, largely rural eastern Ontario municipality where dispersed sites and long travel distances favour remote verification.",
  cornwall: "An eastern Ontario logistics and distribution centre near the Quebec and New York borders, with large warehouse footprints.",
  brockville: "An eastern Ontario manufacturing and riverfront commercial town along the 401.",
  "north-bay": "A northeastern Ontario transport, aviation and regional-services hub serving a wide northern catchment.",
  timmins: "A northeastern Ontario gold-mining and services centre with remote industrial sites and long response distances.",
  "sault-sainte-marie": "A northern Ontario steel, port and border city with heavy industrial operations and cross-border logistics.",
  kenora: "A northwestern Ontario tourism, forestry and regional-retail centre on Lake of the Woods, with strong seasonal swings and dispersed waterfront property.",
  "kirkland-lake": "A northeastern Ontario mining town with active operations, remote sites and limited after-hours staffing.",
  stratford: "A southwestern Ontario theatre, tourism and manufacturing town with heritage commercial buildings and seasonal visitor peaks.",
  woodstock: "A southwestern Ontario automotive manufacturing and distribution centre on the 401 corridor.",
  "sarnia-clearwater": "A southwestern Ontario petrochemical and refining centre where industrial perimeters, contractor access and process-area restrictions dominate.",
  orillia: "A central Ontario tourism, retail and institutional centre serving the Lake Simcoe region.",
  midland: "A Georgian Bay tourism, marine and light-industrial town with seasonal occupancy changes.",
  "chatham-kent": "A large southwestern Ontario agricultural and food-processing municipality covering many dispersed rural and small-town sites.",
  summerside: "Prince Edward Island's second city, with aerospace, food processing and regional-retail operations.",
  longueuil: "A South Shore Montreal city with aerospace manufacturing, transit infrastructure and dense commercial and residential property, under Quebec's Law 25 regime.",
  levis: "A South Shore city opposite Quebec City with shipbuilding, financial-services offices and suburban commercial property.",
  sherbrooke: "An Eastern Townships university, healthcare and manufacturing centre serving a wide regional catchment in Quebec.",
  "trois-rivieres": "A St. Lawrence industrial and port city in Quebec with manufacturing, port operations and institutional facilities.",
  saguenay: "A Quebec aluminium-production and forestry region with large industrial footprints spread across several boroughs.",
  "rouyn-noranda": "A northwestern Quebec mining and smelting centre with remote sites and long service distances.",
  "val-dor": "An Abitibi mining and services centre in Quebec supporting active operations and remote exploration camps.",
  rimouski: "A Lower St. Lawrence regional-services, marine-research and education centre in Quebec.",
  "sept-iles": "A North Shore Quebec iron-ore port with large marine terminals and industrial rail operations.",
  "baie-comeau": "A North Shore Quebec aluminium, forestry and hydro-adjacent industrial town.",
  granby: "An Eastern Townships manufacturing, food-processing and tourism centre in Quebec.",
  dorval: "A Montreal-area city dominated by the airport, aviation services and adjacent logistics and hotel property, with restricted-area access requirements.",
  lachine: "A Montreal borough with canal-side industrial property, manufacturing and logistics operations.",
  "cote-saint-luc": "A Montreal-area residential and community-services municipality with institutional and multi-residential buildings.",
  "moose-jaw": "A southern Saskatchewan transport, agriculture and tourism centre with rail and highway logistics activity.",
  "prince-albert": "A central Saskatchewan regional-services and forestry centre serving northern communities across long distances.",
  dawson: "A Yukon heritage tourism and placer-mining community with strong seasonal swings and remote operating conditions.",
  "watson-lake": "A southeastern Yukon highway-services and transport community along the Alaska Highway, with remote sites and limited local support.",
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

/** Largest / highest-demand city per region, used to order city link lists. */
export const MAJOR_CITY_SLUGS: string[] = [
  "toronto", "mississauga", "brampton", "hamilton", "ottawa", "london", "markham",
  "vaughan", "kitchener", "windsor", "oshawa", "barrie", "guelph", "north-york",
  "etobicoke", "scarborough", "sudbury", "kingston", "thunder-bay",
  "montreal", "quebec-city", "laval", "gatineau", "sherbrooke", "trois-rivieres",
  "vancouver", "surrey", "burnaby", "richmond", "victoria", "kelowna", "abbotsford", "kamloops", "nanaimo",
  "calgary", "edmonton", "red-deer", "lethbridge", "fort-mcmurray",
  "winnipeg", "brandon", "saskatoon", "regina", "halifax", "dartmouth", "sydney",
  "moncton", "saint-john", "fredericton", "charlottetown", "st-johns",
  "whitehorse", "yellowknife", "iqaluit",
];

const MAJOR_RANK = new Map(MAJOR_CITY_SLUGS.map((s, i) => [s, i]));

/** Cities in a province, most prominent first. */
export function rankedCities(cities: City[]): City[] {
  return [...cities].sort((a, b) => {
    const ra = MAJOR_RANK.get(a.slug) ?? 999;
    const rb = MAJOR_RANK.get(b.slug) ?? 999;
    if (ra !== rb) return ra - rb;
    const ca = CITY_CONTEXT[a.slug] ? 0 : 1;
    const cb = CITY_CONTEXT[b.slug] ? 0 : 1;
    if (ca !== cb) return ca - cb;
    return a.name.localeCompare(b.name);
  });
}
