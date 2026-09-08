/**
 * The Codex-generated woven-grid texture (public/assets/woven-grid.svg),
 * as a near-invisible background layer on dark (ink) sections only.
 * Authored in black — `invert` flips it to a faint paper-colored weave.
 */
export default function WovenTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-5 invert"
      style={{
        backgroundImage: "url('/assets/woven-grid.svg')",
        backgroundSize: "48px 48px",
      }}
    />
  );
}
