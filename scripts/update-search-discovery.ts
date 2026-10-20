import { writeFileSync } from "node:fs";
import { SITEMAP_GROUPS } from "../src/lib/seo/sitemap-inventory";
import { SITEMAP_BASE_URL } from "../src/lib/seo/sitemap";

// Run after changing public inventories. Never import private research here.
const introduction = `# Fortega Inc.

> Security systems, security guard services, monitoring, building automation and cyber security for homes and businesses.

Telephone: 1-888-869-1679. Address: 3080 Yonge Street, Suite 6060, Toronto, ON M4N 3N1.
Assessments can begin remotely using drawings, layouts, building types and project details.

Province and building-type guidance is not evidence of a completed local installation.

## Public page directory

This directory lists public pages, including the owner-authorized community-service collection.
- [XML sitemap index](https://fortega.ca/sitemap.xml): All seven public sitemap sections.
- [Crawler instructions](https://fortega.ca/robots.txt): Search and AI crawler access instructions.
`;

const headings: Record<string, string> = {
  core: "Company and industries", services: "Services", locations: "Locations",
  "service-areas": "Service and city pages", resources: "Resources",
  fr: "French pages", communities: "Community service pages",
};
const descriptions: Record<string, string> = {
  core: "Company information, contact details, policies or industry-specific security guidance.",
  services: "Service overview and security project planning.",
  locations: "Community or province security planning information.",
  "service-areas": "Service-specific security planning for this community.",
  resources: "Security planning guide and related questions.",
  fr: "French-language security planning for Quebec.",
  communities: "Community-specific service topic, building-type guidance and project questions.",
};

const sections = Object.entries(SITEMAP_GROUPS).map(([group, entries]) => {
  const heading = headings[group] ?? group;
  return `## ${heading}\n\n${entries.map(({ path }) => {
    const label = path === "/" ? "Home" : path.slice(1).split("/").map((segment) => segment.replaceAll("-", " ")).join(" / ");
    return `- [${label}](${SITEMAP_BASE_URL}${path}): ${descriptions[group] ?? "Public Fortega page."}`;
  }).join("\n")}`;
});

writeFileSync("public/llms.txt", `${introduction}\n${sections.join("\n\n")}\n`);
console.log(`Updated llms.txt with ${Object.values(SITEMAP_GROUPS).flat().length} public pages.`);