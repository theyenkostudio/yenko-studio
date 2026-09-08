import type { ReactNode } from "react";

const ROLL =
  "transition-transform duration-[500ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]";

/**
 * Text that rolls up out of a clipping box while an identical copy arrives
 * from below — the studio's mask-and-travel gesture at label scale.
 *
 * Requires an ancestor carrying `group`, since the roll is driven by that
 * element's hover rather than the label's own.
 *
 * Two things are load-bearing:
 *  - The duplicate is aria-hidden. It is the same word visually, and without
 *    this a screen reader announces every link twice.
 *  - Roll distance is the line box, so the inherited line-height must be
 *    roomy enough that `overflow-hidden` does not shave ascenders or
 *    descenders. Anything under about 1.15 will clip.
 */
export default function RollingLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <span
        className={`block ${ROLL} group-hover:-translate-y-full motion-reduce:transform-none motion-reduce:transition-none`}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`absolute inset-0 block translate-y-full ${ROLL} group-hover:translate-y-0 motion-reduce:hidden`}
      >
        {children}
      </span>
    </span>
  );
}
