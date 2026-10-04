"use client";

import { useEffect, useRef, useState } from "react";
import Sankofa from "../ui/sankofa";

/**
 * The Sankofa preloader.
 *
 * The bird fills from the feet up, turns once, and flies to the bottom-right
 * corner, where it lands as the scroll dial. The loader is not dismissed, it
 * is handed to the page: the mark you waited on is the mark that stays with
 * you down the scroll. Sankofa is "go back and get it"; here the bird goes
 * and gets the page.
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
 *  - It carries no text, so there is no font to wait on and nothing to
 *    re-measure mid-flight.
 *
 * The flash of it on a repeat visit is prevented by an inline script in the
 * document head, not by this component: by the time React hydrates, the
 * server HTML has already painted.
 */

export const LOADER_KEY = "yenko-arrived";

const EASE = "cubic-bezier(.76,0,.24,1)";
const LEAD_IN = 200;
const FILL = 1100;
const HOLD = 250;
const FLY = 900;

/** The scroll dial's box (see sankofa-dial.tsx): 54px, 24px in from the corner,
 *  with the mark drawn at 0.58 of it. The bird is 120px, so it lands scaled. */
const DIAL = { size: 54, inset: 24, mark: 0.58, from: 120 };
const LANDED = (DIAL.size * DIAL.mark) / DIAL.from;
/** The dial is `md:block` — below this there is nothing to land on. */
const DIAL_MIN_WIDTH = 768;

export default function Preloader() {
  const host = useRef<HTMLDivElement>(null);
  const bird = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
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
    const mark = bird.current;
    const rising = fill.current;
    if (!node || !mark || !rising) return;

    root.classList.add("yk-loading");

    const wide = window.innerWidth >= DIAL_MIN_WIDTH;
    const centre = DIAL.inset + DIAL.size / 2;
    const dx = wide ? window.innerWidth / 2 - centre : 0;
    const dy = wide ? window.innerHeight / 2 - centre : 0;
    const flyAt = LEAD_IN + FILL + HOLD;

    const anims = [
      rising.animate(
        [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
        { duration: FILL, delay: LEAD_IN, easing: "cubic-bezier(.45,0,.2,1)", fill: "both" },
      ),
      mark.animate(
        [
          { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${dx}px,${dy}px) scale(${wide ? LANDED : 0.2}) rotate(360deg)`,
            opacity: wide ? 1 : 0,
          },
        ],
        { duration: FLY, delay: flyAt, easing: EASE, fill: "both" },
      ),
      // The ground clears as the bird leaves, so the page is there when it lands.
      node.animate(
        [{ backgroundColor: "rgba(18,18,16,1)" }, { backgroundColor: "rgba(18,18,16,0)" }],
        { duration: FLY * 0.8, delay: flyAt, easing: "ease-in", fill: "both" },
      ),
    ];

    let finished = false;
    let fade: Animation | undefined;
    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem(LOADER_KEY, "1");
      } catch {
        /* private mode — it simply plays again next time */
      }
      root.classList.remove("yk-loading");
      setGone(true);
    };

    // A cancelled animation rejects `finished`; that is a skip, not an error.
    Promise.all(anims.map((a) => a.finished)).then(finish, () => {});

    const skip = () => {
      if (finished || fade) return;
      anims.forEach((a) => a.cancel());
      fade = node.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "both" });
      fade.finished.then(finish, () => {});
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    return () => {
      finished = true;
      anims.forEach((a) => a.cancel());
      fade?.cancel();
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      root.classList.remove("yk-loading");
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={host} className="yk-load" role="status" aria-label="Loading Yenko Studio">
      <span ref={bird} className="yk-load__bird" aria-hidden="true">
        <svg viewBox="0 0 64 64" className="yk-load__ghost">
          <Sankofa />
        </svg>
        <span ref={fill} className="yk-load__fill">
          <svg viewBox="0 0 64 64">
            <Sankofa />
          </svg>
        </span>
      </span>
    </div>
  );
}
