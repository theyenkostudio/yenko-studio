import Button from "../ui/button";
import BriefDialog from "../brief/brief-dialog";
import StudioClock from "./studio-clock";
import { WHATSAPP_URL, EMAIL } from "../../data/links";

/**
 * The ledger a convinced prospect still needs: are you real, are you available,
 * how fast do you reply, and where are you.
 *
 * Extracted so the homepage closing band and the services page can show the
 * same details without keeping two copies of the availability line and the
 * reply-time promise — the sort of pair that drifts the moment one is edited.
 *
 * Assumes an ink ground.
 */

/** Edit when the studio's intake changes. Deliberately undated so it cannot go stale. */
const AVAILABILITY = "Currently taking new work";

const ROW =
  "grid grid-cols-[minmax(120px,0.34fr)_1fr] items-baseline gap-x-8 border-b border-studio-paper/20 py-[1.05rem] max-[860px]:grid-cols-1 max-[860px]:gap-y-1";
const TERM =
  "text-[10px] font-semibold uppercase tracking-[0.15em] text-studio-dim";

const ENTRIES = [
  { term: "Availability", detail: AVAILABILITY },
  { term: "First reply", detail: "Within one working day, from a person" },
  { term: "Based in", detail: "Accra & Abuja, working globally" },
];

export default function ContactDetails() {
  return (
    <div>
      <dl className="m-0 border-t border-studio-paper/20">
        <div className={ROW}>
          <dt className={TERM}>Studio time</dt>
          <dd className="m-0">
            <StudioClock />
          </dd>
        </div>

        {ENTRIES.map(({ term, detail }) => (
          <div className={ROW} key={term}>
            <dt className={TERM}>{term}</dt>
            <dd className="m-0">{detail}</dd>
          </div>
        ))}
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
        Send a brief for a considered reply, or WhatsApp if you would rather just
        talk.
      </p>
    </div>
  );
}
