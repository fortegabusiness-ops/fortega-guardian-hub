import { createFileRoute, notFound } from "@tanstack/react-router";
import { CommunityOverviewPage } from "@/components/CommunityOverviewPage";
import { COMMUNITY_BY_SLUG } from "@/lib/seo/community-addresses";
import { CITY_BY_SLUG } from "@/lib/seo/cities";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/seo/schema";
import { clampDescription, clampTitle } from "@/lib/seo/meta";
import { FR_CITY_BY_SLUG } from "@/lib/seo/fr";

export const Route = createFileRoute("/locations/$city/")({
  loader: ({ params }) => {
    const city = COMMUNITY_BY_SLUG[params.city] ?? CITY_BY_SLUG[params.city];
    if (!city) throw notFound();
    return { city };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    const title = city ? clampTitle([`Security Services in ${city.name} | Fortega`, `Security — ${city.name} | Fortega`]) : "Location unavailable | Fortega";
    const description = city ? clampDescription(`Explore CCTV, access control, alarms, monitoring, guards and cyber security planning for ${city.name}, ${city.province}. Request a remote security assessment.`) : "Explore Fortega security services and project planning across Canada.";
    const url = city ? `${SITE_URL}/locations/${city.slug}` : undefined;
    return {
      meta: [{ title }, { name: "description", content: description }, { name: "robots", content: city ? "index, follow" : "noindex, nofollow" }, { property: "og:title", content: title }, { property: "og:description", content: description }, ...(url ? [{ property: "og:url", content: url }] : []), { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }],
      links: url ? [{ rel: "canonical", href: url }, ...(city && FR_CITY_BY_SLUG[city.slug] ? [{ rel: "alternate", hrefLang: "en-ca", href: url }, { rel: "alternate", hrefLang: "fr-ca", href: `${SITE_URL}/fr/securite/${city.slug}` }, { rel: "alternate", hrefLang: "x-default", href: url }] : [])] : [],
      scripts: city ? [jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }, { name: city.name, path: `/locations/${city.slug}` }]))] : [],
    };
  },
  component: CityOverview,
});
function CityOverview() { return <CommunityOverviewPage city={Route.useLoaderData().city} />; }
