import Link from "next/link";
import { formatDate, readingTime, type JournalPost } from "../../data/journal";
import RollingLabel from "../ui/rolling-label";

/**
 * The newest note, given the page rather than a card in a grid.
 *
 * A short archive rendered as a grid reads as three-quarters empty. Leading
 * with the latest note at display scale makes a single post look like an
 * editorial decision instead of a list that failed to fill, and it keeps
 * working as the archive grows — the lead stays the lead.
 */
export default function JournalLead({ post }: { post: JournalPost }) {
  return (
    <article className="border-b border-studio-line">
      <Link
        href={`/journal/${post.slug}`}
        className="group/row block px-[5vw] py-[clamp(3rem,7vw,6rem)]"
      >
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-dim">
          <span className="tabular-nums">{formatDate(post.published)}</span>
          <span>{readingTime(post)} min read</span>
          <span>Latest</span>
        </p>

        <h2 className="mt-7 max-w-[20ch] text-[clamp(2rem,5.6vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.055em] text-balance">
          {post.title}
        </h2>

        <p className="mt-7 max-w-[58ch] text-[clamp(1rem,1.4vw,1.1875rem)] leading-relaxed text-studio-muted">
          {post.excerpt}
        </p>

        <span className="group mt-8 flex w-fit items-center gap-2.5 border-b border-studio-ink pb-2 text-[11px] font-semibold uppercase tracking-[0.12em]">
          <RollingLabel className="leading-[1.25]">Read the note</RollingLabel>
          <svg
            width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" aria-hidden="true"
            className="transition-transform duration-[400ms] ease-out group-hover:translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </Link>
    </article>
  );
}
