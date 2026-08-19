import { Dictionary } from "@/lib/dictionary";
import { Locale, htmlLang } from "@/lib/i18n";
import {
  CAPABILITY_ORDER,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_PHONE_UNIFIED,
  FRAMEWORKS,
  SITE_NAME,
} from "@/lib/landing";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

export type JsonLd = Record<string, unknown>;

/**
 * The organisation behind the page.
 *
 * `@id` has NO locale in it, deliberately. There is one company, and the
 * English and Arabic pages must describe the same entity rather than two that a
 * crawler then has to guess are related. The `WebPage` and `WebSite` nodes are
 * per-locale and point at this one.
 *
 * The head office only. The showroom and the wholesale branch are separate
 * places, not second addresses for this one, and listing three under a single
 * Organization says the company has three head offices.
 */
export const organizationNode = (dict: Dictionary): JsonLd => ({
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
  description: dict.meta.description,
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

export const webSiteNode = (locale: Locale, dict: Dictionary): JsonLd => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/${locale}#website`,
  url: `${SITE_URL}/${locale}`,
  name: SITE_NAME,
  description: dict.meta.description,
  inLanguage: htmlLang(locale),
  publisher: { "@id": `${SITE_URL}/#organization` },
});

/**
 * The studio as a service business, with its capabilities as an offer
 * catalogue.
 *
 * Built from `CAPABILITY_ORDER` and the dictionary rather than written out
 * again, so a service added to the page is a service added to the markup — in
 * both languages at once.
 */
export const professionalServiceNode = (
  locale: Locale,
  dict: Dictionary,
): JsonLd => ({
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/${locale}#studio`,
  name: SITE_NAME,
  description: dict.meta.description,
  url: `${SITE_URL}/${locale}`,
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
    name: dict.sections.capabilities.eyebrow,
    itemListElement: CAPABILITY_ORDER.map((id) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: dict.capabilities[id].title,
        description: dict.capabilities[id].description,
        serviceType: dict.capabilities[id].title,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  },
});

/**
 * The FAQ band, restated for a crawler.
 *
 * Google only shows a rich result when the markup and the visible answers
 * agree, so this reads the same `dict.faq` the accordion renders. If the
 * section is ever removed from the page, this node has to go with it.
 */
export const faqPageNode = (locale: Locale, dict: Dictionary): JsonLd => ({
  "@type": "FAQPage",
  "@id": `${SITE_URL}/${locale}#faq`,
  inLanguage: htmlLang(locale),
  mainEntity: dict.faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const webPageNode = (locale: Locale, dict: Dictionary): JsonLd => ({
  "@type": "WebPage",
  "@id": `${SITE_URL}/${locale}#webpage`,
  url: `${SITE_URL}/${locale}`,
  name: `${SITE_NAME} — ${dict.meta.tagline}`,
  description: dict.meta.description,
  isPartOf: { "@id": `${SITE_URL}/${locale}#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  inLanguage: htmlLang(locale),
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
