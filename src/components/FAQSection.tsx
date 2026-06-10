import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export type FAQ = { q: string; a: string };

export function FAQSection({
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  sub,
  faqs,
}: {
  eyebrow?: string;
  title?: string;
  sub?: string;
  faqs: FAQ[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-glow">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {title}
          </h2>
          {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
        </div>
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-surface-elevated"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-foreground md:text-lg">
                    {f.q}
                  </span>
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-border text-brand-glow">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}