"use client";

import { useEffect, useRef, useState } from "react";
import Sankofa from "../ui/sankofa";

/**
 * The Sankofa preloader.
 *
 * The bird delivers the wordmark: each letter launches from its beak, arcs
 * down, overshoots, and is set onto the line slightly off true — so the
 * finished word reads as hand-set rather than typed. Sankofa is "go back and
 * get it"; Yenko is "let's go". The bird fetching the name is both.
 *
 * Deliberately once per session. It is an arrival, not a transition — internal
 * navigation has the menu's own wipe, and paying this again on the way to
 * /services would be a tax rather than a curtain.
 *
 * Three things keep it honest:
 *
 *  - It OVERLAYS the page, never replaces it. The server-rendered HTML is the
 *    real page; this sits on top. (The loader removed from this project in
 *    9d09bb4 returned its children only after a timer, so the SSR payload was
 *    the loader alone — no headline for search engines, and the whole app
 *    mounting in one commit when it finally released.)
 *  - It is skippable. Any click or key dismisses it immediately.
 *  - It waits on document.fonts.ready before the letters move, so they never
 *    animate in the fallback face and re-measure mid-flight — but with a
 *    ceiling, so a stalled font cannot extend the wait.
 *
 * The flash of it on a repeat visit is prevented by an inline script in the
 * document head, not by this component: by the time React hydrates, the
 * server HTML has already painted.
 */

const WORD = "YENKO STUDIO";

/** ms between letters. Everything else is derived, so this is the one dial. */
const PACE = 215;
/** How far off true each letter sets. 1 = the full hand; this is half of it. */
const LEAN = 0.5;

const TRAVEL = Math.round(PACE * 5.2);
const LEAD_IN = 260;
const EASE = "cubic-bezier(.215,.61,.355,1)";
const FONT_CEILING = 1200;

/** The beak, in the mark's 64-unit box: the neck arcs up and over, and the
 *  beak reaches back toward the tail. Measured off the rendered silhouette. */
const BEAK = { x: 50 / 64, y: 14 / 64 };

/** Fixed, not random. A hand-set word is consistently off true; re-rolling
 *  the angles each load would read as a glitch rather than as a hand. */
const SET = [
  { rot: -2.6, y: 2, x: -1 },
  { rot: 1.9, y: -3, x: 2 },
  { rot: -1.1, y: 4, x: -2 },
  { rot: 2.8, y: 0, x: 1 },
  { rot: -2.1, y: 3, x: -1 },
  { rot: 1.4, y: -2, x: 2 },
  { rot: -2.9, y: 1, x: -2 },
  { rot: 2.2, y: 3, x: 1 },
  { rot: -1.6, y: -1, x: -1 },
  { rot: 2.5, y: 2, x: 2 },
  { rot: -2.3, y: -2, x: -2 },
];

export const LOADER_KEY = "yenko-arrived";

export default function Preloader() {
  const host = useRef<HTMLDivElement>(null);
  const bird = useRef<HTMLSpanElement>(null);
  const rule = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    // The head script already hid it for repeat visits and reduced motion;
    // this is the same decision, for the case where JS reached here anyway.
    let seen = false;
    try {
      seen = sessionStorage.getItem(LOADER_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }

    const node = host.current;
    if (!node) return;

    root.classList.add("yk-loading");

    const letters = Array.from(
      node.querySelectorAll<HTMLElement>("[data-letter]"),
    );
    let running: Animation[] = [];
    const timers: number[] = [];
    let finished = false;

    const finish = (fast = false) => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      try {
        sessionStorage.setItem(LOADER_KEY, "1");
      } catch {
        /* private mode — it simply plays again next time */
      }
      const wipe = node.animate(
        [{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(0 0 100% 0)" }],
        { duration: fast ? 420 : 650, easing: "cubic-bezier(.76,0,.24,1)", fill: "both" },
      );
      wipe.onfinish = () => {
        root.classList.remove("yk-loading");
        setGone(true);
      };
    };

    const start = () => {
      if (finished) return;
      const box = bird.current?.getBoundingClientRect();
      if (!box) return finish(true);
      const bx = box.left + box.width * BEAK.x;
      const by = box.top + box.height * BEAK.y;

      letters.forEach((el, i) => {
        const s = SET[i % SET.length];
        const r = el.getBoundingClientRect();
        const dx = bx - (r.left + r.width / 2);
        const dy = by - (r.top + r.height / 2);
        const rot = s.rot * LEAN;
        const sx = s.x * LEAN;
        const sy = s.y * LEAN;

        running.push(
          el.animate(
            [
              { transform: `translate(${dx}px,${dy}px) scale(.18) rotate(-24deg)`, opacity: 0, offset: 0 },
              { opacity: 1, offset: 0.14 },
              // held high and off the straight line — this is what makes the arc
              { transform: `translate(${dx * 0.34}px,${dy * 0.3 - 26}px) scale(.78) rotate(${rot * 2.4}deg)`, opacity: 1, offset: 0.6 },
              // a little past the mark, before it settles
              { transform: `translate(${sx}px,${sy - 7}px) scale(1.04) rotate(${rot * 1.5}deg)`, opacity: 1, offset: 0.86 },
              { transform: `translate(${sx}px,${sy}px) scale(1) rotate(${rot}deg)`, opacity: 1, offset: 1 },
            ],
            { duration: TRAVEL, delay: LEAD_IN + i * PACE, easing: EASE, fill: "both" },
          ),
        );

        if (bird.current) {
          running.push(
            bird.current.animate(
              [
                { transform: "translateY(0) rotate(0deg)" },
                { transform: "translateY(5px) rotate(1.6deg)" },
                { transform: "translateY(0) rotate(0deg)" },
              ],
              { duration: Math.round(PACE * 1.9), delay: 180 + i * PACE, easing: "ease-in-out" },
            ),
          );
        }
      });

      const settled = LEAD_IN + (letters.length - 1) * PACE + TRAVEL;

      if (rule.current) {
        running.push(
          rule.current.animate(
            [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
            {
              duration: Math.round(PACE * 2.5),
              delay: settled - Math.round(PACE * 1.5),
              easing: EASE,
              fill: "both",
            },
          ),
        );
      }

      timers.push(window.setTimeout(finish, settled + 140));
    };

    // Let the real face load before anything moves, but never wait on it long.
    let waited = false;
    const go = () => {
      if (waited) return;
      waited = true;
      start();
    };
    timers.push(window.setTimeout(go, FONT_CEILING));
    if (document.fonts?.ready) document.fonts.ready.then(go).catch(go);
    else go();

    const skip = () => finish(true);
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    return () => {
      timers.forEach(clearTimeout);
      running.forEach((a) => a.cancel());
      running = [];
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      root.classList.remove("yk-loading");
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={host} className="yk-load" role="status" aria-label="Loading Yenko Studio">
      <span ref={bird} className="yk-load__bird" aria-hidden="true">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <Sankofa />
        </svg>
      </span>

      <div>
        <div className="yk-load__word" aria-hidden="true">
          {WORD.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="yk-load__sp">
                &nbsp;
              </span>
            ) : (
              <span key={i} data-letter className="yk-load__lt">
                {ch}
              </span>
            ),
          )}
        </div>
        <span ref={rule} className="yk-load__rule" aria-hidden="true" />
      </div>
    </div>
  );
}
