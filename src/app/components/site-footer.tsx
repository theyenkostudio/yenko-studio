import Link from "next/link";
import type { ReactNode } from "react";
import { LINKEDIN_URL, INSTAGRAM_URL } from "../data/links";
import RollingLabel from "./ui/rolling-label";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/approach", label: "Approach" },
  { href: "/journal", label: "Journal" },
];

const SOCIAL = [
  { href: LINKEDIN_URL, label: "LinkedIn" },
  { href: INSTAGRAM_URL, label: "Instagram" },
];

const LINK =
  "group text-studio-paper/70 transition-colors duration-300 hover:text-studio-paper";

/** Roomy enough leading that the roll's clipping box cannot shave descenders. */
const LEADING = "leading-[1.3]";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const body = <RollingLabel className={LEADING}>{children}</RollingLabel>;

  return href.startsWith("/") ? (
    <Link href={href} className={LINK}>
      {body}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {body}
    </a>
  );
}

/**
 * Deliberately small: the closing CTA band above already carries the email,
 * WhatsApp, availability and locations, so the footer only needs navigation,
 * social and legal — then the wordmark to close the page.
 */
export default function SiteFooter() {
  return (
    <footer
      data-band="ink"
      className="bg-studio-ink px-[5vw] pt-[clamp(2.5rem,4vw,3.5rem)] pb-[clamp(1.5rem,3vw,2.5rem)] text-studio-paper"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-[13px]">
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {NAV.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </nav>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {SOCIAL.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </nav>
      </div>

      {/* Negative margin breaks the rule out to full bleed; the padding puts the text back in the gutter. */}
      <div className="mx-[-5vw] mt-[clamp(2.5rem,4vw,3.5rem)] flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-studio-paper/20 px-[5vw] pt-5 text-[10px] uppercase tracking-[0.08em] text-studio-paper/40">
        <span>© {new Date().getFullYear()} Yenko Studio</span>
        <span>Independent design &amp; technology studio</span>
        <span>RC: 9040058</span>
      </div>

      {/*
        Full-bleed wordmark. The size is pure vw with no clamp on purpose:
        "YENKO STUDIO" at this weight and tracking is a fixed ratio of ~6.9
        times its own font-size, so 14.2vw fills the viewport at every width
        and stays edge-to-edge instead of drifting off at a breakpoint.
      */}
      <div aria-hidden="true" className="mx-[-5vw] mt-[clamp(2rem,4vw,3.5rem)] overflow-hidden">
        <div className="whitespace-nowrap text-center text-[14.2vw] font-[650] leading-[0.82] tracking-[-0.05em] text-studio-paper/25">
          YENKO STUDIO
        </div>
      </div>
    </footer>
  );
}
