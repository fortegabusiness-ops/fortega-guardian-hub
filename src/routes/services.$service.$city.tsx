import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { getServiceArea } from "@/lib/seo/service-areas";

export const Route = createFileRoute("/services/$service/$city")({
  beforeLoad: ({ params, location }) => {
    if (!getServiceArea(params.service, params.city)) throw notFound();
    throw redirect({ to: "/locations/$city/$service", params, search: location.search, statusCode: 301 });
  },
});
