import MaskReveal from "./mask-reveal";

/** Below this width the rail is dropped for an inline cue — no room, and no hover. */
const RAIL = "min-[861px]";

export default function Hero() {
  return (
    <section
      className={`relative flex min-h-[100svh] flex-col bg-studio-ink px-[5vw] pt-[clamp(7rem,12vw,10rem)] pb-8 text-studio-paper max-[700px]:min-h-[760px] ${RAIL}:pr-[calc(5vw+3.2rem)]`}
    >
      <div className="flex justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-paper/65">
        <span>Strategy · Design · Technology</span>
        <span>Accra / Lagos / Global</span>
      </div>

      <div className="my-auto w-full">
        <MaskReveal
          as="h1"
          immediate
          delay={0.38}
          lines={["Digital foundations", "for Africa's", "next chapter."]}
          className="mt-[clamp(2rem,5vw,4rem)] text-[clamp(4rem,11.5vw,11.5rem)] font-[650] leading-[0.82] tracking-[-0.085em]"
        />

        <div className="mt-[clamp(3rem,7vw,6rem)] flex flex-wrap items-end justify-between gap-8 text-sm leading-[1.45]">
          <p className="max-w-[460px] text-studio-paper/65">
            From strategy through execution, Yenko partners with ambitious
            founders, growth-stage teams and future-facing brands to build
            products, platforms and digital experiences that help them scale
            with clarity and compete anywhere.
          </p>

          {/* Inline cue for touch, where the rail is hidden and hover does not exist. */}
          <a
            href="#work"
            className={`group flex items-center gap-3 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.1em] ${RAIL}:hidden`}
          >
            Selected work
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
              className="transition-transform duration-[400ms] ease-out group-hover:translate-y-1"
            >
              <path d="M6.5 0v13M1 8l5.5 5.5L12 8" />
            </svg>
          </a>
        </div>
      </div>

      {/*
        Vertical scroll rail. Held clear of the Sankofa dial, which claims the
        bottom ~86px of this edge (54px ring plus its 2rem offset) — hence the
        bottom inset, which leaves at least 50px of gap at every width.
      */}
      <a
        href="#work"
        className={`group absolute right-[5vw] top-[clamp(2.5rem,5vw,4rem)] bottom-[clamp(8.5rem,13vw,11rem)] hidden flex-col items-center gap-[1.1rem] ${RAIL}:flex`}
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-studio-paper/60 transition-colors duration-[350ms] ease-out group-hover:text-studio-paper [writing-mode:vertical-rl]">
          Selected work
        </span>
        <span className="relative w-px flex-1 bg-studio-paper/20 transition-colors duration-[350ms] ease-out group-hover:bg-studio-paper/50">
          <span className="absolute -right-[2px] h-px w-[5px] bg-studio-paper opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-safe:animate-rail-tick" />
        </span>
      </a>
    </section>
  );
}
