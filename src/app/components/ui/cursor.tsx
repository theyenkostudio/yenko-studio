"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a near-instant dot inside a ring that trails on a lerp and
 * swells over anything interactive. `mix-blend-mode: difference` inverts it
 * against whatever is behind, so one cursor works on ink, paper and stone
 * without being told which band it is over.
 *
 * Hiding the native cursor is the dangerous part of this pattern, so it is
 * done defensively:
 *
 *  - The `cursor: none` rule is attached by THIS component at runtime, never
 *    in static CSS. If the bundle fails, errors or never boots, the native
 *    cursor is simply still there — the page degrades to normal rather than
 *    to no pointer at all.
 *  - Pointer must be fine. Touch and stylus keep the platform behaviour.
 *  - Reduced motion opts out entirely: the whole point here is the trailing,
 *    and a cursor that cannot trail is just a worse native cursor.
 *  - Inside an open <dialog> the native cursor comes back. A modal renders in
 *    the top layer, above every z-index, so a fixed element cannot be drawn
 *    over it — without this the dialog would have no visible pointer at all.
 *  - Over text fields the native I-beam comes back, because it says something
 *    a ring does not.
 *  - Over the work rows the ring is suppressed: the cover preview already
 *    trails the pointer there, and two followers at different rates read as
 *    lag rather than as craft.
 */

const HOT = 'a,button,[role="button"],summary,label,[data-cursor="hot"]';
const TEXT = 'input,textarea,select,[contenteditable="true"]';
const QUIET = '[data-cursor="quiet"]';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    const root = document.documentElement;
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    root.classList.add("has-cursor");

    let tx = 0, ty = 0, dx = 0, dy = 0, rx = 0, ry = 0;
    let seen = false;
    let frame = 0;

    const draw = () => {
      dx += (tx - dx) * 0.55;
      dy += (ty - dy) * 0.55;
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      dotEl.style.transform = `translate3d(${dx}px,${dy}px,0)`;
      ringEl.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!seen) {
        // Jump to the pointer on first sight, so it does not fly in from 0,0.
        seen = true;
        dx = rx = tx;
        dy = ry = ty;
        root.classList.add("has-cursor-seen");
      }
    };

    const onOver = (event: MouseEvent) => {
      const el = event.target as Element | null;
      if (!el || typeof el.closest !== "function") return;
      // A modal sits in the top layer, above anything we can draw.
      root.classList.toggle("has-cursor-off", !!el.closest("dialog[open]"));
      root.classList.toggle("has-cursor-text", !!el.closest(TEXT));
      root.classList.toggle("has-cursor-quiet", !!el.closest(QUIET));
      root.classList.toggle("has-cursor-hot", !!el.closest(HOT));
    };

    // Leaving the window entirely should take the cursor with it.
    const onLeave = () => root.classList.add("has-cursor-off");
    const onEnter = () => root.classList.remove("has-cursor-off");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      root.classList.remove(
        "has-cursor", "has-cursor-seen", "has-cursor-off",
        "has-cursor-text", "has-cursor-quiet", "has-cursor-hot",
      );
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden="true" className="yk-cursor yk-cursor--ring" />
      <div ref={dot} aria-hidden="true" className="yk-cursor yk-cursor--dot" />
    </>
  );
}
