import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { SITEMAP_CHILDREN, SITEMAP_GROUPS } from "./sitemap-inventory";
import { sitemapIndexXml, sitemapXml } from "./sitemap";
import { CITIES, REVIEW_CITY_INVENTORY } from "./cities";
import { SERVICES, SERVICE_SLUGS } from "./services";
import { SERVICE_AREAS } from "./service-areas";
import { PROVINCES } from "./provinces";
import { GUIDES } from "./resources";
import { INDUSTRIES } from "./industries";
import { FR_CITIES } from "./fr";
import { isLocationGone } from "./location-eligibility";
import { OVERVIEW_CITIES } from "./community-addresses";

describe("whole-site public discovery inventory", () => {
  const entries = Object.values(SITEMAP_GROUPS).flat();
  const paths = entries.map((entry) => entry.path);
  test("covers each public content inventory once", () => {
    const expected = ["/", "/about", "/contact", "/industries", "/privacy", "/terms", "/services", "/locations", "/resources", "/fr/securite",
      ...INDUSTRIES.map((item) => `/industries/${item.slug}`),
      ...SERVICES.map((item) => `/services/${item.slug}`),
      ...OVERVIEW_CITIES.map((item) => `/locations/${item.slug}`),
      ...PROVINCES.map((item) => `/locations/province/${item.slug}`),
      ...GUIDES.map((item) => `/resources/${item.slug}`),
      ...FR_CITIES.map((item) => `/fr/securite/${item.slug}`),
      ...REVIEW_CITY_INVENTORY.flatMap((city) => SERVICE_SLUGS.map((service) => `/locations/${city.slug}/${service}`)),
    ];
    assert.deepEqual([...paths].sort(), expected.sort());
    assert.equal(new Set(paths).size, paths.length);
  });
  test("includes all 1800 authorized community pages but excludes deleted and private addresses", () => {
    assert.equal(SITEMAP_GROUPS.communities.length, 1800);
    assert.equal(paths.includes("/locations/iqaluit/cctv"), true);
    assert.equal(paths.some((path) => path.startsWith("/api") || path.startsWith("/blog") || isLocationGone(path)), false);
    assert.equal(paths.includes("/locations/iqaluit"), true);
    assert.equal(paths.includes("/services/cctv/dawson"), false);
  });
  test("retains only page-specific recorded modification dates", async () => {
    for (const entry of entries) {
      if ("lastmod" in entry && entry.lastmod) {
        assert.fail("No current inventory supplies a page-specific recorded revision after overview replacement");
      }
    }
    const undated = await sitemapXml([{ path: "/about" }]).text();
    assert.equal(undated.includes("<lastmod>"), false);
    const dated = await sitemapXml([{ path: "/locations/dawson", lastmod: "2026-10-19" }]).text();
    assert.equal(dated.includes("<lastmod>2026-10-19</lastmod>"), true);
    assert.equal((await sitemapIndexXml(SITEMAP_CHILDREN).text()).includes("<lastmod>"), false);
  });
  test("uses the primary domain and escapes XML locations", async () => {
    assert.equal(SITEMAP_CHILDREN.length, 7);
    const xml = await sitemapXml([{ path: "/resources?first=1&second=2" }]).text();
    assert.equal(xml.includes("https://fortega.ca/resources?first=1&amp;second=2"), true);
  });
});