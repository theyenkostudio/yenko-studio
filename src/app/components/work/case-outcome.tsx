import { LANE, LANE_BODY, LABEL } from "./case-lane";

/**
 * The outcome, as the page's single dark band.
 *
 * It was one of three equal columns before, which gave the result the same
 * weight as the setup. Full-bleed ink and a larger size make it the one
 * moment the page raises its voice — and having exactly one means it lands.
 */
export default function CaseOutcome({
  number,
  flush = false,
  children,
}: {
  number: string;
  /**
   * Set when the outcome follows the evidence reel. The reel is its own
   * full-bleed stone band, so the gap this section normally opens above itself
   * would show as a stripe of paper wedged between two coloured bands rather
   * than as breathing room. Against prose on paper the gap is still wanted.
   */
  flush?: boolean;
  children: string;
}) {
  return (
    <section
      className={`bg-studio-ink px-[5vw] py-[clamp(3.5rem,8vw,7.5rem)] text-studio-paper ${
        flush ? "" : "mt-[clamp(4rem,10vw,8.75rem)]"
      }`}
    >
      <div className={LANE}>
        <div className={`${LABEL} pt-4.5 font-medium text-studio-muted max-[860px]:pt-0`}>
          {number}
        </div>
        <div className="pt-3.5 max-[860px]:pt-0">
          <h2 className={LABEL}>The outcome</h2>
        </div>
        <p
          className={`${LANE_BODY} max-w-[780px] text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.5] tracking-[-0.03em]`}
        >
          {children}
        </p>
      </div>
    </section>
  );
}
