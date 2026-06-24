import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, socialMeta, breadcrumbSchema, jsonLd } from "@/lib/seo/schema";

const TITLE = "Privacy Policy | Fortega";
const DESC =
  "How Fortega Inc. collects, uses, stores and protects personal information across our Canadian security services and website.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      ...socialMeta({ title: TITLE, description: DESC, url: `${SITE_URL}/privacy` }),
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]),
      ),
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const updated = "June 23, 2026";
  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
      <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>

      <div className="mt-8 space-y-6 text-foreground">
        <p>
          Fortega Inc. ("Fortega", "we", "us") respects your privacy and is committed
          to protecting the personal information you share with us. This policy explains what
          we collect, why we collect it, and the choices you have. It applies to fortega.ca
          and to the services we deliver across Canada.
        </p>

        <h2 className="font-display text-2xl font-semibold">Information we collect</h2>
        <p>
          We collect contact information you provide through our consultation and contact
          forms (name, business email, phone number, company, and the details of your
          enquiry). When you visit our website we also collect standard server logs and
          basic analytics data such as IP address, browser type, referrer, and pages viewed.
        </p>

        <h2 className="font-display text-2xl font-semibold">How we use information</h2>
        <ul className="ml-5 list-disc space-y-1">
          <li>Respond to consultation requests and prepare proposals.</li>
          <li>Deliver, support and improve the security services you have engaged us for.</li>
          <li>Operate, secure and improve our website.</li>
          <li>Comply with applicable Canadian legal and regulatory obligations.</li>
        </ul>

        <h2 className="font-display text-2xl font-semibold">Legal basis</h2>
        <p>
          We handle personal information in accordance with Canada's Personal Information
          Protection and Electronic Documents Act (PIPEDA) and applicable provincial
          privacy laws. We do not sell personal information.
        </p>

        <h2 className="font-display text-2xl font-semibold">Sharing</h2>
        <p>
          We share personal information only with vetted service providers that help us
          operate our business (for example, hosting, email and analytics providers), and
          where required by law. Service providers are bound by confidentiality and
          data-protection obligations.
        </p>

        <h2 className="font-display text-2xl font-semibold">Retention</h2>
        <p>
          We retain personal information only for as long as needed to fulfil the purposes
          described above or to comply with our legal obligations.
        </p>

        <h2 className="font-display text-2xl font-semibold">Your choices</h2>
        <p>
          You can request access to, correction or deletion of your personal information by
          contacting us at <a className="text-brand hover:underline" href="mailto:info@fortega.ca">info@fortega.ca</a>.
        </p>

        <h2 className="font-display text-2xl font-semibold">Contact</h2>
        <p>
          Fortega Inc.<br />
          3080 Yonge Street, Suite 6060<br />
          Toronto, Ontario M4N 3N1<br />
          (888) 869-1679 · info@fortega.ca
        </p>

        <p className="text-sm text-muted-foreground">
          This policy is provided for transparency. It is not legal advice. We may update
          this page from time to time; the "Last updated" date above reflects the most
          recent revision.
        </p>
      </div>
    </article>
  );
}
