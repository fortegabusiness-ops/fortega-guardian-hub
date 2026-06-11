import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WebMcpProvider } from "@/components/WebMcpProvider";
import { organizationSchema, websiteSchema, jsonLd } from "@/lib/seo/schema";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fortega — Integrated Security Solutions for Modern Businesses" },
      { name: "description", content: "Fortega delivers advanced electronic security, CCTV, access control, monitoring, automation and cyber security across Canada." },
      { name: "author", content: "Fortega" },
      { property: "og:title", content: "Fortega — Integrated Security Solutions for Modern Businesses" },
      { property: "og:description", content: "Fortega delivers advanced electronic security, CCTV, access control, monitoring, automation and cyber security across Canada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Fortega" },
      { name: "twitter:title", content: "Fortega — Integrated Security Solutions for Modern Businesses" },
      { name: "twitter:description", content: "Fortega delivers advanced electronic security, CCTV, access control, monitoring, automation and cyber security across Canada." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f1ee9735-0d6c-4d9f-85e1-bb0cba2c0038/id-preview-241acf5a--eb38f20d-f359-421d-b007-119c82fc3a0c.lovable.app-1781040321451.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f1ee9735-0d6c-4d9f-85e1-bb0cba2c0038/id-preview-241acf5a--eb38f20d-f359-421d-b007-119c82fc3a0c.lovable.app-1781040321451.png" },
      { name: "google-site-verification", content: "ylRWHQ2iy3XhKg_KbNt1ULBA98FfWmAktZwrGWfiIuA" },
      { name: "msvalidate.01", content: "99ED43E436EABD7D3EBD746AF6ED2499" },
      { name: "yandex-verification", content: "06387e8df43d521a" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
      { rel: "alternate", type: "application/rss+xml", title: "Fortega Blog", href: "https://fortega.ca/feed.xml" },
    ],
    scripts: [jsonLd(organizationSchema), jsonLd(websiteSchema)],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <WebMcpProvider />
        <SiteHeader />
        <main className="flex-1 pt-16 md:pt-20">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
