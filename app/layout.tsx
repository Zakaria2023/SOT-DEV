import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/landing";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_URL,
} from "@/lib/seo";
import { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

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
// copy — open apertures, semi-geometric, and warm enough to sit beside the gold
// without arguing with it. JetBrains Mono stays on the terminal, because the
// terminal is a real one and deserves a face built for code.
//
// All three are loaded as VARIABLE fonts — no `weight` array. One file per
// family covers the whole range, which is fewer requests than the four static
// instances it replaces, and it is what keeps Bricolage's optical sizing alive:
// pin it to static weights and the axis is baked out. The house cap on weight
// is a rule about which classes we write, not about which file we fetch.
//
// Self-hosted at build time either way, so there is no request to
// fonts.googleapis.com and no cross-origin chain in front of the first paint.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

// Pinned to 400, and only 400. Every `font-medium` on this page sits on the
// HEADING face, so the variable Manrope file was shipping an entire weight axis
// to render one weight — about 22KiB of critical-path bandwidth bought nothing.
// Bricolage stays variable, because there the axis is the point.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-manrope",
  display: "swap",
});

// NOT preloaded, unlike the other two. Preloading puts a font on the critical
// path, and three of them is 105KiB of it — which on a throttled connection is
// most of what stands between the request and the headline being painted.
// JetBrains Mono sets the terminal and the tooling ticker: below the fold on a
// phone, and mono text that arrives a moment late in a metrics-matched fallback
// is the cheapest of the three to be patient about.
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

const TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  // Everything relative below — the canonical, the OG image, the Twitter card —
  // is resolved against this. Without it Next emits relative URLs into tags
  // that are only meaningful as absolute ones.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // There is one page today. The template is here so that the day a second
    // one is added it inherits the brand suffix rather than shipping a bare
    // title, which is the sort of thing nobody notices for a month.
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Smart of Things", url: "https://sot.com.sa" }],
  creator: "Smart of Things",
  publisher: "Smart of Things",
  category: "technology",
  keywords: [
    "software development company Saudi Arabia",
    "web development Riyadh",
    "mobile app development KSA",
    "Odoo ERP implementation Saudi Arabia",
    "Next.js development agency",
    "React Native development",
    "custom software development Riyadh",
    "DevOps and cloud consulting KSA",
    "system integration Saudi Arabia",
    "Smart of Things",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google use a full-size image and an unclipped snippet. The defaults
      // are conservative, and a truncated description is a worse result than
      // the one the page actually wrote.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: SITE_DESCRIPTION,
    locale: SITE_LOCALE,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  // The phone numbers on this page are already explicit `tel:` links. Leaving
  // detection on lets iOS find them a second time and restyle them mid-sentence
  // in its own blue, which is the one colour this page does not own.
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  // The brand gold, so the browser chrome on Android and the tab strip on
  // desktop Safari carry it too.
  themeColor: "#b99253",
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang="en"
    className={`${manrope.variable} ${bricolage.variable} ${jetBrainsMono.variable} h-full antialiased`}
  >
    <body className="font-sot flex min-h-full flex-col">
      {/* Every scroll entrance on this page starts at `opacity: 0` and is
          brought in by an IntersectionObserver. Without JavaScript that
          observer never runs, so the sections would stay invisible forever —
          this hands a reader without it the finished page instead. */}
      <noscript>
        <style>{`[data-reveal]{opacity:1;transform:none}`}</style>
      </noscript>

      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </body>
  </html>
);

export default RootLayout;
