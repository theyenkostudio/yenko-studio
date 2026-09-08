"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * The Sankofa mark as a scroll instrument.
 *
 * Fixed bottom-right on every route. The mark rotates a full turn across the
 * document while a hairline ring reads out the same progress, and both trail
 * the scroll by a spring so it feels like an instrument rather than a readout.
 * Clicking it returns to the top.
 *
 * Sits at z-90. `site-header` is z-100 and opens its own stacking context, so
 * the full-screen menu paints over this without any shared state.
 */

const RADIUS = 29;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** The site's dark bands — every one opts in with `data-band="ink"`. */
const INK_SECTIONS = '[data-band="ink"]';

export default function SankofaDial() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [overInk, setOverInk] = useState(true); // the hero is dark, so start inverted
  const inkSections = useRef<Element[]>([]);

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0005,
  });

  const rotate = useTransform(progress, [0, 1], [0, 360]);
  const dashoffset = useTransform(progress, [0, 1], [CIRCUMFERENCE, 0]);

  // PageTransition swaps the whole document on navigation, so the cached nodes
  // go stale. Re-collect on route change — and again once the incoming page has
  // actually mounted, since AnimatePresence `mode="wait"` unmounts first.
  useEffect(() => {
    const collect = () => {
      inkSections.current = Array.from(document.querySelectorAll(INK_SECTIONS));
    };
    collect();
    const settle = window.setTimeout(collect, 450);
    return () => window.clearTimeout(settle);
  }, [pathname]);

  // Invert over dark bands — test what sits under the dial's centre.
  useMotionValueEvent(scrollYProgress, "change", () => {
    const centreY = window.innerHeight - (window.innerWidth >= 768 ? 27 + 24 : 22 + 16);
    const next = inkSections.current.some((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= centreY && rect.bottom >= centreY;
    });
    setOverInk((current) => (current === next ? current : next));
  });

  return (
    // Hidden under reduced motion via CSS rather than an early return — a
    // conditional return would render on the server and vanish on hydration.
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll progress. Return to top."
      className={`motion-reduce:hidden fixed right-6 bottom-6 z-90 hidden h-[54px] w-[54px] cursor-pointer rounded-full transition-colors duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:block ${
        overInk ? "text-[#f2f1ec]" : "text-[#121210]"
      }`}
    >
      <svg viewBox="0 0 64 64" fill="none" className="h-full w-full">
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.18"
        />
        <motion.circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{ strokeDashoffset: dashoffset }}
          transform="rotate(-90 32 32)"
        />
        <motion.g style={{ rotate, transformOrigin: "32px 32px" }}>
          <g
            transform="translate(32 32) scale(0.58) translate(-32 -32)"
            stroke="currentColor"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M51 14a11 11 0 1 0-18 8.5C18 23 10 31.5 10 43c0 5 2 8 2 8 8-1 15-4 20-9 5 5 12 8 22 9-1-12-6-21-15-25" />
            <path d="M33 22.5 41 31l-8 8.5" />
          </g>
        </motion.g>
      </svg>
    </button>
  );
}
