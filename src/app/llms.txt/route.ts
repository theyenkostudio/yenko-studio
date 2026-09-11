import { SITE_URL } from "../data/links";
import { pillars, delivery, rosters } from "../data/services";
import { workItems } from "../data/work";
import { journalPosts, formatDate } from "../data/journal";

/**
 * /llms.txt — a plain-text summary of the site for language models, following
 * the llmstxt.org convention. It sits alongside robots.txt and sitemap.xml as
 * the third machine-readable surface: robots says what may be crawled, sitemap
 * says what exists, this says what it all means.
 *
 * Generated from the same data the pages render from, so it cannot describe the
 * studio differently from the studio's own site. Nothing is asserted here that
 * is not asserted in public — including the absence of a case study for product
 * work, which is stated rather than quietly omitted.
 */
export const dynamic = "force-static";

function build() {
  const live = workItems.filter((item) => item.status === "live");

  const notes = [...journalPosts].sort(
    (a, b) => Date.parse(b.published) - Date.parse(a.published),
  );

  return `# Yenko Studio

> A design and technology studio based in Accra, Ghana and Abuja, Nigeria, working with clients worldwide. We design and build websites, e-commerce stores, brand systems and custom software.

Every project includes a dedicated product manager and dedicated quality assurance — unusual for a studio of this size, and the clearest difference between us and a freelancer.

Projects begin with a conversation rather than a form. We say honestly when a project is not a fit for us.

## Services

${pillars
  .map(
    (p) =>
      `- **${p.title}** — ${p.forWho}\n  Includes: ${p.includes.join("; ")}.${
        p.proof ? `\n  Proven by: ${SITE_URL}${p.proof.href}` : ""
      }${p.caveat ? `\n  Note: ${p.caveat}` : ""}`,
  )
  .join("\n")}

## How work is delivered

${delivery.map((d) => `- **${d.tag}** — ${d.title}.`).join("\n")}

## Technologies

${rosters.map((r) => `- **${r.tag}**: ${r.items.join(", ")}`).join("\n")}

## Work

${live
  .map(
    (item) =>
      `- [${item.client}](${SITE_URL}/work/${item.slug}) (${item.year}) — ${item.summary}`,
  )
  .join("\n")}

## Journal

${notes
  .map(
    (post) =>
      `- [${post.title}](${SITE_URL}/journal/${post.slug}) (${formatDate(
        post.published,
      )}) — ${post.excerpt}`,
  )
  .join("\n")}

## Pages

- [Home](${SITE_URL}/)
- [Work](${SITE_URL}/work) — every project, live and linked
- [Services](${SITE_URL}/services) — what we build and who builds it
- [About](${SITE_URL}/about) — the studio, the name, and what we hold to
- [Journal](${SITE_URL}/journal) — notes from the studio

## Contact

- Email: hello@yenko.studio
- The studio replies within one working day, from a person.
`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
