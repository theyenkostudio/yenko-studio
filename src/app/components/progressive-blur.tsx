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
 */

/** Strongest blur at the top; each layer's mask window steps further down. */
const LAYERS = [
  { blur: 24, mask: "linear-gradient(to bottom, #000 0%, #000 20%, transparent 45%)" },
  { blur: 12, mask: "linear-gradient(to bottom, transparent 15%, #000 35%, #000 55%, transparent 75%)" },
  { blur: 6, mask: "linear-gradient(to bottom, transparent 40%, #000 60%, #000 78%, transparent 92%)" },
  { blur: 3, mask: "linear-gradient(to bottom, transparent 65%, #000 85%, transparent 100%)" },
];

export default function ProgressiveBlur({ height = 150 }: { height?: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[55]"
      style={{ height }}
    >
      {LAYERS.map((layer) => (
        <div
          key={layer.blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
          }}
        />
      ))}
    </div>
  );
}
