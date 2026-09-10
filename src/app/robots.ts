import type { MetadataRoute } from "next";
import { SITE_URL } from "./data/links";

/**
 * Note: /llms.txt is deliberately not referenced here. robots.txt has one job —
 * saying what may be crawled — and the llms.txt convention is discovered by
 * path, not by declaration.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
