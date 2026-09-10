import type { Metadata } from "next";
import { SITE_URL } from "./links";

/**
 * Per-page metadata, built in one place.
 *
 * Two things here are not optional and were previously wrong:
 *
 *  - `canonical` must name the page itself. The root layout used to declare
 *    `canonical: "/"`, and because metadata is inherited every route emitted
 *    the homepage as its canonical — telling crawlers that /work, /about and
 *    every case study were duplicates of the front page.
 *  - `openGraph` must be per page. It is also inherited, so a shared case
 *    study or note previewed as the studio's homepage blurb.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  /** Route path, leading slash, no origin. */
  path: string;
  type?: "website" | "article";
  /** ISO date — only meaningful for articles. */
  publishedTime?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph:
      type === "article"
        ? { title, description, url, type, publishedTime }
        : { title, description, url, type },
    twitter: { title, description },
  };
}
