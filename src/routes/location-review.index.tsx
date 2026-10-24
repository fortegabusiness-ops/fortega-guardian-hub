import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/location-review/")({
  beforeLoad: ({ location }) => { throw redirect({ to: "/locations", search: location.search, statusCode: 301 }); },
});
