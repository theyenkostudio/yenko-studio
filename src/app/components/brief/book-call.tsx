"use client";

import posthog from "posthog-js";
import Button from "../ui/button";

/**
 * "Book a call" — Cal.com's booking modal, opened from a button.
 *
 * Cal's embed script is not on the page until someone asks for it. The loader
 * below is Cal's own snippet, run on the first click rather than at load, so
 * the third-party script costs every other visitor nothing. Cal queues any
 * call made before the script arrives, so the modal opens as soon as it does.
 *
 * One event type on purpose. If a booker needs a longer meeting, the booking
 * itself routes them to it; the site does not have to offer a menu.
 */

const CAL_LINK = "theyenkostudio/30min";
const NAMESPACE = "30min";
const ORIGIN = "https://app.cal.com";
const SCRIPT = `${ORIGIN}/embed/embed.js`;

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, (...args: unknown[]) => void>;
};
type CalWindow = Window & { Cal?: CalFn };

const isPostHogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

/** Cal's published loader, typed. Idempotent: safe to call on every click. */
function cal(): CalFn {
  const w = window as CalWindow;
  if (w.Cal?.ns?.[NAMESPACE]) return w.Cal;

  if (!w.Cal) {
    const queue: CalFn = function (...args: unknown[]) {
      const c = w.Cal!;
      if (!c.loaded) {
        c.ns = {};
        c.q = c.q ?? [];
        const s = document.createElement("script");
        s.src = SCRIPT;
        document.head.appendChild(s);
        c.loaded = true;
      }
      if (args[0] === "init" && typeof args[1] === "string") {
        const name = args[1];
        const api = function (...a: unknown[]) {
          (api as unknown as { q: unknown[] }).q.push(a);
        } as unknown as ((...a: unknown[]) => void) & { q: unknown[] };
        api.q = api.q ?? [];
        c.ns![name] = c.ns![name] ?? api;
        api.q.push(args);
        (c.q = c.q ?? []).push(["initNamespace", name]);
        return;
      }
      (c.q = c.q ?? []).push(args);
    };
    w.Cal = queue;
  }

  w.Cal("init", NAMESPACE, { origin: ORIGIN });
  w.Cal.ns?.[NAMESPACE]?.("ui", {
    theme: "light",
    hideEventTypeDetails: false,
    layout: "month_view",
  });
  return w.Cal;
}

export default function BookCall({ className = "" }: { className?: string } = {}) {
  const open = () => {
    const c = cal();
    c.ns?.[NAMESPACE]?.("modal", {
      calLink: CAL_LINK,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
    });
    if (isPostHogConfigured) {
      posthog.capture("book_call_opened");
    }
  };

  return (
    <Button onClick={open} on="ink" variant="outline" className={className}>
      Book a call
    </Button>
  );
}
