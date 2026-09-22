import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Layout route for /services/$service. Renders the matched child route:
 * the service detail page (index) or a service-area page (/$city).
 */
export const Route = createFileRoute("/services/$service")({
  component: () => <Outlet />,
});
