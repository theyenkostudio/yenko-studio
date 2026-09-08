import SectionLabel from "./section-label";

export default function StudioIntro() {
  return (
    <section className="flex min-h-[82vh] flex-col bg-studio-paper px-[5vw] pt-[clamp(5.5rem,13vw,12rem)] pb-8 text-studio-ink">
      <SectionLabel number="01" label="The Studio" className="text-studio-muted" />

      <p className="mt-[clamp(4rem,12vw,9rem)] mb-auto w-full max-w-[1000px] text-[clamp(2.15rem,5.3vw,5.6rem)] leading-[0.99] tracking-[-0.065em]">
        We bring design thinking and engineering discipline into the same room
        from the start. That means less theatre, fewer hand-offs, and work that
        moves with intent.
      </p>

      <div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-studio-line pt-4 text-[10px] uppercase tracking-[0.08em] text-studio-muted">
        <span>Based in West Africa. Built for the world.</span>
        <span>Scroll to explore ↓</span>
      </div>
    </section>
  );
}
