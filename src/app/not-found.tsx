import Link from "next/link";
import type { Metadata } from "next";
import MaskReveal from "./components/home/mask-reveal";
import RollingLabel from "./components/ui/rolling-label";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 already carries the status code; this stops the page itself from
  // being indexed if anything ever links to it directly.
  robots: { index: false, follow: true },
};

/**
 * Renders inside the root layout, so the header, footer and dial come with it.
 *
 * Worth having rather than taking Next's default, which paints its own
 * black-on-white error styling — including its own dark-mode media query —
 * inside the studio's chrome. It is also more likely to be seen than usual:
 * the site recently dropped several routes that were previously public and
 * indexed, so old links will land here for a while.
 */
const ELSEWHERE = [
  { href: "/work", label: "Work", detail: "Projects that are live, named and linked" },
  { href: "/services", label: "Services", detail: "What we build, and who builds it" },
  { href: "/about", label: "About", detail: "The studio, the name, and what we hold to" },
  { href: "/journal", label: "Journal", detail: "Notes from the studio" },
];

export default function NotFound() {
  return (
    <div className="bg-studio-paper text-studio-ink">
      <section className="mt-[var(--header-h)] flex min-h-[60svh] flex-col justify-center bg-studio-ink px-[5vw] py-[clamp(4rem,10vw,8rem)] text-studio-paper">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] tabular-nums text-studio-muted">
          404
        </p>

        <MaskReveal
          as="h1"
          immediate
          delay={0.25}
          lines={["Nothing at", "this address."]}
          className="mt-[clamp(1.5rem,3.5vw,3rem)] text-[clamp(2.75rem,10.5vw,11rem)] font-medium leading-[0.9] tracking-[-0.06em]"
        />

        <p className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[46ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-studio-dim">
          The link may be old, or the page may have moved. Everything the studio
          has is below.
        </p>
      </section>

      <nav className="px-[5vw] py-[clamp(3rem,7vw,5.5rem)]" aria-label="Site">
        <div className="border-t border-studio-ink">
          {ELSEWHERE.map(({ href, label, detail }) => (
            <Link
              key={href}
              href={href}
              className="group/row grid grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)_auto] items-baseline gap-x-10 gap-y-2 border-b border-studio-line py-6 transition-[padding-left] duration-[400ms] ease-out hover:pl-4 max-[860px]:grid-cols-1 max-[860px]:gap-y-1"
            >
              <span className="text-[clamp(1.25rem,2.4vw,2rem)] font-medium tracking-[-0.045em]">
                {label}
              </span>
              <span className="text-[15px] text-studio-muted">{detail}</span>
              <span className="group flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] max-[860px]:hidden">
                <RollingLabel className="leading-[1.25]">Go</RollingLabel>
                <svg
                  width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" aria-hidden="true"
                  className="transition-transform duration-[400ms] ease-out group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
