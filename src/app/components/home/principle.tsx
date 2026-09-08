import Button from "../ui/button";
import SectionLabel from "./section-label";

/**
 * Second panel of the stack. Sized to one viewport for the same reason
 * as Capabilities — it pins, so nothing may sit below the fold.
 */
export default function Principle() {
  return (
    <section
      data-band="ink"
      className="flex h-[100svh] flex-col justify-center bg-studio-ink px-[5vw] py-[clamp(4rem,7vw,6rem)] text-studio-paper max-[860px]:h-auto max-[860px]:py-[clamp(5rem,12vw,9rem)]"
    >
      <SectionLabel number="04" label="How We Think" className="text-studio-dim" />

      <p className="mt-[clamp(2.5rem,6vw,5rem)] w-full max-w-[20ch] text-[clamp(2rem,4.8vw,4.4rem)] leading-[1.02] tracking-[-0.065em]">
        Good digital work is not decoration. It is a system of decisions made
        clear enough for people to trust, use and return to.
      </p>

      <Button href="/approach" on="ink" variant="text" className="mt-10 self-start">
        Our approach
      </Button>
    </section>
  );
}
