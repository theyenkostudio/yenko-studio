import SectionLabel from "./section-label";
import MaskReveal from "./mask-reveal";

const capabilities = [
  {
    number: "01",
    title: "Product & platform",
    description:
      "Web products, internal tools and software that have to hold up after launch.",
  },
  {
    number: "02",
    title: "Digital presence",
    description:
      "Brand systems and websites with a clear job: make the right next step obvious.",
  },
  {
    number: "03",
    title: "Technical partnership",
    description:
      "An embedded senior team for companies that need consistent product momentum.",
  },
];

/**
 * First panel of the stack, so its content is sized to fit exactly one
 * viewport — anything taller would be unreachable once it pins.
 */
export default function Capabilities() {
  return (
    <section className="flex h-[100svh] flex-col justify-center border-t border-studio-line bg-studio-paper px-[5vw] py-[clamp(4rem,7vw,6rem)] text-studio-ink max-[860px]:h-auto max-[860px]:py-[clamp(5rem,10vw,8rem)]">
      <SectionLabel number="03" label="Capabilities" className="text-studio-muted" />

      <MaskReveal
        lines={["The right work,", "done properly."]}
        className="mt-[clamp(2rem,4vw,3.5rem)] max-w-[16ch] text-[clamp(1.7rem,3.4vw,3.2rem)] leading-[0.95] tracking-[-0.055em]"
      />

      <div className="mt-[clamp(2rem,4vw,3.5rem)] border-t border-studio-ink">
        {capabilities.map((item) => (
          <article
            key={item.number}
            className="grid grid-cols-[56px_minmax(170px,0.8fr)_1.2fr] items-baseline gap-x-8 gap-y-3 border-b border-studio-line py-[clamp(1rem,2.2vw,1.9rem)] max-[860px]:grid-cols-[40px_1fr] max-[860px]:items-start"
          >
            <span className="text-[10px] tracking-[0.1em] text-studio-muted">
              {item.number}
            </span>
            <h3 className="text-[clamp(1.25rem,2.2vw,2.1rem)] tracking-[-0.045em]">
              {item.title}
            </h3>
            <p className="max-w-[46ch] text-[13px] leading-[1.5] text-studio-muted max-[860px]:col-start-2">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
