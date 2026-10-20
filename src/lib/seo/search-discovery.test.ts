import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SITEMAP_CHILDREN, SITEMAP_GROUPS } from "./sitemap-inventory";
import { SITEMAP_BASE_URL } from "./sitemap";

test("crawler instructions advertise the index and all seven public sitemap sections", () => {
  const robots = readFileSync("public/robots.txt", "utf8");
  const advertised = robots.split("\n").filter((line) => line.startsWith("Sitemap: ")).map((line) => line.slice(9));
  assert.deepEqual(advertised.sort(), ["/sitemap.xml", ...SITEMAP_CHILDREN.map((child) => child.path)].map((path) => SITEMAP_BASE_URL + path).sort());
  assert.equal(/^Disallow:\s*\/(?:location-review\/?)?\s*$/m.test(robots), false);
});

test("AI directory includes every authorized public address and no private addresses", () => {
  const text = readFileSync("public/llms.txt", "utf8");
  const listed = [...text.matchAll(/^- \[[^\]]+\]\((https:\/\/fortega\.ca[^)]*)\): .+$/gm)].map((match) => match[1]);
  for (const entry of Object.values(SITEMAP_GROUPS).flat()) {
    assert.ok(listed.includes(SITEMAP_BASE_URL + entry.path), entry.path);
  }
  assert.equal(listed.filter((url) => url.includes("/location-review/")).length, 1800);
  assert.equal(listed.some((url) => /\/(api|admin|auth|lovable|internal)(\/|$)/.test(url)), false);
});