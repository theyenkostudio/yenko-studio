"use client";

import { useEffect, useState } from "react";

/**
 * Progressive blur behind the header.
 *
 * A single `backdrop-filter: blur()` leaves a hard edge where it stops. This
 * stacks several blurred layers, each masked to a different band of the
 * overlay, so the blur ramps from strong at the very top down to nothing —
 * content dissolves as it passes under the header instead of hitting a line.
 *
 * Blur only, no colour tint: the hero is ink and every band below it is
 * paper or stone, and an untinted ramp reads correctly over both.
 *
 * Sits at z-55 — above page content, below the header (z-100) and the
 * Sankofa dial (z-90).
 *
 * The ramp is taller than the header on purpose, so content starts softening
 * *before* it reaches the header rather than at it. That overhang is only
 * correct while something is actually travelling under the header, though —
 * at rest it just fogs whatever the page happens to open with, which on any
 * page that starts with content near the top (the work breadcrumb, for one)
 * means the first thing the reader sees is out of focus. So the overlay is
 * tied to scroll: absent at the top of the page, ramping to full over the
 * first `engage` pixels. On the homepage this is invisible either way — the
 * hero is full-bleed ink — and everywhere else the page now opens sharp.
 *
 * The ramp scales each layer's blur *radius* rather than fading the overlay's
 * opacity. Opacity would isolate this subtree into its own group, and a
 * `backdrop-filter` inside a group samples that group instead of the page
 * behind it — which removes the blur altogether rather than softening it.
 */

/** Strongest blur at the top; each layer's mask window steps further down. */
const LAYERS = [
  { blur: 24, mask: "linear-gradient(to bottom, #000 0%, #000 20%, transparent 45%)" },
  { blur: 12, mask: "linear-gradient(to bottom, transparent 15%, #000 35%, #000 55%, transparent 75%)" },
  { blur: 6, mask: "linear-gradient(to bottom, transparent 40%, #000 60%, #000 78%, transparent 92%)" },
  { blur: 3, mask: "linear-gradient(to bottom, transparent 65%, #000 85%, transparent 100%)" },
];

export default function ProgressiveBlur({
  height = 150,
  engage = 90,
}: {
  height?: number;
  /** Scroll distance over which the ramp fades in, in pixels. */
  engage?: number;
}) {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const update = () => setStrength(Math.min(1, window.scrollY / engage));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [engage]);

  // Nothing to composite at the top of the page — and skipping the layers
  // entirely keeps four backdrop-filtered surfaces off the compositor there.
  if (strength === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[55]"
      style={{ height }}
    >
      {LAYERS.map((layer) => {
        const radius = layer.blur * strength;
        return (
          <div
            key={layer.blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${radius}px)`,
              WebkitBackdropFilter: `blur(${radius}px)`,
              maskImage: layer.mask,
              WebkitMaskImage: layer.mask,
            }}
          />
        );
      })}
    </div>
  );
}
