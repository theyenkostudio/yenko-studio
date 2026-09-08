"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

const EASE = [0.215, 0.61, 0.355, 1] as const;

/**
 * Hand-authored lines rising out of a clipping mask.
 *
 * Geometry notes, because this is easy to get subtly wrong:
 *  - Each line gets its OWN overflow-hidden wrapper. One mask around the
 *    whole heading does not work.
 *  - The wrapper is padded on BOTH sides (not just the bottom) so tight
 *    leading cannot shave ascenders, and the padding is cancelled by an
 *    equal negative margin so it costs no layout space.
 *  - Travel is 140%, not 105%: the mask is taller than the line box by the
 *    padding, so the text has further to go before it fully clears. The
 *    extra distance happens behind the mask and is never seen.
 *  - Lines are authored by hand, never auto-split — that is what keeps the
 *    line breaks landing where they should.
 */
export default function MaskReveal({
  lines,
  as: Tag = "h2",
  className,
  immediate = false,
  delay = 0,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Play on mount instead of waiting for the viewport (hero headings). */
  immediate?: boolean;
  delay?: number;
}) {
  return (
    <Tag className={className}>
      {lines.map((text, index) => (
        <span
          key={index}
          className="block overflow-hidden"
          style={{ paddingBlock: "0.14em", marginBlock: "-0.14em" }}
        >
          <motion.span
            className="block"
            initial={{ y: "140%" }}
            {...(immediate
              ? { animate: { y: 0 } }
              : {
                  whileInView: { y: 0 },
                  viewport: { once: true, margin: "-80px" },
                })}
            transition={{
              duration: 1.05,
              delay: delay + index * 0.12,
              ease: EASE,
            }}
          >
            {text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
