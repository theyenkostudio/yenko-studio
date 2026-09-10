import Link from "next/link";
import { LABEL } from "./case-lane";

/**
 * The exit that isn't "back". A reader who finishes a case study is more
 * likely to want another one than to want the index, so the page offers a
 * project by name — the index is still one click away in the trail at the top.
 *
 * It points forward wherever there is a forward to point, and falls back to
 * the previous project at the end of the list. Offering "next" only would
 * leave the last case study — the one a reader is most likely to finish on —
 * as the single page in the set with no onward path at all.
 */
export default function ProjectPager({
  slug,
  client,
  direction,
}: {
  slug: string;
  client: string;
  direction: "next" | "prev";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/work/${slug}`}
      className={`group flex items-end justify-between gap-10 border-b border-studio-line px-[5vw] pt-24 pb-30 transition-[padding] duration-[400ms] ease-out max-[860px]:flex-col max-[860px]:items-start max-[860px]:gap-4 max-[860px]:py-12 max-[860px]:pl-[5vw] max-[860px]:hover:pl-[5vw] ${
        isNext
          ? "pl-[calc(5vw+80px)] hover:pl-[calc(5vw+96px)]"
          : "pl-[calc(5vw+80px)] hover:pl-[calc(5vw+64px)]"
      }`}
    >
      <span className="flex flex-col gap-5 max-[860px]:gap-4">
        <span className={`${LABEL} font-medium text-studio-dim`}>
          {isNext ? "Next project" : "Previous project"}
        </span>
        <span className="text-[clamp(2.25rem,4.4vw,4rem)] font-medium leading-none tracking-[-0.055em]">
          {client}
        </span>
      </span>
      <span className={`${LABEL} flex flex-shrink-0 items-center gap-3 pb-3 max-[860px]:pb-0`}>
        View case study
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
          className={`transition-transform duration-[400ms] ease-out ${
            isNext ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"
          }`}
        >
          {isNext ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
        </svg>
      </span>
    </Link>
  );
}
