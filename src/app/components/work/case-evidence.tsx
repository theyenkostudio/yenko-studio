import type { Evidence } from "../../data/work";
import CaseLane from "./case-lane";
import EvidenceReel from "./evidence-reel";

/**
 * The evidence section, placed between the approach and the outcome so the
 * proof arrives before the payoff rather than trailing after it.
 *
 * The lede stays in normal flow on paper; the reel is a full-bleed stone band
 * below it, which is what lets it pin without the section label sliding away
 * with it. The clip travels inside the reel rather than sitting outside as its
 * own moment — the point of the pin is that a sceptic passes through all of
 * the evidence, and the behavioural claim is the last thing to leave out.
 */
export default function CaseEvidence({
  evidence,
  client,
  number,
}: {
  evidence: Evidence[];
  client: string;
  number: string;
}) {
  const count = evidence.length;
  const written = ["no", "One", "Two", "Three", "Four", "Five", "Six"][count] ?? String(count);

  return (
    <section className="pt-[clamp(4rem,10vw,8.75rem)]">
      <div className="px-[5vw] pb-[clamp(2.5rem,5vw,4rem)]">
        <CaseLane number={number} label="The evidence">
          <p className="max-w-[700px] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-relaxed tracking-[-0.015em]">
            {written} {count === 1 ? "thing" : "things"} we said we built. Here{" "}
            {count === 1 ? "it is" : "they are"}, running.
          </p>
        </CaseLane>
      </div>

      <EvidenceReel evidence={evidence} client={client} number={number} />
    </section>
  );
}
