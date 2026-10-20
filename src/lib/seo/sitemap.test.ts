import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { SITEMAP_CHILDREN, SITEMAP_GROUPS } from "./sitemap-inventory";
import { sitemapIndexXml, sitemapXml } from "./sitemap";
import { CITIES } from "./cities";
import { SERVICES } from "./services";
import { SERVICE_AREAS } from "./service-areas";
import { PROVINCES } from "./provinces";
import { GUIDES } from "./resources";
import { INDUSTRIES } from "./industries";
import { FR_CITIES } from "./fr";
import { isLocationGone } from "./location-eligibility";
import { getLocationPilot } from "./location-pilots";

describe("whole-site public discovery inventory", () => {
  const entries = Object.values(SITEMAP_GROUPS).flat();
  const paths = entries.map((entry) => entry.path);
  test("covers each public content inventory once", () => {
    const expected = ["/", "/about", "/contact", "/industries", "/privacy", "/terms", "/services", "/locations", "/resources", "/fr/securite",
      ...INDUSTRIES.map((item) => `/industries/${item.slug}`),
      ...SERVICES.map((item) => `/services/${item.slug}`),
      ...CITIES.map((item) => `/locations/${item.slug}`),
      ...PROVINCES.map((item) => `/locations/province/${item.slug}`),
      ...SERVICE_AREAS.map((item) => `/services/${item.service.slug}/${item.city.slug}`),
      ...GUIDES.map((item) => `/resources/${item.slug}`),
      ...FR_CITIES.map((item) => `/fr/securite/${item.slug}`),
    ];
    assert.deepEqual([...paths].sort(), expected.sort());
    assert.equal(new Set(paths).size, paths.length);
  });
  test("excludes all review, deleted and private addresses", () => {
    assert.equal(paths.some((path) => path.startsWith("/location-review") || path.startsWith("/api") || path.startsWith("/blog") || isLocationGone(path)), false);
    assert.equal(paths.includes("/locations/iqaluit"), false);
    assert.equal(paths.includes("/services/cctv/dawson"), false);
  });
  test("retains only page-specific recorded modification dates", async () => {
    for (const entry of entries) {
      if ("lastmod" in entry && entry.lastmod) {
        assert.equal(entry.lastmod, getLocationPilot(entry.path.split("/").at(-1) ?? "")?.updated);
      }
    }
    const undated = await sitemapXml([{ path: "/about" }]).text();
    assert.equal(undated.includes("<lastmod>"), false);
    const dated = await sitemapXml([{ path: "/locations/dawson", lastmod: "2026-10-19" }]).text();
    assert.equal(dated.includes("<lastmod>2026-10-19</lastmod>"), true);
    assert.equal((await sitemapIndexXml(SITEMAP_CHILDREN).text()).includes("<lastmod>"), false);
  });
  test("uses the primary domain and escapes XML locations", async () => {
    assert.equal(SITEMAP_CHILDREN.length, 6);
    const xml = await sitemapXml([{ path: "/resources?first=1&second=2" }]).text();
    assert.equal(xml.includes("https://fortega.ca/resources?first=1&amp;second=2"), true);
  });
});