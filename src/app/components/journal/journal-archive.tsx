import Link from "next/link";
import { formatDate, readingTime, type JournalPost } from "../../data/journal";

/**
 * Everything behind the lead. Renders nothing at all when there is only one
 * note — an "Earlier" heading over an empty rule would announce the archive's
 * shortness rather than the writing.
 */
export default function JournalArchive({ posts }: { posts: JournalPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="px-[5vw] pt-[clamp(3rem,6vw,5rem)] pb-[clamp(4rem,8vw,6rem)]">
      <div className="flex items-baseline justify-between gap-4 pb-7">
        <h2 className="text-[clamp(1.25rem,2vw,1.5rem)] font-medium tracking-[-0.04em]">
          Earlier
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] tabular-nums text-studio-muted">
          {String(posts.length).padStart(2, "0")}{" "}
          {posts.length === 1 ? "note" : "notes"}
        </span>
      </div>

      <div className="border-t border-studio-ink">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className="group/row grid grid-cols-[150px_minmax(0,1fr)_auto] items-baseline gap-x-10 gap-y-2 border-b border-studio-line py-5 transition-[padding-left] duration-[400ms] ease-out hover:pl-4 max-[860px]:grid-cols-[1fr_auto]"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] tabular-nums text-studio-dim max-[860px]:col-span-full">
              {formatDate(post.published)}
            </span>
            <span className="text-[clamp(1.05rem,1.7vw,1.3rem)] font-medium tracking-[-0.035em]">
              {post.title}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-muted">
              {readingTime(post)} min
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
