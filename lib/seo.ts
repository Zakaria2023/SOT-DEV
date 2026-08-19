/**
 * The public origin. It feeds `metadataBase`, so it is the origin of the
 * canonical tag, the `og:url`, the `@id` of every structured-data node, and the
 * `Sitemap:` line in robots.txt.
 *
 * Set `NEXT_PUBLIC_SITE_URL` per environment. The fallback is the address this
 * site is meant to be served at rather than a preview or internal host: a
 * deployment that was simply never given the variable then publishes a
 * canonical that is *correct*, instead of nominating some staging hostname as
 * the real home of the page. A missing variable should fail harmlessly, not
 * leak.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev.sot.com.sa"
).replace(/\/$/, "");

/** Saudi English, which is what `og:locale` wants and `lang` does not. */
export const SITE_LOCALE = "en_SA";

export const absoluteUrl = (path: string): string =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * The generated card from `app/opengraph-image.tsx`.
 *
 * Named here rather than left to the file convention alone because the moment
 * a page writes its own `openGraph` object it REPLACES the inherited one
 * wholesale — the convention does not merge back in, and the symptom is a page
 * that silently ships with no card at all.
 */
export const OG_IMAGE_PATH = "/opengraph-image";

export const OG_IMAGE_WIDTH = 1200;

export const OG_IMAGE_HEIGHT = 630;
