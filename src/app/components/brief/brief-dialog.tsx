"use client";

import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Button from "../ui/button";
import { WHATSAPP_URL } from "../../data/links";

/**
 * Project brief dialog.
 *
 * Built on the native <dialog> element rather than a hand-rolled modal: it
 * gives focus trapping, Escape-to-close and background inerting for free,
 * which is a great deal of accessibility code not to have to write.
 *
 * Delivery is Formspree. `useForm` owns submission state — submitting,
 * succeeded, and any server-side validation errors — so the component keeps
 * no send state of its own. The success panel is the same slot the old
 * placeholder occupied.
 */

const FORM_ID = "mjyvdqag";

type BriefFields = {
  name: string;
  email: string;
  company: string;
  website_url: string;
  project: string;
  timeline: string;
  budget: string;
};

const TIMELINES = [
  "Within 4–6 weeks",
  "This quarter",
  "Next quarter",
  "No fixed date yet",
];

const BUDGETS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

/**
 * WhatsApp as a second delivery path.
 *
 * Not an API call — `wa.me` opens the client's own WhatsApp with the brief
 * already composed, and they press send. That keeps the studio number on the
 * WhatsApp Business app: registering it with the Cloud API would take it off
 * the phone, and a business-initiated notification would need an approved
 * template besides. The thread that arrives is a real conversation to reply
 * to, which is worth more here than an automated ping.
 */

/** Long URLs are dropped by wa.me. The brief is the only unbounded field. */
const PROJECT_LIMIT = 700;

/** Ordered, so the message reads the way the form does. */
const SUMMARY: [keyof BriefFields, string][] = [
  ["name", "Name"],
  ["email", "Email"],
  ["company", "Company"],
  ["website_url", "Website"],
  ["timeline", "Timeline"],
  ["budget", "Budget"],
];

function composeMessage(data: FormData) {
  const read = (key: string) => String(data.get(key) ?? "").trim();
  const lines = ["New project brief — yenko.studio", ""];

  for (const [key, label] of SUMMARY) {
    const value = read(key);
    // Optional fields left blank are omitted rather than sent as empty rows.
    if (value) lines.push(`${label}: ${value}`);
  }

  const project = read("project");
  if (project) {
    lines.push(
      "",
      "Project:",
      project.length > PROJECT_LIMIT
        ? `${project.slice(0, PROJECT_LIMIT).trimEnd()}…`
        : project
    );
  }

  return lines.join("\n");
}

const FIELD =
  "w-full border-b border-studio-line bg-transparent pb-2 pt-1 text-[15px] text-studio-ink outline-none transition-colors duration-300 placeholder:text-studio-muted/60 focus:border-studio-ink aria-[invalid=true]:border-studio-alert";
const LABEL =
  "block text-[10px] font-semibold uppercase tracking-[0.15em] text-studio-muted";
