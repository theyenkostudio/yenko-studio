import Link from "next/link";
import { notFound } from "next/navigation";
import { journalPosts, formatDate } from "../../data/journal";
import { pageMeta } from "../../data/seo";
import { SITE_URL } from "../../data/links";
import Contact from "../../components/home/contact";
import JournalTrail from "../../components/journal/journal-trail";
import JournalRail from "../../components/journal/journal-rail";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

/**
 * A paragraph can carry a markdown-style link — `[label](/journal/slug)` —
 * when a note refers to another one by name. Keeping the body data as plain
 * strings (rather than a richer node tree) means every existing post stays
 * valid; only the paragraphs that need a link opt into the syntax.
 */
function renderWithLinks(text: string, keyPrefix: string) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = linkPattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [whole, label, href] = match;
    nodes.push(
      <Link
        key={`${keyPrefix}-${i++}`}
        href={href}
        className="underline decoration-dashed decoration-1 decoration-studio-ink underline-offset-4 transition-colors hover:text-studio-dim hover:decoration-studio-dim"
      >
        {label}
      </Link>,
    );
    lastIndex = match.index + whole.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    type: "article",
    publishedTime: post.published,
  });
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <div className="bg-studio-paper text-studio-ink">
      <JournalTrail date={formatDate(post.published)} />

      {/* Article schema so a note can qualify for rich results in its own
          right, rather than only inheriting the studio's organisation markup. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.published,
            author: { "@type": "Organization", name: "Yenko Studio" },
            publisher: { "@type": "Organization", name: "Yenko Studio" },
            mainEntityOfPage: `${SITE_URL}/journal/${post.slug}`,
          }),
        }}
      />

      <article className="px-[5vw] pt-[clamp(3rem,7vw,5.5rem)]">
        {/* Date and reading time live in the rail, which keeps them on screen
            for the whole read. Repeating them here would state the same two
            facts twice within one viewport. */}
        <h1 className="max-w-[24ch] text-[clamp(2rem,5.2vw,4.25rem)] font-medium leading-none tracking-[-0.055em] text-balance">
          {post.title}
        </h1>

        {/* The excerpt is promoted to a standfirst rather than repeated in the
            body, so the argument lands before the first paragraph. */}
        <p className="mt-8 max-w-[46ch] text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug tracking-[-0.02em]">
          {post.excerpt}
        </p>

        <div className="mt-[clamp(2.5rem,5vw,3.5rem)] border-t border-studio-ink" />

        {/*
          The reading measure stays left-aligned to the page grid, and the rail
          is pushed to the far edge rather than set beside the text — the empty
          middle is what keeps the margin reading as margin instead of as a
          second column crowding the prose.

          Body sits a shade off full ink: long-form at maximum contrast is
          tiring, and keeping the display type pure ink preserves the hierarchy.
        */}
        <div className="mt-[clamp(2.5rem,5vw,3.5rem)] flex justify-between gap-[clamp(2rem,8vw,8rem)] pb-[clamp(3rem,7vw,5rem)] max-[1100px]:flex-col max-[1100px]:gap-12">
          <div className="max-w-[68ch] flex-1">
            {post.body.map((block, i) =>
              typeof block === "string" ? (
                <p
                  key={i}
                  className="text-[clamp(1.0625rem,1.35vw,1.1875rem)] leading-[1.75] text-[#2b2a27] [&:not(:first-child)]:mt-6"
                >
                  {renderWithLinks(block, `p-${i}`)}
                </p>
              ) : (
                <h2
                  key={i}
                  className="mt-12 mb-4 text-[clamp(1.25rem,2vw,1.625rem)] font-medium leading-tight tracking-[-0.04em] text-studio-ink first:mt-0"
                >
                  {block.heading}
                </h2>
              ),
            )}
          </div>

          <JournalRail post={post} />
        </div>
      </article>

      <Contact />
    </div>
  );
}
