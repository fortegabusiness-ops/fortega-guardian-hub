import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationServiceDraftPage } from "@/components/LocationServiceDraftPage";
import { getLocationServiceDraft } from "@/lib/seo/location-service-drafts";
import { faqSchema, jsonLd, SITE_URL } from "@/lib/seo/schema";

/** Separate review addresses never grant eligibility to deleted production URLs. */
export const Route = createFileRoute("/location-review/$city/$service")({
  loader: ({ params }) => {
    const draft = getLocationServiceDraft(params.city, params.service);
    if (!draft) throw notFound();
    return draft;
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? "Security project review unavailable | Fortega";
    const description = loaderData?.description ?? "Review a Fortega security project planning draft.";
    return {
      meta: [{ title }, { name: "description", content: description }, { name: "robots", content: "noindex, nofollow" }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }],
      links: loaderData ? [{ rel: "canonical", href: `${SITE_URL}/location-review/${loaderData.city.slug}/${loaderData.service.slug}` }] : [],
      scripts: loaderData ? [jsonLd(faqSchema(loaderData.faqs))] : [],
    };
  },
  component: LocationServiceReview,
});

function LocationServiceReview() {
  return <LocationServiceDraftPage draft={Route.useLoaderData()} />;
}