const SITE_URL = "https://fortega.ca";
const LOGO_URL = "https://fortega.ca/favicon.ico";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Fortega",
  alternateName: "Fortega Security",
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    "Fortega is a Canadian electronic security company delivering integrated security, monitoring, automation and cyber security solutions.",
  email: "info@fortega.ca",
  telephone: "+1-888-869-1679",
  areaServed: { "@type": "Country", name: "Canada" },
  sameAs: [] as string[],
  slogan: "Security · Innovation · Strength",
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Fortega",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-CA",
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Fortega",
  image: LOGO_URL,
  url: SITE_URL,
  telephone: "+1-888-869-1679",
  email: "info@fortega.ca",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3080 Yonge Street, Suite 6060",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M4N 3N1",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "Country", name: "Canada" },
    { "@type": "AdministrativeArea", name: "Ontario" },
    { "@type": "AdministrativeArea", name: "Quebec" },
    { "@type": "AdministrativeArea", name: "British Columbia" },
    { "@type": "AdministrativeArea", name: "Alberta" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: [] as string[],
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function serviceSchema(s: {
  name: string;
  description: string;
  slug: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.serviceType ?? s.name,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Canada" },
    url: `${SITE_URL}/services#${s.slug}`,
  };
}

export function jsonLd(data: unknown) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  };
}

export { SITE_URL };