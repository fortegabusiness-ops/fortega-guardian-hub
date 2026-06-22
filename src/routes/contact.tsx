import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import { breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/seo/schema";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Fortega — Request a Security Consultation" },
      { name: "description", content: "Get in touch with Fortega for integrated security solutions across Canada. Request a consultation, site assessment or 24/7 support." },
      { property: "og:title", content: "Contact Fortega" },
      { property: "og:description", content: "Request a security consultation. Canada-wide service. 24/7 support." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        url: `${SITE_URL}/contact`,
        name: "Contact Fortega",
        mainEntity: { "@id": `${SITE_URL}/#organization` },
      }),
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  service: z.string().min(1, "Select a service"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1500),
});

const services = [
  "Consulting & Professional Services",
  "CCTV & Video Surveillance",
  "Intrusion & Burglar Alarms",
  "Access Control Systems",
  "Remote Guarding & Monitoring",
  "Security Guard Services",
  "Smart Building & Automation",
  "Cyber Security",
  "Other / Not Sure",
];

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const submit = useServerFn(submitContact);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setServerError(null);
    setSending(true);
    try {
      await submit({ data: result.data });
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.18_252/0.2),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">Contact</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Let's design your security program.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Tell us about your sites and objectives. A Fortega specialist will respond within one
            business day to scope a consultation or assessment.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-10">
              <h2 className="font-display text-2xl font-bold text-foreground">Request a Consultation</h2>
              <p className="mt-2 text-sm text-muted-foreground">We'll never share your information.</p>

              {submitted ? (
                <div className="mt-8 flex items-start gap-3 rounded-lg border border-brand-glow/40 bg-brand/10 p-5 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-brand-glow" />
                  <div>
                    <p className="font-semibold">Thank you — your request has been received.</p>
                    <p className="mt-1 text-muted-foreground">A Fortega specialist will reach out within one business day.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2" noValidate>
                  <Field label="Full Name" name="name" error={errors.name} />
                  <Field label="Email" name="email" type="email" error={errors.email} />
                  <Field label="Phone" name="phone" type="tel" error={errors.phone} />
                  <div className="sm:col-span-2">
                    <Label>Service Needed</Label>
                    <select name="service" defaultValue="" className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm text-foreground focus:border-brand-glow focus:outline-none">
                      <option value="" disabled>Select a service…</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="mt-1.5 text-xs text-destructive">{errors.service}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Message</Label>
                    <textarea name="message" rows={5} className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm text-foreground focus:border-brand-glow focus:outline-none" placeholder="Sites, scope, timeline, current systems…" />
                    {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" disabled={sending} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-60 sm:w-auto">
                      {sending ? "Sending…" : <>Send Request <ArrowRight className="h-4 w-4" /></>}
                    </button>
                    {serverError && <p className="mt-3 text-xs text-destructive">{serverError}</p>}
                  </div>
                </form>
              )}
            </div>
          </div>

          <aside className="space-y-5 lg:col-span-5">
            <InfoCard icon={Phone} title="Call Us" lines={["(888) 869-1679", "Sales & support"]} />
            <InfoCard icon={Mail} title="Email" lines={["info@fortega.ca"]} />
            <InfoCard icon={MapPin} title="Head Office" lines={["3080 Yonge Street, Suite 6060", "Toronto, ON M4N 3N1", "Canada-wide service coverage"]} />
            <InfoCard icon={Clock} title="Business Hours" lines={["Mon–Fri · 8:00–18:00 ET", "Monitoring & support 24/7"]} />
          </aside>
        </div>
      </section>

    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{children}</label>;
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-glow focus:outline-none"
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: typeof Mail; title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-glow text-brand-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
          {lines.map((l) => <p key={l} className="mt-1 text-sm text-muted-foreground">{l}</p>)}
        </div>
      </div>
    </div>
  );
}