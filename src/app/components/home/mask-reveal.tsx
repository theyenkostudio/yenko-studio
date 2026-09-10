"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ElementType, type Ref } from "react";

const EASE = [0.215, 0.61, 0.355, 1] as const;

/** Matches the observer's rootMargin, so both tests agree on "on screen". */
const THRESHOLD = 80;

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
 *
 * Visibility is deliberately not left to `whileInView` alone. A line parked
 * at 140% inside its own mask is not merely un-animated, it is invisible, so
 * a reveal that never fires does not degrade — it deletes the heading. The
 * gate below therefore has three ways to open: a synchronous check for an
 * element already on screen at mount, the observer for everything below the
 * fold, and a re-check after load in case a late layout shift (fonts, images,
 * a pinned section changing the page height) moved the element after the
 * observer had already made up its mind. Reduced motion skips straight to
 * shown, since the text matters and the travel does not.
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
  const host = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(immediate);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (immediate) return;

    const el = host.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      setShown(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const onScreen = () => {
      const box = el.getBoundingClientRect();
      return box.top < window.innerHeight - THRESHOLD && box.bottom > 0;
    };

    if (onScreen()) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: `-${THRESHOLD}px 0px` },
    );
    observer.observe(el);

    const settle = () => {
      if (onScreen()) {
        setShown(true);
        observer.disconnect();
      }
    };
    window.addEventListener("load", settle);
    const timer = window.setTimeout(settle, 1200);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", settle);
      window.clearTimeout(timer);
    };
  }, [immediate]);

  return (
    <Tag ref={host as Ref<HTMLElement>} className={className}>
      {lines.map((text, index) => (
        <span
          key={index}
          className="block overflow-hidden"
          style={{ paddingBlock: "0.14em", marginBlock: "-0.14em" }}
        >
          <motion.span
            className="block"
            initial={{ y: "140%" }}
            animate={{ y: shown ? 0 : "140%" }}
            transition={
              instant
                ? { duration: 0 }
                : { duration: 1.05, delay: delay + index * 0.12, ease: EASE }
            }
          >
            {text}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
