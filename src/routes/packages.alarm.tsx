import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Camera, CheckCircle2, DoorOpen, Phone, Radar, Router, Tablet } from "lucide-react";
import { submitContact } from "@/lib/contact.functions";
import { breadcrumbSchema, jsonLd, SITE_URL, socialMeta } from "@/lib/seo/schema";

const TITLE = "Alarm Systems From $25/Month, $0 Upfront | Fortega";
const DESCRIPTION =
  "Home and business alarm packages from CAD $25/month with $0 upfront. Touchscreen hub, sensors and your choice of a free camera or doorbell. Request a free assessment.";

export const Route = createFileRoute("/packages/alarm")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      ...socialMeta({ title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/packages/alarm` }),
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/packages/alarm` }],
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Alarm Packages", path: "/packages/alarm" },
        ]),
      ),
    ],
  }),
  component: AlarmPackagePage,
});

const included = [
  { icon: Tablet, title: "Touchscreen panel", text: "Arm, disarm and check your system from one screen." },
  { icon: Router, title: "Security hub", text: "Connects every sensor and device in the package." },
  { icon: DoorOpen, title: "2 door / window sensors", text: "Alerts when a protected door or window opens." },
  { icon: Radar, title: "1 motion sensor", text: "Detects movement in a key room or hallway." },
  { icon: Camera, title: "Free camera or doorbell", text: "Choose 1 camera or 1 video doorbell, included." },
];

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  property: z.enum(["Home", "Business"], { message: "Select a property type" }),
  city: z.string().trim().min(2, "City is required").max(80),
  choice: z.enum(["Camera", "Video doorbell", "Not sure yet"], { message: "Select your free device" }),
  notes: z.string().trim().max(1000).optional(),
});

function AlarmPackagePage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const submit = useServerFn(submitContact);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = formSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget).entries()));
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setServerError(null);
    setSending(true);
    const d = result.data;
    try {
      await submit({
        data: {
          name: d.name,
          email: d.email,
          phone: d.phone,
          service: "Alarm Package from $25/month",
          message: `Alarm package assessment request.\nProperty: ${d.property}\nCity: ${d.city}\nFree device choice: ${d.choice}${d.notes ? `\nNotes: ${d.notes}` : ""}`,
        },
      });
      setSubmitted(true);
    } catch {
      setServerError("Unable to send your request. Please try again or call 1-888-869-1679.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.18_252/0.2),transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-glow">Fortega Alarm Packages</span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
              Alarm systems from $25/month. $0 upfront.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Protect your home or business with a smart home security alarm system or burglar alarm system, and choose a free camera or
              video doorbell. Request a free assessment and we'll recommend the right setup for your property.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#assessment" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3.5 text-sm font-semibold text-brand-foreground">
                Request Free Assessment <ArrowRight className="h-4 w-4" />
              </a>
              <a href="tel:+18888691679" className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3.5 text-sm font-semibold text-foreground">
                <Phone className="h-4 w-4" /> (888) 869-1679
              </a>
            </div>
          </div>
          <div className="self-start lg:col-span-5">
            <div className="rounded-2xl border border-brand-glow/40 bg-surface p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Starting at</p>
              <p className="mt-2 font-display text-6xl font-bold text-foreground">$25<span className="text-2xl text-muted-foreground">/month</span></p>
              <p className="mt-2 text-lg font-semibold text-brand-glow">$0 upfront</p>
              <ul className="mt-6 space-y-2 text-sm text-foreground">
                {included.map((i) => (
                  <li key={i.title} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-glow" />{i.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground">What's in the package</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Everything you need to start protecting doors, windows and key areas. Homes, shops, offices, buildings and commercial properties all get the same coverage, whether you want a home alarm system, a commercial burglar alarm system or one of our security alarm systems for business.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {included.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-surface p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-glow text-brand-foreground"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="assessment" className="scroll-mt-24 border-t border-border py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-10">
            <h2 className="font-display text-2xl font-bold text-foreground">Request your free assessment</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tell us about your property and we'll prepare your custom quote. We'll never share your information.</p>
            {submitted ? (
              <div className="mt-8 flex items-start gap-3 rounded-lg border border-brand-glow/40 bg-brand/10 p-5 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-brand-glow" />
                <div>
                  <p className="font-semibold">Thank you. Your request has been received.</p>
                  <p className="mt-1 text-muted-foreground">A Fortega specialist will contact you about your assessment.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2" noValidate>
                <Field label="Full Name" name="name" error={errors.name} />
                <Field label="Phone" name="phone" type="tel" error={errors.phone} />
                <Field label="Email" name="email" type="email" error={errors.email} />
                <Field label="City" name="city" error={errors.city} />
                <Select label="Property Type" name="property" options={["Home", "Business"]} error={errors.property} />
                <Select label="Your Free Device" name="choice" options={["Camera", "Video doorbell", "Not sure yet"]} error={errors.choice} />
                <div className="sm:col-span-2">
                  <Label>Anything we should know? (optional)</Label>
                  <textarea name="notes" rows={4} className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm text-foreground focus:border-brand-glow focus:outline-none" placeholder="Building type, number of doors, current system…" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={sending} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-glow px-6 py-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-60 sm:w-auto">
                    {sending ? "Sending…" : <>Request Free Assessment & Quote <ArrowRight className="h-4 w-4" /></>}
                  </button>
                  {serverError && <p className="mt-3 text-xs text-destructive">{serverError}</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{children}</label>;
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string | undefined }) {
  return (
    <div>
      <Label>{label}</Label>
      <input name={name} type={type} className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm text-foreground focus:border-brand-glow focus:outline-none" />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Select({ label, name, options, error }: { label: string; name: string; options: string[]; error?: string | undefined }) {
  return (
    <div>
      <Label>{label}</Label>
      <select name={name} defaultValue="" className="mt-2 w-full rounded-md border border-input bg-background px-3.5 py-3 text-sm text-foreground focus:border-brand-glow focus:outline-none">
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
