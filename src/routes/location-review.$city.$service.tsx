import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { getLocationServiceDraft } from "@/lib/seo/location-service-drafts";

export const Route = createFileRoute("/location-review/$city/$service")({
  beforeLoad: ({ params, location }) => {
    if (!getLocationServiceDraft(params.city, params.service)) throw notFound();
    throw redirect({ to: "/locations/$city/$service", params, search: location.search, statusCode: 301 });
  },
});
