import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";
import { NextRequest, NextResponse } from "next/server";

/**
 * Sends `/` to a language.
 *
 * Every page lives under `/[lang]`, which leaves the bare origin with nothing
 * to render — so something has to choose. This is the only server-side code in
 * the project, and it exists for that one redirect.
 *
 * The choice is made from `Accept-Language` rather than defaulting to English
 * outright: this is a Saudi company, a large share of visitors have Arabic at
 * the top of that header, and sending them to English first so they can find a
 * switcher is the wrong way round. Anything that is not Arabic gets English.
 *
 * Parsed by hand rather than with a negotiation library. The header is being
 * asked one question — does Arabic come before English — and pulling in
 * `negotiator` and `intl-localematcher` to answer it would be two dependencies
 * on the request path of a static site.
 */
const preferredLocale = (header: string | null) => {
  if (!header) {
    return DEFAULT_LOCALE;
  }

  // "ar-SA,ar;q=0.9,en;q=0.8" -> the tags in the order the browser ranked them,
  // which is the order they are written unless a q-value says otherwise.
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");

      return {
        base: (tag ?? "").trim().toLowerCase().split("-")[0] ?? "",
        quality: quality ? Number(quality) : 1,
      };
    })
    .filter((entry) => entry.base.length > 0)
    .sort((a, b) => b.quality - a.quality);

  const match = ranked.find((entry) =>
    LOCALES.some((locale) => locale === entry.base),
  );

  return match ? match.base : DEFAULT_LOCALE;
};

export const proxy = (request: NextRequest) => {
  const url = request.nextUrl.clone();

  url.pathname = `/${preferredLocale(request.headers.get("accept-language"))}`;

  // 307 rather than a permanent redirect. Which language `/` resolves to
  // depends on who is asking, and a 308 would have browsers and proxies cache
  // one visitor's answer for everybody else's.
  return NextResponse.redirect(url, 307);
};

export const config = {
  // Only the bare origin. Every other path either already carries a locale or
  // is a static asset, and running this on all of them would put a function in
  // front of every request to a fully static site.
  matcher: "/",
};
