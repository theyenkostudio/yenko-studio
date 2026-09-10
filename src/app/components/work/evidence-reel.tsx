"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { Evidence } from "../../data/work";
import EvidenceCard from "./evidence-card";
import { LABEL } from "./case-lane";
import useReducedMotion from "./use-reduced-motion";

/**
 * The evidence reel.
 *
 * Snapshots rest as a cluster. Scrolling into the section pins it, the cluster
 * unpacks into one row, and the remaining scroll travels that row across every
 * card before the page is handed back.
 *
 * The pin is here to make a sceptical reader look — someone who scrolls past
 * at speed sees nothing, so the section buys a guaranteed minimum dwell on
 * each snapshot. Worth being precise about what that buys, though: duration,
 * not attention. Nobody can be made to look; they can only be given time in
 * which looking is possible. So the choreography is kept short and most of the
 * pin goes to the evidence itself.
 *
 * Two ways out, both mandatory rather than nice-to-have: under reduced motion,
 * and on touch-sized viewports where a pin fights the scroll gesture itself,
 * there is no pin at all — the row becomes a native snap-scrolling strip
 * carrying exactly the same cards.
 *
 * A third way out is about content rather than the visitor. A case study with
 * only two or three snapshots has a row that already fits on screen, so once
 * it unpacks there is nowhere left to travel. Pinning then would hold the
 * reader for several screens of scroll while nothing happens — the precise
 * failure that makes hijacks feel broken. So the pin is not a fixed length: it
 * is derived from how far the row actually has to move, and below a threshold
 * the section simply doesn't pin. The interaction has to earn the scroll it
 * takes, and with little evidence it hasn't.
 */

/** Share of the pin spent unpacking. The rest is travel across the evidence. */
const UNPACK = 0.22;

/** Below this much horizontal travel, pinning buys nothing worth taking scroll for. */
const MIN_TRAVEL = 160;

/**
 * Scroll spent per pixel the row moves. Mapping travel 1:1 onto scroll makes
 * the row keep pace with the wheel, which reads as a rush — the point of the
 * pin is dwell, so the row is deliberately slower than the hand driving it.
 */
const PACE = 1.8;

/** Cluster offsets from stage centre, authored so the rest state is composed. */
const CLUSTER = [
  { x: -330, y: -130, r: -4, s: 0.86, z: 2 },
  { x: 40, y: -185, r: 3, s: 0.82, z: 3 },
  { x: -40, y: 45, r: -1, s: 1.0, z: 6 },
  { x: 330, y: -100, r: 5, s: 0.86, z: 4 },
  { x: -400, y: 120, r: -6, s: 0.8, z: 1 },
  { x: 330, y: 140, r: 4, s: 0.84, z: 5 },
];

