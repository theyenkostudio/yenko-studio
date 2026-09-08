import Link from "next/link";
import type { ReactNode } from "react";
import RollingLabel from "./rolling-label";

type Variant = "solid" | "outline" | "text";
/** Which band the button sits on, not the button's own colour. */
type Ground = "ink" | "paper";
type IconName = "up-right" | "down" | "none";

const PATHS = {
  "up-right": "M7 17 17 7M9 7h8v8",
  down: "M12 5v14M5 13l7 7 7-7",
} as const;

/**
 * The studio button.
 *
 * The signature is the label roll: on hover the words travel up out of a
 * clipping box while an identical copy arrives from below. That is the same
 * mask-and-travel gesture the headings use, so the button belongs to the
 * system rather than borrowing an effect from outside it.
 *
 * The duplicate label is aria-hidden — visually it is the same word, and a
 * screen reader must not announce it twice. Under reduced motion it is not
 * rendered at all and the roll is suppressed.
 *
 * Hard edges throughout. Nothing on this site has a radius.
 */

const BASE =
  "group inline-flex items-center gap-6 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-[350ms] ease-out";

const SHAPE: Record<Variant, string> = {
  solid: "border px-5 py-4",
  outline: "border px-5 py-4",
  text: "gap-3 border-b pb-1.5",
};

const TONE: Record<Ground, Record<Variant, string>> = {
  ink: {
    solid: "border-studio-paper bg-studio-paper text-studio-ink",
    outline: "border-studio-paper/40 text-studio-paper hover:border-studio-paper",
    text: "border-studio-paper/50 text-studio-paper hover:border-studio-paper",
  },
  paper: {
    solid: "border-studio-ink bg-studio-ink text-studio-paper",
    outline: "border-studio-ink/30 text-studio-ink hover:border-studio-ink",
    text: "border-studio-ink/40 text-studio-ink hover:border-studio-ink",
  },
};

function Arrow({ icon }: { icon: Exclude<IconName, "none"> }) {
  const nudge =
    icon === "up-right"
      ? "group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
      : "group-hover:translate-y-[3px]";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={`h-[14px] w-[14px] shrink-0 transition-transform duration-[450ms] ease-out motion-reduce:transition-none ${nudge}`}
    >
      <path d={PATHS[icon]} />
    </svg>
  );
}

type Common = {
  children: ReactNode;
  variant?: Variant;
  on?: Ground;
  icon?: IconName;
  className?: string;
  disabled?: boolean;
};

/** Either a destination or an action — never both. */
type Props = Common &
  (
    | { href: string; onClick?: never; type?: never }
    | { href?: never; onClick?: () => void; type?: "button" | "submit" }
  );

export default function Button({
  children,
  variant = "solid",
  on = "paper",
  icon = "up-right",
  className = "",
  disabled = false,
  ...rest
}: Props) {
  const classes = `${BASE} ${SHAPE[variant]} ${TONE[on][variant]} ${
    disabled ? "pointer-events-none opacity-40" : ""
  } ${className}`;

  const body = (
    <>
      <RollingLabel className="leading-[1.25]">{children}</RollingLabel>
      {icon !== "none" && <Arrow icon={icon} />}
    </>
  );

  if (!rest.href) {
    return (
      <button
        type={rest.type ?? "button"}
        onClick={rest.onClick}
        disabled={disabled}
        className={classes}
      >
        {body}
      </button>
    );
  }

  const { href } = rest;

  // Internal routes go through the router; everything else is a plain anchor,
  // and only http(s) gets target/rel — mailto and tel must not open a tab.
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {body}
    </a>
  );
}
