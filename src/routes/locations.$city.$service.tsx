import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationServiceDraftPage } from "@/components/LocationServiceDraftPage";
import { getLocationServiceDraft } from "@/lib/seo/location-service-drafts";
import { communityServicePath } from "@/lib/seo/community-addresses";
import { breadcrumbSchema, faqSchema, jsonLd, SITE_URL } from "@/lib/seo/schema";

export const Route = createFileRoute("/locations/$city/$service")({
  loader: ({ params }) => {
    const draft = getLocationServiceDraft(params.city, params.service);
    if (!draft) throw notFound();
    return draft;
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? "Security page unavailable | Fortega";
    const description = loaderData?.description ?? "Explore Fortega security services and project planning.";
    const url = loaderData ? SITE_URL + communityServicePath(loaderData.city.slug, loaderData.service.slug) : undefined;
    return {
      meta: [{ title }, { name: "description", content: description }, { name: "robots", content: loaderData ? "index, follow" : "noindex, nofollow" }, { property: "og:title", content: title }, { property: "og:description", content: description }, ...(url ? [{ property: "og:url", content: url }] : []), { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }],
      links: url ? [{ rel: "canonical", href: url }] : [],
      scripts: loaderData ? [jsonLd(faqSchema(loaderData.faqs)), jsonLd(breadcrumbSchema([{ name: "Locations", path: "/locations" }, { name: loaderData.city.name, path: `/locations/${loaderData.city.slug}` }, { name: loaderData.service.shortName, path: communityServicePath(loaderData.city.slug, loaderData.service.slug) }]))] : [],
    };
  },
  component: CommunityServicePage,
});
function CommunityServicePage() { return <LocationServiceDraftPage draft={Route.useLoaderData()} />; }