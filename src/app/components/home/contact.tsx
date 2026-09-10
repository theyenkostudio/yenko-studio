import SectionLabel from "./section-label";
import MaskReveal from "./mask-reveal";
import ContactDetails from "./contact-details";

/**
 * Closing band as a signature block: the statement carries the voice, the
 * ledger beside it answers the questions a convinced prospect still has —
 * are you real, are you available, how fast do you reply.
 *
 * Runs on ink so it reads as one composition with the footer beneath it.
 */

export default function Contact({
  number,
}: {
  /**
   * Position in the homepage's numbered sequence. Deliberately has no default:
   * the sequence is the homepage's, so the homepage declares it and every
   * other page that reuses this band gets no numeral by simply not passing one.
   */
  number?: string;
} = {}) {
  return (
    <section
      data-band="ink"
      className="border-b border-studio-paper/20 bg-studio-ink px-[5vw] py-[clamp(5rem,10vw,9rem)] text-studio-paper"
    >
      <SectionLabel
        number={number}
        label="Start A Conversation"
        className="text-studio-dim"
      />

      <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-[1.15fr_0.85fr] items-start gap-[clamp(2.5rem,6vw,6rem)] max-[860px]:grid-cols-1">
        <MaskReveal
          lines={["Are you", "ready", "to build?"]}
          className="mt-[-0.3em] text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.055em]"
        />

        <ContactDetails />
      </div>
    </section>
  );
}
