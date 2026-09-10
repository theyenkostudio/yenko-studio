"use client";

import { useEffect, useState } from "react";

/**
 * Copies the current URL. Client-only because the address is only knowable in
 * the browser, and because the clipboard is.
 *
 * Renders as a plain label until it is known to work: `navigator.clipboard` is
 * absent over plain HTTP and in some in-app browsers, and a control that
 * silently does nothing is worse than one that was never offered.
 */
export default function CopyLink() {
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setReady(Boolean(navigator.clipboard)), []);

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
      className="w-fit cursor-pointer text-left text-studio-muted transition-colors hover:text-studio-ink"
    >
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
