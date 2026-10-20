import { writeFileSync } from "node:fs";
import { SITEMAP_GROUPS } from "../src/lib/seo/sitemap-inventory";
import { SITEMAP_BASE_URL } from "../src/lib/seo/sitemap";

// Run after changing the public inventories. Never import private research/drafts here.
const introduction = `# Fortega Inc.

> Security systems, security guard services, monitoring, building automation and cyber security for homes and businesses.

## Contact

- Website: https://fortega.ca
- Telephone: 1-888-869-1679
- Address: 3080 Yonge Street, Suite 6060, Toronto, ON M4N 3N1
- Assessments can begin remotely using drawings, layouts, building types and project details.

## Public page directory

This directory lists production-eligible pages. Community service review drafts are excluded from this directory and the XML sitemaps.
Province and building-type guidance is not evidence of a completed local installation.

- [XML sitemap index](https://fortega.ca/sitemap.xml)
- [Crawler instructions](https://fortega.ca/robots.txt)
`;

const sections = Object.entries(SITEMAP_GROUPS).map(([group, entries]) => {
  const heading = group === "fr" ? "French pages" : group.replaceAll("-", " ");
  return `## ${heading}\n\n${entries.map(({ path }) => {
    const label = path === "/" ? "Home" : path.slice(1).split("/").map((segment) => segment.replaceAll("-", " ")).join(" / ");
    return `- [${label}](${SITEMAP_BASE_URL}${path})`;
  }).join("\n")}`;
});

writeFileSync("public/llms.txt", `${introduction}\n${sections.join("\n\n")}\n`);
console.log(`Updated llms.txt with ${Object.values(SITEMAP_GROUPS).flat().length} public pages.`);