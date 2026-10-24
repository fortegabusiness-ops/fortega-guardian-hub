import { test } from "node:test";
import assert from "node:assert/strict";
import { REVIEW_CITY_INVENTORY } from "./cities";
import { SERVICE_SLUGS } from "./services";
import { SERVICE_AREAS } from "./service-areas";
import { COMMUNITY_BY_SLUG, OVERVIEW_CITIES, communityServicePath, getCommunityRedirect } from "./community-addresses";
import { SITEMAP_GROUPS } from "./sitemap-inventory";
import { isLocationGone } from "./location-eligibility";

test("all 225 authorized communities have overviews and eight primary services", () => {
  assert.equal(Object.keys(COMMUNITY_BY_SLUG).length, 225);
  const paths = Object.values(SITEMAP_GROUPS).flat().map(entry => entry.path);
  for (const city of REVIEW_CITY_INVENTORY) {
    assert.ok(OVERVIEW_CITIES.some(item => item.slug === city.slug));
    assert.equal(paths.filter(path => path === `/locations/${city.slug}`).length, 1);
    assert.equal(isLocationGone(`/locations/${city.slug}`), false);
    for (const service of SERVICE_SLUGS) assert.equal(paths.filter(path => path === communityServicePath(city.slug, service)).length, 1);
  }
  assert.equal(SITEMAP_GROUPS.communities.length, 1800);
});
test("1800 old community services redirect directly to primary destinations", () => {
  for (const city of REVIEW_CITY_INVENTORY) for (const service of SERVICE_SLUGS) {
    const destination = communityServicePath(city.slug, service);
    assert.equal(getCommunityRedirect(`/location-review/${city.slug}/${service}`), destination);
    assert.equal(getCommunityRedirect(destination), undefined);
  }
  assert.equal(getCommunityRedirect("/location-review"), "/locations");
  assert.equal(getCommunityRedirect("/location-review/"), "/locations");
});
test("208 overlapping core service pages consolidate without restoring unrelated deletions", () => {
  assert.equal(SERVICE_AREAS.length, 208);
  for (const area of SERVICE_AREAS) assert.equal(getCommunityRedirect(`/services/${area.service.slug}/${area.city.slug}`), communityServicePath(area.city.slug, area.service.slug));
  assert.equal(getCommunityRedirect("/services/cctv/iqaluit"), undefined);
  assert.equal(isLocationGone("/services/cctv/iqaluit"), true);
  assert.equal(isLocationGone("/fr/securite/sherbrooke"), true);
});
test("invalid communities and services never gain redirect eligibility", () => {
  assert.equal(getCommunityRedirect("/location-review/not-a-real-city/cctv"), undefined);
  assert.equal(getCommunityRedirect("/location-review/glace-bay/not-a-service"), undefined);
  assert.equal(getCommunityRedirect("/location-review/glace-bay/cctv/extra"), undefined);
});