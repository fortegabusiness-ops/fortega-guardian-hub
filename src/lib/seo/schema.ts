const SITE_URL = "https://fortega.ca";
const LOGO_URL = "https://fortega.ca/favicon.ico";
const OG_IMAGE_URL = `${SITE_URL}/__l5e/assets-v1/a45ab0c4-bdca-405e-a26d-d24869130bfc/og-default.jpg`;
const BLOG_AUTHOR_NAME = "Fortega Security Team";

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "3080 Yonge Street, Suite 6060",
  addressLocality: "Toronto",
  addressRegion: "ON",
  postalCode: "M4N 3N1",
  addressCountry: "CA",
} as const;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Fortega",
  legalName: "Fortega Inc.",
  alternateName: "Fortega Security",
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    "Fortega is a Canadian electronic security company delivering integrated security, monitoring, automation and cyber security solutions.",
  email: "info@fortega.ca",
  telephone: "+1-888-869-1679",
  address: POSTAL_ADDRESS,
  areaServed: { "@type": "Country", name: "Canada" },
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
  legalName: "Fortega Inc.",
  image: LOGO_URL,
  url: SITE_URL,
  telephone: "+1-888-869-1679",
  email: "info@fortega.ca",
  priceRange: "$$",
  address: POSTAL_ADDRESS,
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
    url: `${SITE_URL}/services/${s.slug}`,
  };
}

export function jsonLd(data: unknown) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  };
}

export function articleSchema(p: {
  title: string;
  description: string;
  slug: string;
  datePublished?: string | null;
  dateModified?: string | null;
  image?: string | null;
}) {
  const url = `${SITE_URL}/blog/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    ...(p.image ? { image: p.image } : {}),
    ...(p.datePublished ? { datePublished: new Date(p.datePublished).toISOString() } : {}),
    ...(p.dateModified ? { dateModified: new Date(p.dateModified).toISOString() } : {}),
    author: {
      "@type": "Organization",
      name: BLOG_AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

/** Build absolute URL for a project-relative path. */
export function absUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Per-page social meta block (OG + Twitter) using site defaults when not provided. */
export function socialMeta(opts: {
  title: string;
  description: string;
  url: string; // absolute
  image?: string; // absolute
  type?: "website" | "article";
}) {
  const img = opts.image ?? OG_IMAGE_URL;
  const type = opts.type ?? "website";
  return [
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:url", content: opts.url },
    { property: "og:type", content: type },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: img },
  ];
}

export { SITE_URL, OG_IMAGE_URL, BLOG_AUTHOR_NAME };