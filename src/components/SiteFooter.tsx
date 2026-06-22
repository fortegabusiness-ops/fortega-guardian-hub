import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/fortega-logo-new.png.asset.json";

const services = [
  "Consulting & Professional Services",
  "CCTV & Video Surveillance",
  "Intrusion & Burglar Alarms",
  "Access Control Systems",
  "Remote Guarding & Monitoring",
  "Security Guard Services",
  "Smart Building & Automation",
  "Cyber Security",
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-ink">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-glow to-transparent opacity-60" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center">
              <img src={logo.url} alt="Fortega" className="h-10 w-auto" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A trusted, technology-driven security partner delivering integrated electronic
              security, monitoring, automation and cyber security across Canada.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Services", "/services"],
                ["Industries", "/industries"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
              ].map(([l, t]) => (
                <li key={t}>
                  <Link to={t} className="text-muted-foreground transition-colors hover:text-foreground">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-muted-foreground transition-colors hover:text-foreground">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 text-brand-glow" /><span>3080 Yonge Street, Suite 6060<br />Toronto, ON M4N 3N1</span></li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 text-brand-glow" /> (888) 869-1679</li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 text-brand-glow" /><span>info@fortega.ca</span></li>
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-brand to-brand-glow px-4 py-2.5 text-sm font-semibold text-brand-foreground"
            >
              Request Consultation
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Fortega Security Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}