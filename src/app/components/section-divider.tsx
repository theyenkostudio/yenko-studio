/**
 * The Codex-generated woven-strip divider (public/assets/woven-divider.svg),
 * tiled horizontally. It's authored in black — `invert` flips it to a
 * paper-colored strip for use on dark (ink) sections.
 */
export default function SectionDivider({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto h-2 w-full max-w-350 bg-repeat-x ${
        tone === "ink" ? "opacity-30" : "opacity-40 invert"
      }`}
      style={{
        backgroundImage: "url('/assets/woven-divider.svg')",
        backgroundSize: "auto 100%",
      }}
    />
  );
}
