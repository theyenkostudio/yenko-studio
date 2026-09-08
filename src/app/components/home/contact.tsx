import Button from "../ui/button";
import BriefDialog from "../brief/brief-dialog";
import SectionLabel from "./section-label";
import MaskReveal from "./mask-reveal";
import StudioClock from "./studio-clock";
import { WHATSAPP_URL, EMAIL } from "../../data/links";

/**
 * Closing band as a signature block: the statement carries the voice, the
 * ledger beside it answers the questions a convinced prospect still has —
 * are you real, are you available, how fast do you reply.
 *
 * Runs on ink so it reads as one composition with the footer beneath it.
 */

/** Edit when the studio's intake changes. Deliberately undated so it cannot go stale. */
const AVAILABILITY = "Currently taking new work";

const ROW =
  "grid grid-cols-[minmax(120px,0.34fr)_1fr] items-baseline gap-x-8 border-b border-studio-paper/20 py-[1.05rem] max-[860px]:grid-cols-1 max-[860px]:gap-y-1";
const TERM =
  "text-[10px] font-semibold uppercase tracking-[0.15em] text-studio-dim";

export default function Contact() {
  return (
    <section
      data-band="ink"
      className="border-b border-studio-paper/20 bg-studio-ink px-[5vw] py-[clamp(5rem,10vw,9rem)] text-studio-paper"
    >
      <SectionLabel
        number="06"
        label="Start A Conversation"
        className="text-studio-dim"
      />

      <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-[1.15fr_0.85fr] items-start gap-[clamp(2.5rem,6vw,6rem)] max-[860px]:grid-cols-1">
        <MaskReveal
          lines={["Are you", "ready", "to build?"]}
          className="mt-[-0.3em] text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.055em]"
        />

        <div>
          <dl className="m-0 border-t border-studio-paper/20">
            <div className={ROW}>
              <dt className={TERM}>Studio time</dt>
              <dd className="m-0">
                <StudioClock />
              </dd>
            </div>

            <div className={ROW}>
              <dt className={TERM}>Availability</dt>
              <dd className="m-0">{AVAILABILITY}</dd>
            </div>

            <div className={ROW}>
              <dt className={TERM}>First reply</dt>
              <dd className="m-0">Within one working day, from a person</dd>
            </div>

            <div className={ROW}>
              <dt className={TERM}>Based in</dt>
              <dd className="m-0">Accra &amp; Lagos, working globally</dd>
            </div>
          </dl>

          <div className="mt-[clamp(1.75rem,3.5vw,2.5rem)] flex flex-wrap items-center gap-x-3 gap-y-4">
            <BriefDialog />
            <Button href={WHATSAPP_URL} on="ink" variant="outline">
              Talk to Yenko
            </Button>
            <Button href={`mailto:${EMAIL}`} on="ink" variant="text" icon="none">
              {EMAIL}
            </Button>
          </div>

          <p className="mt-5 text-[13px] text-studio-dim">
            Send a brief for a considered reply, or WhatsApp if you would
            rather just talk.
          </p>
        </div>
      </div>
    </section>
  );
}
