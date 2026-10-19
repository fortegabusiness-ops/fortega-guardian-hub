import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { CITIES, CITY_BY_SLUG } from "./cities";
import { isLocationGone } from "./location-eligibility";
import { SERVICE_AREA_COMBOS } from "./service-areas";
import { SERVICE_SLUGS } from "./services";

describe("reviewed city-only pilot", () => {
  for (const slug of ["dawson", "chetwynd", "happy-valley-goose-bay"]) {
    test(`${slug} has one eligible city page without service combinations`, () => {
      assert.equal(CITY_BY_SLUG[slug]?.slug, slug);
      assert.equal(CITIES.filter((city) => city.slug === slug).length, 1);
      assert.equal(isLocationGone(`/locations/${slug}`), false);
      assert.equal(SERVICE_AREA_COMBOS.filter((area) => area.city === slug).length, 0);
      for (const service of SERVICE_SLUGS) assert.equal(isLocationGone(`/services/${service}/${slug}`), true);
    });
  }
  test("other deleted communities remain gone", () => {
    assert.equal(isLocationGone("/locations/iqaluit"), true);
    assert.equal(isLocationGone("/services/cctv/iqaluit"), true);
    assert.equal(isLocationGone("/fr/securite/sherbrooke"), true);
  });
  test("never-existing addresses are not treated as deletions", () => {
    assert.equal(isLocationGone("/locations/not-a-real-city"), false);
    assert.equal(isLocationGone("/services/not-a-real-service/dawson"), false);
  });
  test("existing core service combinations remain eligible", () => {
    assert.equal(SERVICE_AREA_COMBOS.filter((area) => area.city === "toronto").length, 8);
    assert.equal(isLocationGone("/services/cctv/toronto"), false);
  });
});