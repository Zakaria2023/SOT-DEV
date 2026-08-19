import {
  CAPABILITIES,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_PHONE_UNIFIED,
  FAQ,
  FRAMEWORKS,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/landing";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export type JsonLd = Record<string, unknown>;

/**
 * The organisation behind the page.
 *
 * `@id` is a stable fragment on the site's own origin rather than a bare name,
 * which is what lets the other nodes point AT this one — a `publisher` that
 * repeats the whole organisation inline gives a crawler two organisations to
 * reconcile instead of one to resolve.
 *
 * The head office only. The showroom and the wholesale branch are separate
 * places, not second addresses for this one, and listing three under a single
 * Organization says the company has three head offices.
 */
export const organizationNode = (): JsonLd => ({
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ["SOT", "Smart of Things"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/sot-logo.webp"),
    width: 210,
    height: 116,
  },
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  telephone: `+966${CONTACT_PHONE_UNIFIED}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_ADDRESS.slice(0, 2).join(", "),
    addressLocality: "Riyadh",
    addressRegion: "Riyadh Province",
    addressCountry: "SA",
  },
  areaServed: {
    "@type": "Country",
    name: "Saudi Arabia",
  },
  // Two points rather than one with five numbers on it. The unified line is
  // the switchboard and the three mobiles are the direct ones; collapsing them
  // together tells a crawler they are interchangeable, which they are not.
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      telephone: `+966${CONTACT_PHONE_UNIFIED}`,
      availableLanguage: ["en", "ar"],
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      telephone: CONTACT_PHONES.map((phone) => phone.replace(/\s/g, "")),
      availableLanguage: ["en", "ar"],
    },
  ],
});

export const webSiteNode = (): JsonLd => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
});

/**
 * The studio as a service business, with its six capabilities as an offer
 * catalogue.
 *
 * Built from `CAPABILITIES` rather than written out again, so a service added
 * to the page is a service added to the markup. The commonest way structured
 * data goes wrong is not being invalid — it is being a second, stale copy of
 * what the page says, which is exactly what Google penalises it for.
 */
export const professionalServiceNode = (): JsonLd => ({
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#studio`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: absoluteUrl("/sot-logo.webp"),
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_ADDRESS.slice(0, 2).join(", "),
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  telephone: `+966${CONTACT_PHONE_UNIFIED}`,
  email: CONTACT_EMAIL,
  areaServed: { "@type": "Country", name: "Saudi Arabia" },
  knowsAbout: FRAMEWORKS.map((framework) => framework.name),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software engineering services",
    itemListElement: CAPABILITIES.map((capability) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: capability.title,
        description: capability.description,
        serviceType: capability.title,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  },
});

/**
 * The FAQ band, restated for a crawler.
 *
 * Google only shows a rich result when the markup and the visible answers
 * agree, so this reads the same `FAQ` constant the accordion renders. If the
 * section is ever removed from the page, this node has to go with it.
 */
export const faqPageNode = (): JsonLd => ({
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const webPageNode = (): JsonLd => ({
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
  primaryImageOfPage: absoluteUrl("/sot-logo.webp"),
});

/**
 * One `@graph` rather than a page full of separate script tags.
 *
 * Separate blocks leave each node to be matched up by guesswork; a graph lets
 * them reference one another by `@id`, so the organisation is stated once and
 * pointed at four times.
 */
export const graph = (nodes: JsonLd[]): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
