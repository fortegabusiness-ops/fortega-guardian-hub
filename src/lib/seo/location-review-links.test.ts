import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { REVIEW_CITY_INVENTORY } from "./cities";
import { getRelatedReviewCities, REVIEW_RESOURCE_LINKS } from "./location-review-links";
import { GUIDES } from "./resources";

describe("review internal navigation", () => {
  test("every community is reachable from a same-province peer without deleted URLs", () => {
    const incoming = new Set<string>();
    for (const city of REVIEW_CITY_INVENTORY) {
      const related = getRelatedReviewCities(city);
      assert.ok(related.length > 0, city.slug);
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