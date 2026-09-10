"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** The studio easing, same curve MaskReveal and RollingLabel use. */
const EASE = "cubic-bezier(0.215, 0.61, 0.355, 1)";

/** How far in the band is closed before it opens. */
const CLOSED = "inset(0 34% 0 34%)";
const OPEN = "inset(0 0 0 0)";

/**
 * A box that opens from a centred band to its full width.
 *
 * Shared: the work index uses it on project covers, the about page on the
 * Sankofa mark. It lives in ui/ rather than work/ for that reason.
 *
 * Only the window moves. The image is laid out at its final size and never
 * scaled, so nothing about the client's screenshot is distorted or re-cropped
 * while it travels — the reveal changes how much of the picture you can see,
 * not the picture.
 *
 * It renders OPEN and is closed again in a layout effect before paint, rather
 * than rendering closed and waiting to be opened. That ordering matters: with
 * no JavaScript, under reduced motion, or if the observer never fires, the
 * cover is simply visible. A reveal that fails should cost the animation, not
 * the evidence.
 */
export default function CoverReveal({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const host = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [open, setOpen] = useState(true);

  useLayoutEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Only arm what is still below the fold. Closing something the reader can
    // already see would animate away a cover they are looking at.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setArmed(true);
    setOpen(false);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-12% 0px" },
    );
    observer.observe(el);

    // Late layout shifts can leave the observer having already decided about an
    // element that is plainly on screen. Re-check once the page has settled.
    const settle = () => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        setOpen(true);
        observer.disconnect();
      }
    };
    window.addEventListener("load", settle);
    const timer = window.setTimeout(settle, 1400);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", settle);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={host}
      className={className}
      style={{
        clipPath: open ? OPEN : CLOSED,
        transition: armed ? `clip-path 1.15s ${EASE}` : undefined,
      }}
    >
      {children}
    </div>
  );
}
