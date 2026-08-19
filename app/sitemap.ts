import { SITE_URL } from "@/lib/seo";
import { MetadataRoute } from "next";

/**
 * One page, so one entry.
 *
 * `priority` and `changeFrequency` are stated rather than omitted only because
 * a single-URL sitemap costs nothing to be complete; Google has said for years
 * that it ignores both. What it does read is `lastModified`, which is the build
 * date — honest for a page whose content is compiled into it.
 */
const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
];

export default sitemap;
