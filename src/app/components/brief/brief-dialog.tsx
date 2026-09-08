"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../ui/button";

/**
 * Project brief dialog.
 *
 * Built on the native <dialog> element rather than a hand-rolled modal: it
 * gives focus trapping, Escape-to-close and background inerting for free,
 * which is a great deal of accessibility code not to have to write.
 *
 * NOT WIRED UP. Submitting shows a placeholder panel — nothing is sent
 * anywhere. `handleSubmit` is the single seam: when a destination is chosen,
 * it becomes a server action call and the placeholder becomes a success state.
 */

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

const FIELD =
  "w-full border-b border-studio-line bg-transparent pb-2 pt-1 text-[15px] text-studio-ink outline-none transition-colors duration-300 placeholder:text-studio-muted/60 focus:border-studio-ink";
const LABEL =
  "block text-[10px] font-semibold uppercase tracking-[0.15em] text-studio-muted";

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
  const [sent, setSent] = useState(false);

  const open = () => {
    setSent(false);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: replace with the real delivery call once a destination is chosen.
    setSent(true);
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
              Tell us about the project.
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

          {sent ? (
            <div className="py-[clamp(3rem,6vw,4.5rem)]">
              <p className="max-w-[26ch] text-[clamp(1.4rem,2.3vw,1.95rem)] leading-[1.15] tracking-[-0.035em]">
                This form is not connected yet.
              </p>
              <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.55] text-studio-muted">
                The layout is finished but nothing was sent. Once a destination
                is chosen, this panel becomes the confirmation and the brief
                goes through.
              </p>
              <div className="mt-8">
                <Button onClick={() => setSent(false)} variant="outline" icon="none">
                  Back to the form
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mt-[clamp(1.75rem,3.5vw,2.5rem)] grid grid-cols-2 gap-x-10 gap-y-7 max-[640px]:grid-cols-1">
                <Field label="Your name">
                  <input name="name" required autoComplete="name" className={FIELD} />
                </Field>

                <Field label="Email">
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={FIELD}
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

              {/* Honeypot — hidden from people, tempting to bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px]">
                <label>
                  Do not fill this in
                  <input name="fax_number" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="mt-[clamp(1.75rem,3.5vw,2.5rem)] flex flex-wrap items-center justify-between gap-4 border-t border-studio-line pt-5">
                <p className="text-[13px] text-studio-muted">
                  We reply personally, within one working day.
                </p>
                <Button type="submit">Send the brief</Button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
