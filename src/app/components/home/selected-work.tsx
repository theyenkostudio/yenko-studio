"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { workItems } from "../../data/work";
import SectionLabel from "./section-label";

const ROW =
  "grid grid-cols-[56px_1fr_minmax(180px,0.5fr)_90px] items-baseline gap-x-8 gap-y-2 border-b border-studio-line py-[clamp(1.4rem,2.8vw,2.3rem)] max-[860px]:grid-cols-[34px_1fr]";
const META =
  "text-[10px] uppercase tracking-[0.09em] text-studio-muted max-[860px]:col-start-2";

/**
 * Selected work as an index rather than a grid — a handful of projects read
 * as a curated list where they would read as a half-empty grid.
 *
 * Only `status: "live"` items appear. Flipping a coming-soon entry to live in
 * work.ts is all it takes for it to show up here, numbered in sequence.
 *
 * Hovering a row floats its cover alongside the cursor. That is a desktop
 * enhancement only: on touch, or under reduced motion, each row shows its
 * cover inline instead, so the screenshots are never unreachable.
 *
 * One destination per row, deliberately: the whole row links to the case
 * study. A second anchor here would have to sit outside the row link to be
 * valid markup, and it crowded a row that reads better clean.
 */
export default function SelectedWork() {
  const live = workItems.filter((item) => item.status === "live");
  const [active, setActive] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);

  const preview = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const tracking = useRef(false);

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanHover(pointer.matches && !motion.matches);
    update();
    pointer.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      pointer.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  const render = useCallback(() => {
    // Lerp so the panel trails the cursor rather than sticking to it.
    current.current.x += (target.current.x - current.current.x) * 0.14;
    current.current.y += (target.current.y - current.current.y) * 0.14;

    if (preview.current) {
      preview.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
    }

    const settled =
      Math.abs(target.current.x - current.current.x) < 0.3 &&
      Math.abs(target.current.y - current.current.y) < 0.3;

    frame.current = settled && !tracking.current ? null : requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    if (!canHover) return;
    const onMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      if (tracking.current && frame.current === null) {
        frame.current = requestAnimationFrame(render);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [canHover, render]);

  const enter = (slug: string) => {
    if (!canHover) return;
    // Jump straight to the cursor the first time so it does not fly in from 0,0.
    if (current.current.x === 0 && current.current.y === 0) {
      current.current = { ...target.current };
    }
    tracking.current = true;
    setActive(slug);
    if (frame.current === null) frame.current = requestAnimationFrame(render);
  };

  const leave = () => {
    tracking.current = false;
    setActive(null);
  };

  return (
    <section
      id="work"
      className="bg-studio-stone px-[5vw] py-[clamp(5.5rem,10vw,9rem)] text-studio-ink"
    >
      <SectionLabel number="02" label="Selected Work" className="text-studio-muted" />

      <div className="mt-[clamp(3rem,6vw,5rem)] border-t border-studio-ink">
        {live.map((item, index) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className={`${ROW} group transition-[padding-left] duration-[400ms] ease-out hover:pl-[1.1rem]`}
            onMouseEnter={() => enter(item.slug)}
            onMouseLeave={leave}
          >
            <span className={META}>{String(index + 1).padStart(2, "0")}</span>

            <h3 className="text-[clamp(1.6rem,3.4vw,3.2rem)] tracking-[-0.055em] [font-variation-settings:'wght'_450] transition-[font-variation-settings] duration-[400ms] ease-out group-hover:[font-variation-settings:'wght'_700]">
              {item.client}
            </h3>

            <span className={META}>{item.services.join(" / ")}</span>

            <span className={`${META} text-right max-[860px]:text-left`}>
              {item.year}
            </span>

            {/* Touch and reduced-motion fallback — the cover, inline. */}
            <div className="col-start-2 col-end-[-1] mt-4 hidden aspect-[1.6] w-full overflow-hidden bg-studio-ink max-[860px]:block">
              <Image
                src={item.thumbnail}
                alt={`${item.client} website`}
                width={1200}
                height={750}
                sizes="90vw"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Floating cover. Every live cover is mounted and cross-faded, so
          nothing has to load at the moment of hover. The panel is inert —
          it trails the cursor, so anything inside it is a label, not a
          control; the real actions live in the row. */}
      {canHover && (
        <div
          ref={preview}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 aspect-[1.1] w-[clamp(300px,27vw,440px)]"
        >
          {live.map((item) => (
            <div
              key={item.slug}
              className={`absolute inset-0 flex flex-col bg-studio-ink transition-[opacity,transform] duration-[350ms] ease-out ${
                active === item.slug
                  ? "scale-100 opacity-100"
                  : "scale-[0.94] opacity-0"
              }`}
            >
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt=""
                  fill
                  sizes="440px"
                  className="object-cover object-top"
                />
              </div>
              {/* Paper bar against the ink panel, so it reads as an action
                  even though the panel is inert — the row is what's clickable. */}
              <div className="flex items-center justify-between gap-4 bg-studio-paper px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-studio-ink">
                <span>View case study</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
