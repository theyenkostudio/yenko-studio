import { ReactNode } from "react";
import { LABEL } from "./case-lane";

/**
 * The chrome that wraps every piece of evidence. It exists to do one job:
 * show the address the capture came from. A screenshot with no URL attached
 * is an assertion; one with the address visible is checkable, which is the
 * whole point of the section.
 *
 * `tone="dark"` is for the clip, which sits on ink so the moving image is
 * the brightest thing in that band.
 */
export default function BrowserFrame({
  url,
  tone = "light",
  className = "",
  footer,
  children,
}: {
  url: string;
  tone?: "light" | "dark";
  className?: string;
  /** Caption rendered inside the frame, below the media. */
  footer?: ReactNode;
  children: ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <figure
      className={`flex flex-col overflow-hidden ${
        dark ? "bg-studio-ink" : "border border-studio-line bg-white"
      } ${className}`}
    >
      <div
        className={`flex h-9.5 flex-shrink-0 items-center gap-3.5 px-4 max-[860px]:h-7.5 max-[860px]:gap-2.5 max-[860px]:px-3 ${
          dark ? "bg-[#1e1e1b]" : "border-b border-studio-line bg-studio-stone"
        }`}
      >
        <span aria-hidden="true" className="flex flex-shrink-0 gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`size-2.5 rounded-full max-[860px]:size-1.75 ${
                dark ? "bg-[#3a3a35]" : "bg-studio-line"
              }`}
            />
          ))}
        </span>
        <span
          className={`flex h-5.5 flex-1 items-center truncate rounded-[3px] px-3 text-[10px] font-medium tracking-[0.04em] max-[860px]:h-4.5 max-[860px]:px-2 max-[860px]:text-[8px] ${
            dark ? "bg-[#2a2a26] text-studio-dim" : "bg-studio-paper text-studio-muted"
          }`}
        >
          {url}
        </span>
      </div>
      {children}
      {footer && (
        <figcaption
          className={`flex flex-shrink-0 flex-col gap-1 border-t px-3.5 pt-2.5 pb-3 ${
            dark ? "border-[#2a2a26] text-studio-paper" : "border-studio-line"
          }`}
        >
          {footer}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * What a frame shows before its capture exists. Carrying the shooting spec
 * here means the brief for whoever takes the screenshot lives in the page
 * itself, and the section can ship ahead of the assets instead of waiting
 * on them.
 */
export function CaptureSlot({ spec, label }: { spec: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2.5 bg-studio-paper">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="text-studio-dim max-[860px]:size-5.5"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="1.5" />
        <path d="m3 16 5-4 4 3 4-4 5 4" />
        <circle cx="9" cy="9" r="1.4" />
      </svg>
      <p className={`${LABEL} text-studio-dim`}>{label}</p>
      <p className="px-4 text-center text-xs text-studio-dim max-[860px]:hidden">{spec}</p>
    </div>
  );
}
