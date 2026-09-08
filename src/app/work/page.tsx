import Link from "next/link";
import { Metadata } from "next";
import { workItems } from "../data/work";
import RevealText from "../components/reveal-text";
import CTABand from "../components/cta-band";

export const metadata: Metadata = {
  title: "Work | Yenko Studio",
  description: "Real projects, honestly described — not invented case studies.",
};

export default function WorkPage() {
  return (
    <div>
      <section className="px-8 pt-40 pb-20 text-center md:px-15">
        <div className="mb-6 text-xs tracking-[3px] text-ink/40">work</div>
        <RevealText
          as="h1"
          className="mx-auto max-w-200 text-4xl font-extrabold leading-tight text-balance md:text-6xl"
        >
          The work, as it actually exists.
        </RevealText>
        <RevealText
          as="p"
          className="mx-auto mt-8 max-w-165 text-lg leading-relaxed text-ink/65"
          delay={0.1}
        >
          We&apos;d rather show one real project honestly than invent three
          polished ones. This list grows as more of it gets written up
          properly.
        </RevealText>
      </section>

      <section className="mx-auto grid max-w-350 grid-cols-1 gap-6 px-8 pb-24 md:grid-cols-2 md:px-15">
        {workItems.map((item) => {
          const isLive = item.status === "live";
          const cardClasses =
            "block border no-underline transition-colors overflow-hidden " +
            (isLive ? "border-ink/10 text-ink hover:border-ink/30" : "border-ink/10 text-ink/70");

          const Card = (
            <>
              <div className="relative aspect-video w-full overflow-hidden bg-ink/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnail}
                  alt=""
                  aria-hidden="true"
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    isLive ? "group-hover:scale-105" : "opacity-70"
                  }`}
                />
                {!isLive && (
                  <span className="absolute top-3 right-3 border border-paper/40 bg-ink/70 px-2 py-0.5 text-[10px] tracking-wide text-paper">
                    Coming soon
                  </span>
                )}
              </div>
              <div className="p-8">
                <span className="text-xs tracking-wide text-ink/40">
                  {isLive ? item.year : "In progress"}
                </span>
                <h2 className="mt-3 mb-3 text-xl font-semibold">{item.client}</h2>
                <p className="text-sm leading-relaxed text-ink/65">{item.summary}</p>
                {item.services.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.services.map((s) => (
                      <span key={s} className="border border-ink/15 px-2.5 py-1 text-xs text-ink/60">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </>
          );

          return isLive ? (
            <Link href={`/work/${item.slug}`} key={item.slug} className={`group ${cardClasses}`}>
              {Card}
            </Link>
          ) : (
            <div key={item.slug} className={cardClasses}>
              {Card}
            </div>
          );
        })}
      </section>

      <CTABand
        heading="Have a project in mind?"
        body="Tell us what you're building on WhatsApp — we'll tell you honestly whether it's a fit."
      />
    </div>
  );
}
