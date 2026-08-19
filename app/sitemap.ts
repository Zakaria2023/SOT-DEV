import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { MetadataRoute } from "next";

/**
 * One entry per language, each declaring the other as its alternate.
 *
 * `alternates.languages` is the sitemap's half of the same statement the
 * `hreflang` tags make in the head. Google wants the pair to agree, and a
 * sitemap that lists two URLs without saying they are translations of one
 * another invites exactly the "duplicate content" reading the tags exist to
 * prevent.
 *
 * `lastModified` is the build date — honest for a page whose content is
 * compiled into it. `priority` and `changeFrequency` are stated only because a
 * two-URL sitemap costs nothing to be complete; Google has said for years that
 * it ignores both.
 */
const sitemap = (): MetadataRoute.Sitemap =>
  LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === DEFAULT_LOCALE ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((alternate) => [alternate, `${SITE_URL}/${alternate}`]),
      ),
    },
  }));

export default sitemap;
