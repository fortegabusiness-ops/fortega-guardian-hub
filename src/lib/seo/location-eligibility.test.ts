import { describe, expect, test } from "bun:test";
import { CITIES, CITY_BY_SLUG } from "./cities";
import { isLocationGone } from "./location-eligibility";
import { SERVICE_AREA_COMBOS } from "./service-areas";
import { SERVICE_SLUGS } from "./services";

describe("reviewed city-only pilot", () => {
  for (const slug of ["dawson", "chetwynd", "happy-valley-goose-bay"]) {
    test(`${slug} has one eligible city page without service combinations`, () => {
      expect(CITY_BY_SLUG[slug]?.slug).toBe(slug);
      expect(CITIES.filter((city) => city.slug === slug)).toHaveLength(1);
      expect(isLocationGone(`/locations/${slug}`)).toBe(false);
      expect(SERVICE_AREA_COMBOS.filter((area) => area.city === slug)).toHaveLength(0);
      for (const service of SERVICE_SLUGS) expect(isLocationGone(`/services/${service}/${slug}`)).toBe(true);
    });
  }
  test("other deleted communities remain gone", () => {
    expect(isLocationGone("/locations/iqaluit")).toBe(true);
    expect(isLocationGone("/services/cctv/iqaluit")).toBe(true);
    expect(isLocationGone("/fr/securite/sherbrooke")).toBe(true);
  });
  test("never-existing addresses are not treated as deletions", () => {
    expect(isLocationGone("/locations/not-a-real-city")).toBe(false);
    expect(isLocationGone("/services/not-a-real-service/dawson")).toBe(false);
  });
  test("existing core service combinations remain eligible", () => {
    expect(SERVICE_AREA_COMBOS.filter((area) => area.city === "toronto")).toHaveLength(8);
    expect(isLocationGone("/services/cctv/toronto")).toBe(false);
  });
});