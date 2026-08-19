import { ar } from "@/lib/dictionaries/ar";
import { en } from "@/lib/dictionaries/en";
import { Dictionary } from "@/lib/dictionary";

/**
 * The two languages the site is published in.
 *
 * A `const` array with the union derived from it rather than a TypeScript
 * `enum`, which is the house pattern — it is one list, so `generateStaticParams`,
 * the language switcher, the sitemap and the `hreflang` alternates cannot drift
 * apart by someone adding a locale in one of them.
 */
export const LOCALES = ["en", "ar"] as const satisfies readonly string[];

export type Locale = (typeof LOCALES)[number];

/** English. What `/` redirects to, and what `x-default` points at. */
export const DEFAULT_LOCALE: Locale = "en";

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };

/**
 * Narrows an unknown route segment to a locale.
 *
 * `params` arrives as `string`, and a request for `/de` must not be allowed to
 * index the dictionary and return `undefined` for every key — that renders a
 * page of blanks rather than a 404.
 */
export const isLocale = (value: string): value is Locale =>
  LOCALES.includes(value as Locale);

export const getDictionary = (locale: Locale): Dictionary =>
  DICTIONARIES[locale];

/**
 * Arabic runs right to left, and this is the whole of what makes it do so —
 * `dir` on `<html>` flips every logical property in the stylesheet at once,
 * which is why the components are written with `ms`/`me`, `ps`/`pe` and
 * `start`/`end` rather than `ml`, `pl` and `left`.
 */
export const direction = (locale: Locale): "ltr" | "rtl" =>
  locale === "ar" ? "rtl" : "ltr";

/** The `lang` attribute, and the locale `Intl` formatting is done against. */
export const htmlLang = (locale: Locale): string =>
  locale === "ar" ? "ar-SA" : "en";

/** `og:locale`, which wants the underscored form rather than a BCP-47 tag. */
export const openGraphLocale = (locale: Locale): string =>
  locale === "ar" ? "ar_SA" : "en_SA";
