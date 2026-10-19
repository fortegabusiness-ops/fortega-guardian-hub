# Location pilot research brief

Research date: 2026-10-19. Sources support community-level planning information, not Fortega's credentials, local presence or conditions at a particular property.

## Dawson City
- Dawson's destination site describes a subarctic climate. Use this to ask about site-specific outdoor operating conditions; omit precise temperature promises and verify equipment ratings. Source: https://dawsoncity.ca/discover-dawson/weather/
- The destination site describes access via the Klondike Highway and seasonal access via the Top of the World Highway. Travel planning must use the actual route and current conditions; do not imply Dawson itself is only seasonally accessible. Source: https://dawsoncity.ca/plan-your-trip/getting-here/
- Yukon explains municipal land-use and development responsibilities. Confirm authority and permissions for the actual property and scope. Source: https://yukon.ca/sites/default/files/emr/emr-development-permit-information-sheet.pdf
- Dawson City naming reference: https://yukon.ca/sites/default/files/2025-01/2025-01-21%20-%20Local_Government_Directory.pdf

## Chetwynd
- The District's building inspector administers building-code provisions, permits and inspections. Do not claim every security installation requires a building permit. Source: https://www.gochetwynd.com/municipal-office/departments/protective-services/building-inspection/
- The District explains property zoning and official community plan designations. Relevant to new construction or changed use, not a generic camera replacement. Source: https://www.gochetwynd.com/municipal-office/departments/planning-and-development/ocp-zoning/
- Planning and development reference: https://www.gochetwynd.com/municipal-office/departments/planning-and-development/
- No current historical Chetwynd record was found in the site's retained city inventory. Proposed `/locations/chetwynd` would be new unless an earlier address is established.

## Happy Valley-Goose Bay
- The provincial registry provides the community's municipal plan, development regulations and amendments. Verify the current parcel and scope with the Town. Source: https://www.gov.nl.ca/mca/registry/community/happy-valley-goose-bay/
- The Town's permit application distinguishes construction, renovation and changed-use work. Do not infer an approval or universal permit requirement. Source: https://townhvgb.com/wp-content/uploads/2026/03/Build-Permit-Application.pdf
- The Town publishes winter parking and snow-clearing restrictions. Site staging must follow applicable current rules; do not turn this into a claim about all properties. Source: https://townhvgb.com/reminder-about-traffic-regulations-snow-clearing-policies/
- Municipal naming reference: https://townhvgb.com/town-hall/about-us/

## Provincial and privacy references
These belong in a scoped guidance section or provincial page, not a blanket statement that Fortega is licensed for every activity.
- Yukon security licensing: https://yukon.ca/en/doing-business/professional-licensing/apply-security-licence
- British Columbia security worker licensing: https://www2.gov.bc.ca/gov/content/employment-business/business/security-services/security-industry-licensing/workers
- Newfoundland and Labrador security licensing: https://www.gov.nl.ca/gs/security/
- Federal business video-surveillance privacy guidance: https://www.priv.gc.ca/en/privacy-topics/surveillance/video-surveillance-by-businesses/

## Checks and limits
- Preview status checks: `/locations/dawson` 410; `/locations/happy-valley-goose-bay` 410; `/locations/chetwynd` 404; `/services/cctv/dawson` 410; `/locations/toronto` 200.
- The middleware in `src/start.ts`, not the city loader, supplies the 410 responses.
- Actual core list contains 26 cities; earlier conversation counts should not replace the source inventory.
- Historical lead attribution for these three towns is unverified; Google Analytics reports remain unavailable without access or an export.
- No public route, metadata, sitemap, email or delivery setting changed during this draft stage.