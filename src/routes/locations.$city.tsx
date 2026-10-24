import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/locations/$city")({ component: CityLayout });
function CityLayout() { return <Outlet />; }