import type { MetadataRoute } from "next";
import { SITE_URL } from "./data/links";
import { workItems } from "./data/work";
import { journalPosts } from "./data/journal";

/**
 * Generated from the same data the pages render from, so it cannot fall out of
 * step with the site. Coming-soon work is deliberately absent: those pages
 * exist but are unlinked and thin, and listing them invites crawling of the
 * weakest content on the domain.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const work: MetadataRoute.Sitemap = workItems
    .filter((item) => item.status === "live")
    .map((item) => ({
      url: `${SITE_URL}/work/${item.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    }));

  const notes: MetadataRoute.Sitemap = journalPosts.map((post) => ({
    url: `${SITE_URL}/journal/${post.slug}`,
    lastModified: new Date(post.published),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...work, ...notes];
}
