import { WhatsAppFloat } from "@/components/common/whatsapp-float";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import {
  DEFAULT_LOCALE,
  LOCALES,
  direction,
  getDictionary,
  htmlLang,
  isLocale,
  openGraphLocale,
} from "@/lib/i18n";
import { SITE_NAME } from "@/lib/landing";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_URL,
} from "@/lib/seo";
import { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Cairo,
  JetBrains_Mono,
  Manrope,
} from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

// ---- THE TYPE ----
//
// The parent site is set in Lato and Roboto. Both are competent and neither has
// a point of view, which is survivable on a corporate brochure and fatal on the
// front door of a studio whose whole claim is that it does the careful version.
// The continuity with sot.com.sa is carried by the mark and by the gold, which
// are the things a visitor actually recognises — not by the typeface.
//
// Bricolage Grotesque sets the headlines: a contemporary grotesque with an
// optical-size axis, so the hero tightens up on its own at 60px instead of
// sitting there at body-copy proportions blown up. Manrope carries the reading
// copy. JetBrains Mono stays on the terminal, because the terminal is a real
// one and deserves a face built for code.
//
// Only the two the first screen needs are preloaded. Three of them is 105KiB of
// critical path, and on a throttled connection that is most of what stands
// between the request and the headline being painted.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

// Pinned to 400, and only 400. Every `font-medium` on this page sits on the
// HEADING face, so the variable Manrope file was shipping an entire weight axis
// to render one weight. Bricolage stays variable, because there the axis is the
// point.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-manrope",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

// ARABIC. Neither Bricolage nor Manrope has a single Arabic glyph, so without
// this the Arabic page would be set by whatever the operating system happened
// to substitute — different on every device, and matched to nothing.
//
// Cairo carries both the headings and the body. It is the most widely used
// Arabic screen face for a reason: it is unfussy, it holds up at 12px and at
// 60px, and it is the face Saudi readers are most used to reading a business
// page in. 400 and 500 only, which is the whole emphasis vocabulary here.
//
// It sits BEHIND the Latin faces in the stack rather than replacing them (see
// `globals.css`), so it is reached only for glyphs they lack — which is exactly
// the Arabic — and "Next.js" on the Arabic page still comes out in Bricolage.
// Not preloaded: on the English page no Arabic glyph is ever rendered, so the
// file is never fetched.
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

/**
 * Both locales, prerendered at build. Derived from `LOCALES` rather than
 * written out again, so adding a language cannot leave a page unbuilt.
 */
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export const generateMetadata = async ({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> => {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  const dict = getDictionary(lang);
  const title = `${SITE_NAME} — ${dict.meta.tagline}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description: dict.meta.description,
    applicationName: SITE_NAME,
    authors: [{ name: "Smart of Things", url: "https://sot.com.sa" }],
    creator: "Smart of Things",
    publisher: "Smart of Things",
    category: "technology",
    keywords: dict.meta.keywords,
    alternates: {
      canonical: `/${lang}`,
      // Each language names itself, the other, and the default. Without the
      // reciprocal pair Google treats the two pages as competing duplicates
      // rather than as one page in two languages.
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": `/${DEFAULT_LOCALE}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${lang}`,
      siteName: SITE_NAME,
      title,
      description: dict.meta.description,
      locale: openGraphLocale(lang),
      images: [
        {
          url: `/${lang}${OG_IMAGE_PATH}`,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.description,
      images: [`/${lang}${OG_IMAGE_PATH}`],
    },
    // The phone numbers on this page are already explicit `tel:` links. Leaving
    // detection on lets iOS find them a second time and restyle them mid
    // sentence in its own blue, which is the one colour this page does not own.
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
  };
};

export const viewport: Viewport = {
  themeColor: "#b99253",
};

const RootLayout = async ({ children, params }: LayoutProps<"/[lang]">) => {
  const { lang } = await params;

  // `generateStaticParams` covers the two real locales, but the segment is
  // still a dynamic one — a request for `/de` must 404 rather than index an
  // undefined dictionary and render a page of blanks.
  if (!isLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <html
      lang={htmlLang(lang)}
      // The single switch that mirrors the whole page. Every component is
      // written with logical properties — `ms`/`me`, `ps`/`pe`, `start`/`end` —
      // so this one attribute flips the layout rather than a second stylesheet.
      dir={direction(lang)}
      className={`${manrope.variable} ${bricolage.variable} ${jetBrainsMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="font-sot flex min-h-full flex-col">
        {/* Every scroll entrance on this page starts at `opacity: 0` and is
            brought in by an IntersectionObserver. Without JavaScript that
            observer never runs, so the sections would stay invisible forever —
            this hands a reader without it the finished page instead. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none}`}</style>
        </noscript>

        <SiteHeader dict={dict} locale={lang} />
        <main className="flex-1">{children}</main>
        <SiteFooter dict={dict} />
        <WhatsAppFloat label={dict.actions.whatsApp} />
      </body>
    </html>
  );
};

export default RootLayout;
