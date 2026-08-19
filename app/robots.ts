import { SITE_URL } from "@/lib/seo";
import { MetadataRoute } from "next";

/**
 * One page, nothing private, nothing to hide from a crawler — so this allows
 * everything rather than inventing disallow rules for routes that do not exist.
 *
 * `/_next/` is left crawlable on purpose. Blocking it is a habit carried over
 * from older setups, and it stops Googlebot fetching the CSS and JavaScript it
 * needs to render the page, which makes the site look broken to the very
 * crawler the file is written for.
 */
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
  },
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
