import Link from "next/link";
import SectionLabel from "./section-label";
import MaskReveal from "./mask-reveal";
import RollingLabel from "../ui/rolling-label";
import { pillars } from "../../data/services";

/**
 * First panel of the stack, so its content is sized to fit exactly one
 * viewport — anything taller would be unreachable once it pins.
 *
 * The list is the services page's own data rather than a second set of
 * headings kept in parallel. Before, this section named three abstractions
 * ("Product & platform", "Digital presence", "Technical partnership") that
 * matched nothing on /services, so the site gave two different answers to
 * "what do you do" — and one of them described an engagement model rather
 * than a service.
 */
export default function Capabilities() {
  return (
    <section className="flex h-[100svh] flex-col justify-center border-t border-studio-line bg-studio-paper px-[5vw] py-[clamp(4rem,7vw,6rem)] text-studio-ink max-[860px]:h-auto max-[860px]:py-[clamp(5rem,10vw,8rem)]">
      <SectionLabel number="03" label="Capabilities" className="text-studio-muted" />

      <MaskReveal
        lines={["The right work,", "done properly."]}
        className="mt-[clamp(1.75rem,3.5vw,3rem)] max-w-[16ch] text-[clamp(1.7rem,3.4vw,3.2rem)] leading-[0.95] tracking-[-0.055em]"
      />

      <div className="mt-[clamp(1.75rem,3.5vw,3rem)] border-t border-studio-ink">
        {pillars.map((item) => (
          <article
            key={item.number}
            className="grid grid-cols-[56px_minmax(170px,0.8fr)_1.2fr] items-baseline gap-x-8 gap-y-3 border-b border-studio-line py-[clamp(0.85rem,1.9vw,1.5rem)] max-[860px]:grid-cols-[40px_1fr] max-[860px]:items-start"
          >
            <span className="text-[10px] tracking-[0.1em] text-studio-muted">
              {item.number}
            </span>
            <h3 className="text-[clamp(1.15rem,2vw,1.9rem)] tracking-[-0.045em]">
              {item.title}
            </h3>
            <p className="max-w-[46ch] text-[13px] leading-[1.5] text-studio-muted max-[860px]:col-start-2">
              {item.short}
            </p>
          </article>
        ))}
      </div>

      <Link
        href="/services"
        className="group mt-[clamp(1.5rem,3vw,2.25rem)] flex w-fit items-center gap-2.5 border-b border-studio-ink pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
      >
        <RollingLabel className="leading-[1.25]">All services</RollingLabel>
        <svg
          width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8" aria-hidden="true"
          className="transition-transform duration-[400ms] ease-out group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </section>
  );
}
