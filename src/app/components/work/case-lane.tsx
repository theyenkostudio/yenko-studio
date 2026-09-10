import { ReactNode } from "react";

/**
 * The case study's three-lane grid: a hanging numeral, a label column, and
 * the content itself. Every row on the page sits on it — the challenge and
 * approach notes, the evidence stills, the section headers — which is what
 * makes the numerals and labels form unbroken vertical lanes down the page
 * rather than three separate alignments that nearly agree.
 *
 * Narrow screens keep the numeral beside its label on one line and drop the
 * content beneath both, so the numbering still reads as an index instead of
 * becoming a stray digit on its own row.
 */
export const LANE =
  "grid grid-cols-[40px_240px_minmax(0,1fr)] gap-x-10 max-[860px]:grid-cols-[auto_1fr] max-[860px]:gap-x-3.5";

/** Micro-label: uppercase, wide-tracked. Every label in the system uses it. */
export const LABEL = "text-[10px] font-semibold uppercase tracking-[0.12em]";

/** Content cell — spans both columns once the lane collapses. */
export const LANE_BODY = "max-[860px]:col-span-2 max-[860px]:mt-3.5";

export default function CaseLane({
  number,
  label,
  children,
  className = "",
}: {
  number?: string;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${LANE} ${className}`}>
      <div className={`${LABEL} pt-3 font-medium text-studio-dim max-[860px]:pt-0`}>
        {number}
      </div>
      <div className="pt-2.5 max-[860px]:pt-0">{label && <h3 className={LABEL}>{label}</h3>}</div>
      <div className={LANE_BODY}>{children}</div>
    </div>
  );
}
