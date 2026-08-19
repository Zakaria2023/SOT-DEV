import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/landing";
import { Metadata, Viewport } from "next";
import { JetBrains_Mono, Lato, Roboto } from "next/font/google";
import "./globals.css";

// Self-hosted at build time, so there is no request to fonts.googleapis.com and
// no cross-origin chain standing in front of the first paint. The two brand
// families are the public SOT site's, so a visitor crossing over from
// sot.com.sa does not change typeface mid-journey. Only the weights actually
// used are fetched — nothing here goes above medium.
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-lato",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
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
    className={`${lato.variable} ${roboto.variable} ${jetBrainsMono.variable} h-full antialiased`}
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
