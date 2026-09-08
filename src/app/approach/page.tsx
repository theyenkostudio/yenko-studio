import { Metadata } from "next";
import RevealText from "../components/reveal-text";
import CTABand from "../components/cta-band";
import SectionDivider from "../components/section-divider";
import FAQs from "../components/faq";

export const metadata: Metadata = {
  title: "Approach | Yenko Studio",
  description: "How Build, Run, and Back actually work — and how an engagement starts.",
};

const TIERS = [
  {
    id: "build",
    name: "Build",
    range: "Fixed scope · 6–12 weeks",
    forWho: "A business that needs one specific thing built right, once.",
    includes: [
      "A defined scope, agreed and priced up front — no hourly clock",
      "Web, mobile, or both, on a stack chosen for your actual needs",
      "Shipped to production, not handed off as a prototype",
    ],
    start:
      "Tell us the project on WhatsApp. We'll ask enough questions to scope it properly, then send a fixed quote.",
  },
  {
    id: "run",
    name: "Run",
    range: "Monthly retainer",
    forWho: "A business past its first build, still without a full in-house team.",
    includes: [
      "Standing technical and creative capacity — uptime, iteration, roadmap",
      "Direct access on WhatsApp, same-day response, not a ticket queue",
      "Scope that flexes month to month as the business does",
    ],
    start:
      "Usually starts as a Build that goes well enough that stopping doesn't make sense. Ask us about moving to Run once you're in.",
  },
  {
    id: "back",
    name: "Back",
    range: "Cash + equity",
    forWho: "1–3 early-stage teams a year, chosen deliberately.",
    includes: [
      "Reduced cash rate for a small equity slice",
      "The same technical and creative capacity as a Run engagement",
      "A bet on the founders, not just the idea",
    ],
    start:
      "By invitation, not application. If it's a fit, we'll bring it up — but a strong Build is usually how we meet in the first place.",
  },
];

export default function ApproachPage() {
  return (
    <div>
      <section className="px-8 pt-40 pb-20 text-center md:px-15">
        <div className="mb-6 text-xs tracking-[3px] text-ink/40">approach</div>
        <RevealText
          as="h1"
          className="mx-auto max-w-225 text-4xl font-extrabold leading-tight text-balance md:text-6xl"
        >
          Three ways to work with us — nothing else.
        </RevealText>
        <RevealText
          as="p"
          className="mx-auto mt-8 max-w-165 text-lg leading-relaxed text-ink/65"
          delay={0.1}
        >
          No custom-quote maze. Every engagement is a Build, a Run, or a
          Back — here&apos;s what&apos;s actually included in each.
        </RevealText>
      </section>

      {TIERS.map((tier) => (
        <section className="scroll-mt-24 px-8 py-16 md:px-15" id={tier.id} key={tier.id}>
          <div className="mx-auto max-w-225">
            <SectionDivider tone="ink" />
            <div className="mt-12 mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-3xl font-extrabold md:text-4xl">{tier.name}</h2>
              <span className="text-xs tracking-wide text-ink/40">{tier.range}</span>
            </div>
            <p className="mb-6 text-lg text-ink/70">{tier.forWho}</p>
            <ul className="mb-8 flex flex-col gap-3">
              {tier.includes.map((inc) => (
                <li key={inc} className="flex gap-3 text-ink/65 leading-relaxed">
                  <span className="text-green">—</span>
                  {inc}
                </li>
              ))}
            </ul>
            <p className="text-ink/70 leading-relaxed">
              <strong className="text-ink">How it starts —</strong> {tier.start}
            </p>
          </div>
        </section>
      ))}

      <FAQs />

      <CTABand />
    </div>
  );
}
