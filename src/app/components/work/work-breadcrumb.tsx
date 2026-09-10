import Link from "next/link";
import { LABEL } from "./case-lane";

/**
 * Position, not history.
 *
 * A case study is reachable from the homepage index and from /work alike, so
 * a single "back" link is a guess about where the reader came from and is
 * wrong roughly half the time. This states where the page *is* instead —
 * derived from the URL, so it holds for a shared link or a search result too
 * — and exposes both ancestors as separate destinations rather than picking
 * one on the reader's behalf.
 *
 * The right-hand pager is the other half: it moves through the index without
 * making anyone climb out to it and back in. Its numbering is the same
 * numbering the Selected Work rows use, so the page reads as one of those
 * rows opened up.
 */
export default function WorkBreadcrumb({
  client,
  index,
  total,
  prevSlug,
  nextSlug,
}: {
  client: string;
  index: number;
  total: number;
  prevSlug?: string;
  nextSlug?: string;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <nav
      aria-label="Breadcrumb"
      /* Clears the fixed header by exactly its own height, as margin rather
         than padding — padding would push the crumbs off-centre inside the bar
         and drag the rule at the bottom down with them. */
      className="mt-[var(--header-h)] flex items-center justify-between gap-6 border-b border-studio-line px-[5vw] py-[22px] max-[860px]:py-3"
    >
      <ol className={`${LABEL} flex items-center gap-3.5 font-medium max-[860px]:gap-2.5`}>
        <li>
          <Link href="/" className="text-studio-muted transition-colors hover:text-studio-ink">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-studio-line">
          /
        </li>
        <li>
          <Link href="/work" className="text-studio-muted transition-colors hover:text-studio-ink">
            Work
          </Link>
        </li>
        {/* The current page is the one crumb that isn't a destination, so it
            is also the one worth dropping when space runs out — the heading
            directly beneath already says where you are. */}
        <li aria-hidden="true" className="text-studio-line max-[860px]:hidden">
          /
        </li>
        <li aria-current="page" className="font-semibold max-[860px]:hidden">
          {client}
        </li>
      </ol>

      <div className="flex flex-shrink-0 items-center gap-5 max-[860px]:gap-3">
        <p className={`${LABEL} font-medium text-studio-muted`}>
          {pad(index)} <span className="text-studio-line">/</span> {pad(total)}
        </p>
        <span aria-hidden="true" className="h-3.5 w-px bg-studio-line max-[860px]:hidden" />
        <PagerLink slug={prevSlug} direction="prev" />
        <PagerLink slug={nextSlug} direction="next" />
      </div>
    </nav>
  );
}

/**
 * At the ends of the index one of these has nowhere to go. It renders as a
 * disabled box rather than disappearing, so the pair doesn't reflow and the
 * reader can see they've reached the edge.
 */
function PagerLink({ slug, direction }: { slug?: string; direction: "prev" | "next" }) {
  const isNext = direction === "next";
  const label = isNext ? "Next project" : "Previous project";
  const box =
    "flex size-7 flex-shrink-0 items-center justify-center border transition-colors max-[860px]:size-10";
  const icon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {isNext ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
    </svg>
  );

  if (!slug) {
    return (
      <span
        aria-hidden="true"
        className={`${box} border-studio-line text-studio-line`}
        title={`No ${isNext ? "next" : "previous"} project`}
      >
        {icon}
      </span>
    );
  }

  return (
    <Link
      href={`/work/${slug}`}
      aria-label={label}
      className={`${box} ${
        isNext
          ? "border-studio-ink bg-studio-ink text-studio-paper hover:bg-transparent hover:text-studio-ink"
          : "border-studio-ink text-studio-ink hover:bg-studio-ink hover:text-studio-paper"
      }`}
    >
      {icon}
    </Link>
  );
}
