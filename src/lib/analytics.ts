// Google Analytics (GA4) via gtag.js. Browser-only: call initAnalytics and
// trackPageView from useEffect / event handlers, never during SSR or render.

const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as
  | string
  | undefined;

// Google Ads account Fortega Prime (8582529417) tag and the
// "Alarm package assessment request" lead conversion.
export const GOOGLE_ADS_ID = "AW-18534266502";
export const ALARM_LEAD_SEND_TO = "AW-18534266502/VCTGCLiru7wdEIbt6YVF";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function initAnalytics(): void {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId ?? GOOGLE_ADS_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params -- gtag.js only accepts the Arguments object
    window.dataLayer!.push(arguments);
  } as (...args: unknown[]) => void;
  window.gtag("set", "developer_id.dZjgwMW", true);
  window.gtag("js", new Date());
  // send_page_view: false — we send page_view manually so SPA route changes
  // are tracked exactly once with the correct path.
  if (measurementId) window.gtag("config", measurementId, { send_page_view: false });
  window.gtag("config", GOOGLE_ADS_ID);
}

export function trackAlarmLeadConversion(): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", {
    send_to: ALARM_LEAD_SEND_TO,
    value: 0,
    currency: "CAD",
  });
}

export function trackPageView(path: string): void {
  if (typeof window === "undefined" || !window.gtag || !measurementId) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
