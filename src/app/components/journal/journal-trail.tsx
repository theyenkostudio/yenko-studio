import Link from "next/link";

/**
 * Position, not history — the same reasoning as the case study breadcrumb.
 * A note is reachable from the index, a shared link or a search result, so a
 * "back" link is a guess about where the reader came from.
 *
 * The last crumb is the date rather than the title: a headline is far too long
 * to sit in a trail, and the heading directly beneath already says what this is.
 */
export default function JournalTrail({ date }: { date: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mt-[var(--header-h)] flex items-center gap-3.5 border-b border-studio-line px-[5vw] py-[22px] text-[10px] font-semibold uppercase tracking-[0.12em] max-[860px]:gap-2.5 max-[860px]:py-3"
    >
      <Link href="/" className="font-medium text-studio-muted transition-colors hover:text-studio-ink">
        Home
      </Link>
      <span aria-hidden="true" className="text-studio-line">/</span>
      <Link href="/journal" className="font-medium text-studio-muted transition-colors hover:text-studio-ink">
        Journal
      </Link>
      <span aria-hidden="true" className="text-studio-line">/</span>
      <span aria-current="page" className="tabular-nums">{date}</span>
    </nav>
  );
}
