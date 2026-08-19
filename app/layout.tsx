import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/landing";
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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en",
    type: "website",
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
