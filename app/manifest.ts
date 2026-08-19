import { DEFAULT_LOCALE, getDictionary } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/landing";
import { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => {
  // A manifest is one document for the whole origin, so it takes the default
  // language rather than trying to be both.
  const dict = getDictionary(DEFAULT_LOCALE);

  return {
    name: `${SITE_NAME} — ${dict.meta.tagline}`,
    short_name: SITE_NAME,
    description: dict.meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3f0",
    theme_color: "#b99253",
    categories: ["business", "developer"],
    // `icons` is deliberately omitted: the only mark we have is a wide wordmark,
    // and an installed app squeezing that into a square tile looks worse than the
    // favicon the browser falls back to.
  };
};

export default manifest;