const ERROR =
  "mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-studio-alert";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={LABEL}>{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export default function BriefDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [state, handleSubmit, reset] = useForm<BriefFields>(FORM_ID);

  const open = () => {
    // Reopening after a send should offer a blank form, not the receipt.
    reset();
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  // The page still scrolls behind an open dialog. Matches how the menu in
  // site-header locks scroll today — both want replacing with lenis.stop()
  // once the Lenis instance is exposed through context.
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const lock = () => {
      document.documentElement.style.overflow = "hidden";
    };
    const unlock = () => {
      document.documentElement.style.overflow = "";
    };
    node.addEventListener("close", unlock);
    const observer = new MutationObserver(() =>
      node.open ? lock() : unlock()
    );
    observer.observe(node, { attributes: true, attributeFilter: ["open"] });
    return () => {
      node.removeEventListener("close", unlock);
      observer.disconnect();
      unlock();
    };
  }, []);

  // Formspree clears `succeeded` on reset but leaves the inputs populated;
  // wipe them too so a second brief starts clean.
  const startOver = () => {
    reset();
    form.current?.reset();
  };

  const sendOnWhatsApp = () => {
    const node = form.current;
    if (!node) return;
    // Borrow the browser's own validation pass rather than inventing a
    // second one: same required fields, same bubbles as the submit path.
    if (!node.reportValidity()) return;

    const text = encodeURIComponent(composeMessage(new FormData(node)));
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Button onClick={open} on="ink">
        Send a project brief
      </Button>

      <dialog
        ref={dialog}
        aria-labelledby="brief-title"
        className="brief-dialog bg-studio-paper text-studio-ink"
        onClick={(event) => {
          // Native dialogs do not close on backdrop click; the backdrop is the
          // dialog element itself, so a click landing on it means "outside".
          if (event.target === dialog.current) close();
        }}
      >
        <div
          data-lenis-prevent
          className="max-h-[88svh] overflow-y-auto px-[clamp(1.5rem,4vw,3rem)] py-[clamp(1.25rem,3vw,2rem)]"
        >
          <div className="flex items-baseline justify-between gap-6 border-b border-studio-line pb-5">
            <h2
              id="brief-title"
              className="text-[clamp(1.3rem,2.2vw,1.85rem)] leading-[1.15] tracking-[-0.035em]"
            >
              {state.succeeded ? "Brief received." : "Tell us about the project."}
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="text-[10px] font-semibold uppercase tracking-[0.15em] text-studio-muted transition-colors duration-300 hover:text-studio-ink"
            >
              Close
            </button>
          </div>

          {state.succeeded ? (
            <div className="py-[clamp(3rem,6vw,4.5rem)]">
              <p className="max-w-[26ch] text-[clamp(1.4rem,2.3vw,1.95rem)] leading-[1.15] tracking-[-0.035em]">
                Thank you — it is with us.
              </p>
              <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.55] text-studio-muted">
                We read every brief ourselves and reply personally, within one
                working day. If it is urgent, WhatsApp reaches us faster.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button onClick={close} variant="outline" icon="none">
                  Close
                </Button>
                <Button onClick={startOver} variant="text" icon="none">
                  Send another
                </Button>
              </div>
            </div>
          ) : (
            <form ref={form} onSubmit={handleSubmit}>
              <div className="mt-[clamp(1.75rem,3.5vw,2.5rem)] grid grid-cols-2 gap-x-10 gap-y-7 max-[640px]:grid-cols-1">
                <Field label="Your name">
                  <input name="name" required autoComplete="name" className={FIELD} />
                  <ValidationError
                    field="name"
                    errors={state.errors}
                    className={ERROR}
                  />
                </Field>

                <Field label="Email">
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={FIELD}
                  />
                  <ValidationError
                    field="email"
                    errors={state.errors}
                    className={ERROR}
                  />
                </Field>

                <Field label="Company or organisation">
                  <input name="company" autoComplete="organization" className={FIELD} />
                </Field>

                <Field label="Current website">
                  <input
                    name="website_url"
                    inputMode="url"
                    placeholder="yourcompany.com — or none yet"
                    className={FIELD}
                  />
                </Field>

                <div className="col-span-2 max-[640px]:col-span-1">
                  <Field label="What are you building?">
                    <textarea
                      name="project"
                      required
                      rows={3}
                      placeholder="The opportunity, who it is for, and what needs to happen next."
                      className={`${FIELD} resize-none`}
                    />
                    <ValidationError
                      field="project"
                      errors={state.errors}
                      className={ERROR}
                    />
                  </Field>
                </div>

                <Field label="Timeline">
                  <select name="timeline" className={FIELD} defaultValue="">
                    <option value="" disabled>
                      Select one
                    </option>
                    {TIMELINES.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Budget range">
                  <select name="budget" className={FIELD} defaultValue="">
                    <option value="" disabled>
                      Select one
                    </option>
                    {BUDGETS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Subject line on the notification email, so the inbox reads as
                  a queue rather than a stack of identical rows. */}
              <input
                type="hidden"
                name="_subject"
                value="New project brief — yenko.studio"
              />

              {/* Honeypot — hidden from people, tempting to bots. `_gotcha` is
                  the name Formspree watches: anything filled in here is
                  discarded server-side without a bounce. */}
              <div aria-hidden="true" className="absolute left-[-9999px]">
                <label>
                  Do not fill this in
                  <input name="_gotcha" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="mt-[clamp(1.75rem,3.5vw,2.5rem)] flex flex-wrap items-center justify-between gap-4 border-t border-studio-line pt-5">
                <div>
                  <p className="text-[13px] text-studio-muted">
                    We reply personally, within one working day.
                  </p>
                  {/* Form-level failures: no `field`, so this catches the
                      network and server errors the per-field ones do not. */}
                  <ValidationError errors={state.errors} className={ERROR} />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    onClick={sendOnWhatsApp}
                    variant="outline"
                    icon="up-right"
                  >
                    Send on WhatsApp
                  </Button>
                  <Button type="submit" disabled={state.submitting}>
                    {state.submitting ? "Sending…" : "Send the brief"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
