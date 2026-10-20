import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { CITIES, REVIEW_CITY_INVENTORY } from "./cities";
import { getRelatedReviewCities, REVIEW_RESOURCE_LINKS, REVIEW_PROVINCE_GROUPS } from "./location-review-links";
import { GUIDES } from "./resources";

describe("review internal navigation", () => {
  test("province review listings include all 225 communities without granting public eligibility", () => {
    const listed = REVIEW_PROVINCE_GROUPS.flatMap(group => group.cities);
    assert.equal(listed.length, 225);
    assert.equal(new Set(listed.map(city => city.slug)).size, 225);
    for (const group of REVIEW_PROVINCE_GROUPS) {
      assert.ok(group.cities.every(city => city.province === group.province));
    }
    assert.ok(listed.some(city => city.slug === "brockville"));
    assert.equal(CITIES.some(city => city.slug === "brockville"), false);
  });
  test("every community is reachable from a same-province peer without deleted URLs", () => {
    const incoming = new Set<string>();
    for (const city of REVIEW_CITY_INVENTORY) {
      const related = getRelatedReviewCities(city);
      const peerCount = REVIEW_CITY_INVENTORY.filter(item => item.province === city.province).length;
      if (peerCount === 1) { assert.equal(related.length, 0); incoming.add(city.slug); }
      else assert.ok(related.length > 0, city.slug);
      assert.equal(new Set(related.map(item => item.slug)).size, related.length);
      for (const peer of related) {
        assert.equal(peer.province, city.province);
        assert.notEqual(peer.slug, city.slug);
        incoming.add(peer.slug);
      }
    }
    assert.equal(incoming.size, 225);
  });
  test("all service topics link to existing Fortega resource pages", () => {
    assert.equal(Object.keys(REVIEW_RESOURCE_LINKS).length, 8);
    for (const links of Object.values(REVIEW_RESOURCE_LINKS)) {
      assert.ok(links.length > 0);
      for (const link of links) assert.ok(GUIDES.some(guide => guide.slug === link.slug), link.slug);
    }
  });
});