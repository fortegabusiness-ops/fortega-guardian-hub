import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, socialMeta, breadcrumbSchema, jsonLd } from "@/lib/seo/schema";

const TITLE = "Terms of Service | Fortega";
const DESC =
  "Terms governing use of the fortega.ca website operated by Fortega Inc.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...socialMeta({ title: TITLE, description: DESC, url: `${SITE_URL}/terms` }),
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ]),
      ),
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const updated = "June 23, 2026";
  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
      <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>

      <div className="mt-8 space-y-6 text-foreground">
        <p>
          These Terms of Service ("Terms") govern your access to and use of the website
          operated at fortega.ca (the "Site") by Fortega Inc. ("Fortega"). By
          accessing or using the Site you agree to these Terms.
        </p>

        <h2 className="font-display text-2xl font-semibold">Use of the site</h2>
        <p>
          The Site is provided for general information about Fortega's security services.
          You agree not to misuse the Site, interfere with its operation, or attempt to
          access it using a method other than the interfaces we provide.
        </p>

        <h2 className="font-display text-2xl font-semibold">No professional advice</h2>
        <p>
          Content on the Site, including blog posts and service descriptions, is provided
          for general information only and does not constitute professional, legal,
          regulatory or engineering advice. Specific recommendations require a formal
          engagement and site assessment with Fortega.
        </p>

        <h2 className="font-display text-2xl font-semibold">Intellectual property</h2>
        <p>
          The Site, including its design, text, graphics and trademarks, is owned by
          Fortega Inc. or its licensors and is protected by applicable
          intellectual-property laws. You may not copy, modify or redistribute material
          from the Site without our written permission, except for fair-dealing uses
          permitted by law.
        </p>

        <h2 className="font-display text-2xl font-semibold">Disclaimer</h2>
        <p>
          The Site is provided on an "as is" and "as available" basis. To the maximum
          extent permitted by Canadian law, Fortega disclaims all warranties, express or
          implied, including warranties of merchantability, fitness for a particular
          purpose and non-infringement.
        </p>

        <h2 className="font-display text-2xl font-semibold">Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Fortega will not be liable for any
          indirect, incidental, special, consequential or punitive damages arising out of
          or related to your use of the Site.
        </p>

        <h2 className="font-display text-2xl font-semibold">Governing law</h2>
        <p>
          These Terms are governed by the laws of the Province of Ontario and the federal
          laws of Canada applicable in that province. Any dispute will be subject to the
          exclusive jurisdiction of the courts of Ontario.
        </p>

        <h2 className="font-display text-2xl font-semibold">Contact</h2>
        <p>
          Questions about these Terms: <a className="text-brand hover:underline" href="mailto:info@fortega.ca">info@fortega.ca</a>.
        </p>

        <p className="text-sm text-muted-foreground">
          These Terms are provided for transparency and are not legal advice.
        </p>
      </div>
    </article>
  );
}
