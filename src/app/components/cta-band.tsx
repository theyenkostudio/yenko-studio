import SectionDivider from "./section-divider";

const WHATSAPP_URL = "https://wa.me/message/MFCTDFBXVE7ZK1";

export default function CTABand({
  heading = "Talk to us on WhatsApp",
  body = "That's genuinely where the studio runs from — tell us what you're building and where you are with it. A real person answers.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="bg-paper px-8 py-24 md:px-15">
      <SectionDivider tone="ink" />
      <div className="mx-auto max-w-160 pt-16 text-center">
        <h2 className="text-3xl font-bold leading-tight text-balance md:text-5xl">{heading}</h2>
        <p className="mx-auto mt-6 max-w-120 text-base leading-relaxed text-ink/65">{body}</p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex h-13 items-center gap-2.5 border border-ink px-7 text-sm font-medium tracking-wide text-ink no-underline transition-colors hover:bg-ink hover:text-paper"
        >
          <span className="inline-block h-1.75 w-1.75 flex-none rounded-full bg-green" />
          Start on WhatsApp
          <span aria-hidden="true">→</span>
        </a>
        <div className="mt-8 flex justify-center gap-6 text-sm tracking-wide text-ink/50">
          <a href="/approach#build" className="hover:text-ink">Build</a>
          <a href="/approach#run" className="hover:text-ink">Run</a>
          <a href="/approach#back" className="hover:text-ink">Back</a>
        </div>
      </div>
    </section>
  );
}