export default function EvidenceReel({
  evidence,
  client,
  number,
}: {
  evidence: Evidence[];
  client: string;
  number: string;
}) {
  const section = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const readout = useRef<HTMLParagraphElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  const reduced = useReducedMotion();
  const [narrow, setNarrow] = useState(true);
  // Whether the row has far enough to go to justify pinning. Assumed true so
  // the first paint lays the row out for measurement, then corrected.
  const [travels, setTravels] = useState(true);
  const [measureKey, setMeasureKey] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 860px)");
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Travel depends on viewport width, so a resize can flip a reel that pinned
  // into one that shouldn't, and back.
  useEffect(() => {
    let timer: number;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMeasureKey((k) => k + 1), 180);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const canPin = !reduced && !narrow;
  const pinned = canPin && travels;

  useEffect(() => {
    if (!canPin || !section.current || !stage.current || !track.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stageEl = stage.current!;
      const trackEl = track.current!;
      const cards = gsap.utils.toArray<HTMLElement>(trackEl.children);

      const stageW = stageEl.clientWidth;
      const stageH = stageEl.clientHeight;
      const scale = Math.min(1, stageW / 1200);

      // The cluster is centred on the track's own band, not on the stage. The
      // label above and the rail below are in normal flow, so measuring from
      // the stage centre is what let the cards ride over them.
      const bandH = trackEl.clientHeight;

      // Then the vertical spread is clamped to what the band can actually hold,
      // so a tall card at a far offset still lands inside it. Authored offsets
      // describe the arrangement; the band decides how much of it fits.
      const halfCard = Math.max(
        ...cards.map((card, i) => (card.offsetHeight * CLUSTER[i % CLUSTER.length].s) / 2),
      );
      const furthest = Math.max(
        ...cards.map((_, i) => Math.abs(CLUSTER[i % CLUSTER.length].y * scale)),
      );
      const room = bandH / 2 - halfCard - 12;
      const yFactor = furthest > 0 ? gsap.utils.clamp(0, 1, room / furthest) : 1;

      // FLIP: the row is the real layout, so each card is measured there and
      // the cluster is expressed as a delta from it. One set of coordinates,
      // and the row stays correct at any width.
      cards.forEach((card, i) => {
        const c = CLUSTER[i % CLUSTER.length];
        card.style.zIndex = String(c.z);
        gsap.set(card, {
          x: stageW / 2 + c.x * scale - (card.offsetLeft + card.offsetWidth / 2),
          y: bandH / 2 + c.y * scale * yFactor - (card.offsetTop + card.offsetHeight / 2),
          rotate: c.r,
          scale: c.s,
        });
      });

      // The rail reports progress, so at rest it has nothing to report — and
      // an indicator sitting under a composition it isn't measuring yet is
      // just clutter. It arrives with the movement it describes.
      gsap.set(rail.current, { autoAlpha: 0 });

      // How far the row actually has to move. Everything else follows from it.
      const travel = Math.max(0, trackEl.scrollWidth - stageW);

      if (travel < MIN_TRAVEL) {
        setTravels(false);
        gsap.set(cards, { clearProps: "all" });
        gsap.set(rail.current, { clearProps: "all" });
        return;
      }
      setTravels(true);

      // Scroll cost is the travel itself, plus the share the unpack is allowed,
      // then bounded so a very short or very long reel still paces sensibly.
      const total = gsap.utils.clamp(
        stageH * 1.1,
        stageH * 4,
        (travel * PACE) / (1 - UNPACK),
      );

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section.current!,
            start: "top top",
            end: `+=${Math.round(total)}`,
            pin: stageEl,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (fill.current) fill.current.style.width = `${(p * 100).toFixed(1)}%`;
              if (readout.current) {
                const shown =
                  p < UNPACK
                    ? 1
                    : Math.min(
                        cards.length,
                        1 + Math.round(((p - UNPACK) / (1 - UNPACK)) * (cards.length - 1)),
                      );
                readout.current.textContent = `${String(shown).padStart(2, "0")} / ${String(
                  cards.length,
                ).padStart(2, "0")}`;
              }
            },
          },
        })
        // Unpack — staggered outward from the focal card, so the eye has
        // somewhere to start rather than six things moving at once.
        .to(
          cards,
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: UNPACK,
            ease: "power2.inOut",
            stagger: { each: 0.018, from: 2 },
          },
          0,
        )
        .to(rail.current, { autoAlpha: 1, duration: UNPACK * 0.5 }, 0)
        // Travel — the part the reader is here for gets the rest of the pin.
        .to(trackEl, { x: -travel, duration: 1 - UNPACK }, UNPACK);
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [canPin, evidence.length, measureKey]);

  const total = String(evidence.length).padStart(2, "0");
  let stills = 0;
  let clips = 0;

  return (
    <div ref={section} className="bg-studio-stone">
      <div
        ref={stage}
        className={
          pinned
            ? "relative flex h-[100svh] flex-col justify-center overflow-hidden py-[clamp(1.75rem,5vh,3.25rem)]"
            : "relative flex flex-col justify-center py-[clamp(2.5rem,6vw,4rem)]"
        }
      >
        <div className="flex flex-shrink-0 items-baseline justify-between gap-4 px-[5vw] pb-6 text-studio-muted max-[860px]:pb-5">
          <p className={LABEL}>{number} — The evidence</p>
          <p className={LABEL}>{client}</p>
        </div>

        <div
          ref={track}
          className={
            canPin
              ? // A row that fits gets centred rather than left-aligned — with
                // nowhere to travel, a row hugging the left edge just reads as
                // a layout that failed to fill.
                `flex min-h-0 flex-1 items-center gap-[clamp(1rem,2.2vw,2rem)] px-[5vw] ${
                  travels ? "w-max will-change-transform" : "w-full justify-center"
                }`
              : "flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-[5vw] pb-4"
          }
        >
          {evidence.map((item, i) => (
            <div key={i} className={canPin ? "flex-shrink-0" : "flex-shrink-0 snap-center"}>
              <EvidenceCard
                item={item}
                number={String(item.kind === "clip" ? ++clips : ++stills).padStart(2, "0")}
              />
            </div>
          ))}
        </div>

        {/* The reader can see the section has an end. An unbounded hijack with
            no progress signal is what makes these feel broken. */}
        <div ref={rail} className="flex flex-shrink-0 items-center gap-4 px-[5vw] pt-6 max-[860px]:pt-5">
          <p ref={readout} className={`${LABEL} tabular-nums text-studio-muted`}>
            {pinned ? `01 / ${total}` : `${total} snapshots`}
          </p>
          <span className="relative h-px flex-1 bg-studio-line">
            <span
              ref={fill}
              className="absolute inset-y-0 left-0 bg-studio-ink"
              style={{ width: pinned ? "0%" : "100%" }}
            />
          </span>
          {/* The rail promises progress, so it only claims scroll when there
              is some. A full reel says how to advance; a row that is already
              entirely on screen says nothing and lets the work speak. */}
          {pinned && <p className={`${LABEL} text-studio-muted`}>Scroll</p>}
          {!pinned && !canPin && <p className={`${LABEL} text-studio-muted`}>Swipe</p>}
        </div>
      </div>
    </div>
  );
}
