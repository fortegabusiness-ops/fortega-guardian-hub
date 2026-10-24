# Clean community addresses and city overview pages

## What you will get
- One overview page for each of the 225 communities at `/locations/{city}`, showing all eight services with short descriptions and links to that community’s service pages.
- The existing 1,800 community-service pages moved from `/location-review/{city}/{service}` to `/locations/{city}/{service}`. Keep their current content rather than resurrecting deleted copy.
- Update existing city overview pages in place where they overlap with the 225-community inventory; preserve other valid existing pages without creating duplicates.
- Each community name on the Locations page links to its overview. Service pages link back to their city overview, matching services and relevant Fortega pages.

## Protect existing links and search discovery
- Permanently redirect each current community-service address directly to its new address so bookmarks and shared links continue working.
- Forward the existing `/location-review` directory to `/locations`.
- Check existing service-city pages and historical addresses before migration. Keep pages with distinct purposes; where two pages answer the same city/service need, select one primary page and redirect the duplicate. Do not blanket-restore other deleted URLs.
- Update internal links, canonical addresses, share addresses, structured data, all sitemap sections, `robots.txt` references where needed and `llms.txt`. Only the final primary addresses belong in sitemaps.
- Record actual page revisions only; do not invent sitemap modification dates.

## Content safeguards
- Use current service content and attributed local facts already available. City overviews summarize services rather than duplicate eight full pages.
- Include clear assessment and call buttons, expandable non-pricing questions and answers, and page-specific titles and descriptions.
- No licensing mentions, invented local offices or coverage claims, invented customer evidence, customer disclosures or public research-source links. Remote assessments may use drawings, layouts and building types.
- Address changes do not resolve missing local evidence or guarantee indexing, rankings or AI citations. Keep unresolved factual checks private and do not treat the migration as factual approval.

## Technical implementation and checks
- Save an inspected, restorable source backup and an exact old-to-new address map before edits; state any database, storage or external-asset backup exclusions.
- Preserve TanStack routing and shared inventory patterns; ensure the city overview route renders its service-page children correctly.
- Add tests for inventory coverage, redirect destinations, duplicate resolution, invalid addresses and continued deletion of unrelated legacy URLs.
- Verify all 225 overview addresses and 1,800 service destinations, their sitemap inclusion, absence of old addresses in discovery files, and direct permanent redirects without loops or chains.
- Check desktop and phone layouts, city-to-service-to-city navigation, questions, enquiry details and shared visitor tracking.

## Approval and publication
Approving this plan explicitly authorizes reuse of matching historical city and city/service addresses for the current content and new overviews, superseding the no-restoration restriction only for this mapped inventory.

Implement and verify in preview first. Publishing and notifying search engines happen only after a separate explicit publishing instruction; search engines may take time to process the address changes.