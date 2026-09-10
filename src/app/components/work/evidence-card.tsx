"use client";

import { useEffect, useRef, useState } from "react";
import type { Evidence } from "../../data/work";
import BrowserFrame, { CaptureSlot } from "./browser-frame";
import { LABEL } from "./case-lane";
import useReducedMotion from "./use-reduced-motion";

/**
 * One snapshot in the reel.
 *
 * Cards share a height and vary only in width. In a row that gives a common
 * baseline to read along; in the cluster the collage character comes from
 * rotation and scale instead, which the reel applies. Uniform height also
 * means a long caption lengthens nothing and clips nothing.
 *
 * The claim is the loudest thing on the card, because at travel speed the
 * claim is what has to land — not the chrome, and not the image.
 */
export default function EvidenceCard({
  item,
  number,
}: {
  item: Evidence;
  number: string;
}) {
  // Sized so the row is meaningfully longer than the viewport — a reel whose
  // cards nearly fit has almost nothing to travel, which reads as a rushed
  // slide rather than a considered one. Height tracks the viewport so short
  // screens still leave the cluster room to spread.
  const width = item.kind === "clip" ? "w-[560px]" : "w-[420px]";

  return (
    <article
      className={`h-[clamp(330px,50vh,450px)] flex-shrink-0 ${width} max-[860px]:h-[340px] max-[860px]:w-[78vw]`}
    >
      <BrowserFrame
        url={item.url}
        tone={item.kind === "clip" ? "dark" : "light"}
        className="h-full"
        footer={
          <>
            <span className={`${LABEL} font-medium text-studio-dim`}>
              {item.kind === "clip" ? "Clip" : "Still"} {number}
            </span>
            <span className="text-[13.5px] font-semibold leading-tight tracking-[-0.02em] text-balance">
              {item.claim}
            </span>
            <span
              className={`text-[11.5px] leading-snug ${
                item.kind === "clip" ? "text-studio-dim" : "text-studio-muted"
              }`}
            >
              {item.detail}
            </span>
          </>
        }
      >
        {item.kind === "clip" ? <ClipMedia item={item} /> : <StillMedia item={item} />}
      </BrowserFrame>
    </article>
  );
}

function StillMedia({ item }: { item: Extract<Evidence, { kind: "still" }> }) {
  if (!item.src) {
    return <CaptureSlot label="Screenshot slot" spec="2400 × 1500 · 16:10 · capture at 2x" />;
  }
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={item.src}
      alt={item.alt ?? item.claim}
      className="min-h-0 flex-1 object-cover object-top"
    />
  );
}

/**
 * Playback is started from an effect rather than the `autoPlay` attribute, so
 * motion never starts before we know whether this visitor wants it. If
 * autoplay is refused — battery saver, iOS low power — the manual control is
 * the same one the reduced-motion path gets.
 */
function ClipMedia({ item }: { item: Extract<Evidence, { kind: "clip" }> }) {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  const hasSource = Boolean(item.webm || item.mp4);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (reduced) {
      el.pause();
      setPlaying(false);
      return;
    }
    el.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [reduced]);

  const start = () =>
    video.current?.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );

  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
      {hasSource ? (
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          poster={item.poster}
          aria-label={item.claim}
          className="size-full object-cover object-top"
        >
          {item.webm && <source src={item.webm} type="video/webm" />}
          {item.mp4 && <source src={item.mp4} type="video/mp4" />}
        </video>
      ) : (
        <div className="flex flex-col items-center gap-3.5">
          <PlayMark />
          <p className={`${LABEL} text-studio-dim`}>Video slot · poster frame</p>
          <p className="text-[10px] text-[#6a6960]">WebM + MP4 · under 600 KB</p>
        </div>
      )}

      {hasSource && !playing && (
        <button
          type="button"
          onClick={start}
          className="absolute inset-0 flex items-center justify-center bg-studio-ink/30 transition-colors hover:bg-studio-ink/45"
        >
          <span className="sr-only">Play clip</span>
          <PlayMark />
        </button>
      )}

      <span
        className={`${LABEL} pointer-events-none absolute right-3 bottom-3 rounded-full bg-studio-ink/70 px-2.5 py-1 text-studio-paper`}
      >
        {item.duration}
      </span>
    </div>
  );
}

function PlayMark() {
  return (
    <span className="flex size-14 items-center justify-center rounded-full border border-[#3a3a35] bg-studio-paper/6">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-studio-paper" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}
