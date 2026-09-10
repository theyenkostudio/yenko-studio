import Link from "next/link";
import { formatDate, readingTime, type JournalPost } from "../../data/journal";
import { SITE_URL } from "../../data/links";
import CopyLink from "./copy-link";

/**
 * The note's facts and its controls, held in the margin beside the reading
 * column.
 *
 * A 68ch measure is set by legibility rather than by screen width, so on a wide
 * display roughly half the page is unused. This fills it with the things a
 * reader of a journal actually reaches for — and every value comes from the
 * post data, so nothing here has to be authored per post or can rot.
 *
 * Sharing to WhatsApp rather than to a social network is not a novelty: it is
 * the channel this studio actually runs on, which is what the note is about.
 */
export default function JournalRail({ post }: { post: JournalPost }) {
  const url = `${SITE_URL}/journal/${post.slug}`;
  const share = `https://wa.me/?text=${encodeURIComponent(`${post.title} — ${url}`)}`;

  return (
    // Sticky sits below the progressive blur, not just below the header. The
    // blur overlay is 150px tall and paints over page content while scrolling,
    // so a rail parked at header height would read through it out of focus.
    <aside className="sticky top-[calc(var(--header-h)+6rem)] w-[22ch] flex-shrink-0 self-start max-[1100px]:static max-[1100px]:w-full">
      <dl className="grid gap-4 border-t border-studio-ink pt-4">
        {[
          { term: "Published", detail: formatDate(post.published), nums: true },
          { term: "Reading", detail: `${readingTime(post)} min`, nums: true },
          { term: "Written by", detail: "Yenko Studio" },
        ].map(({ term, detail, nums }) => (
          <div key={term}>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-dim">
              {term}
            </dt>
            <dd className={`mt-1.5 text-[15px] ${nums ? "tabular-nums" : ""}`}>{detail}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-2.5 border-t border-studio-line pt-4 text-[10px] font-semibold uppercase tracking-[0.12em]">
        <Link href="/journal" className="w-fit text-studio-muted transition-colors hover:text-studio-ink">
          ← All notes
        </Link>
        <a
          href={share}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-studio-muted transition-colors hover:text-studio-ink"
        >
          Share on WhatsApp
        </a>
        <CopyLink />
      </div>
    </aside>
  );
}
