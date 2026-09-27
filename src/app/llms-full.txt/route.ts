import { SITE_URL } from "../data/links";
import { journalPosts, formatDate, type Block } from "../data/journal";

/**
 * Full-text companion to /llms.txt. It is generated from the same Journal data
 * as the public pages, which makes new and edited articles available to language
 * models without maintaining a second copy of the writing.
 */
export const dynamic = "force-static";

function renderBlock(block: Block) {
  return typeof block === "string" ? block : `### ${block.heading}`;
}

function build() {
  const notes = [...journalPosts].sort(
    (a, b) => Date.parse(b.published) - Date.parse(a.published),
  );

  return `# Yenko Studio Journal — full content

> Complete text of the Yenko Studio Journal. The concise site index is available at ${SITE_URL}/llms.txt.

${notes
  .map(
    (post) => `## ${post.title}

- Published: ${formatDate(post.published)}
- Canonical URL: ${SITE_URL}/journal/${post.slug}

${post.excerpt}

${post.body.map(renderBlock).join("\n\n")}`,
  )
  .join("\n\n---\n\n")}
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
