import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/landing";
import { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
  name: `${SITE_NAME} — ${SITE_TAGLINE}`,
  short_name: SITE_NAME,
  description: SITE_DESCRIPTION,
  start_url: "/",
  display: "standalone",
  background_color: "#f5f3f0",
  theme_color: "#b99253",
  categories: ["business", "developer"],
  // `icons` is deliberately omitted: the only mark we have is a wide wordmark,
  // and an installed app squeezing that into a square tile looks worse than the
  // favicon the browser falls back to.
});

export default manifest;
