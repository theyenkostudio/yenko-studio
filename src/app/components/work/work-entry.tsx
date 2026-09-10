import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "../../data/work";
import RollingLabel from "../ui/rolling-label";
import CoverReveal from "../ui/cover-reveal";

/**
 * One published project on the work index.
 *
 * The homepage's Selected Work is a curated teaser — compact rows whose covers
 * appear on hover. This page is the record, so the covers are simply there.
 * Repeating the hover-index pattern would make the two pages read as the same
 * page twice.
 *
 * Sides alternate. With a short list, two entries stacked the same way read as
 * the first row of a grid that never arrives; alternating reads as a sequence
 * that is complete at whatever length it happens to be.
 */
export default function WorkEntry({
  item,
  index,
}: {
  item: WorkItem;
  index: number;
}) {
  const flip = index % 2 === 1;

  return (
    <article className="border-b border-studio-line">
      <Link
        href={`/work/${item.slug}`}
        className="group/row flex items-start gap-10 px-[5vw] py-[clamp(3rem,7vw,6rem)] max-[860px]:flex-wrap max-[860px]:gap-5"
      >
        <span className="w-10 flex-shrink-0 pt-2 text-[10px] font-medium tracking-[0.12em] tabular-nums text-studio-dim max-[860px]:w-auto max-[860px]:pt-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        <CoverReveal
          className={`aspect-[31/20] flex-[0_0_min(700px,52%)] overflow-hidden bg-studio-stone max-[860px]:order-1 max-[860px]:flex-[1_1_100%] ${
            flip ? "order-3" : ""
          }`}
        >
          <Image
            src={item.thumbnail}
            alt={`${item.client} website`}
            width={1400}
            height={903}
            sizes="(max-width: 860px) 90vw, 52vw"
            className="h-full w-full object-cover object-top transition-transform duration-[650ms] ease-out group-hover/row:scale-[1.035]"
          />
        </CoverReveal>

        <div className="flex min-w-0 flex-1 flex-col gap-5 pt-1 max-[860px]:order-2 max-[860px]:flex-[1_1_100%]">
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-dim">
            <span>{item.year}</span>
            <span>{item.services.join(" / ")}</span>
          </p>

          <h2 className="text-[clamp(1.9rem,3.6vw,3.25rem)] font-medium leading-none tracking-[-0.05em]">
            {item.client}
          </h2>

          <p className="max-w-[50ch] text-[clamp(0.95rem,1.15vw,1.0625rem)] leading-relaxed text-studio-muted">
            {item.summary}
          </p>

          {/*
            Carries the plain `group` so the roll answers to this label alone.
            The row above is a *named* group, which deliberately does not
            satisfy RollingLabel's `group-hover:` — otherwise the label would
            roll whenever the cursor was anywhere in the entry, including out
            over the cover, and read as firing by itself.
          */}
          <span className="group mt-2 flex w-fit items-center gap-2.5 border-b border-studio-ink pb-2 text-[11px] font-semibold uppercase tracking-[0.12em]">
            <RollingLabel className="leading-[1.25]">Read the case study</RollingLabel>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              className="transition-transform duration-[400ms] ease-out group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
