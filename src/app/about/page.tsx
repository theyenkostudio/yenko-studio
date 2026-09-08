"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import RevealText from "../components/reveal-text";
import CTABand from "../components/cta-band";
import SectionDivider from "../components/section-divider";

const TIMELINE = [
  {
    year: "2025",
    title: "Founded",
    body: "Yenko Studio started the way most small studios do — real client work, built properly, for people who took a chance on a young team. Pachimond Attorneys' site is from this stretch.",
  },
  {
    year: "—",
    title: "The quiet stretch",
    body: "Then the team scattered and the pipeline stopped. Not a pivot, not a rebrand — just a studio that went quiet for a while. We're not going to pretend that didn't happen.",
  },
  {
    year: "2026",
    title: "Back, on purpose",
    body: "Coming back meant deciding what Yenko actually is, not just re-hanging the old sign. Broad capability, told with more confidence, proven by real work and a flagship tool we're building for ourselves first.",
  },
];

export default function AboutPage() {
  const timelineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".timeline-item");
      const scrollDistance = window.innerHeight * (items.length * 0.9);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current as gsap.DOMTarget,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      items.forEach((item, i: number) => {
        tl.from(
          item as gsap.DOMTarget,
          { autoAlpha: 0, y: 60, duration: 0.6, ease: "power3.out" },
          i * 0.8
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <section className="px-8 pt-40 pb-24 text-center md:px-15">
        <div className="mb-6 text-xs tracking-[3px] text-ink/40">the studio</div>
        <RevealText
          as="h1"
          className="mx-auto max-w-200 text-4xl font-extrabold leading-tight text-balance md:text-6xl"
        >
          Broad capability, told with a point of view.
        </RevealText>
        <RevealText
          as="p"
          className="mx-auto mt-8 max-w-165 text-lg leading-relaxed text-ink/65"
          delay={0.1}
        >
          Not a vertical specialist, not a generalist &ldquo;we build
          anything&rdquo; — a small studio that competes on taste, judgment,
          and the outcomes it actually produces, run by people who live in
          Ghana and Nigeria and build for the businesses around them.
        </RevealText>
      </section>

      <div className="px-8 md:px-15">
        <SectionDivider tone="ink" />
      </div>

      <section
        className="flex h-screen flex-col items-center justify-center gap-10 px-8 text-center md:px-15"
        ref={timelineRef}
      >
        {TIMELINE.map((t) => (
          <div className="timeline-item max-w-165" key={t.title}>
            <div className="mb-4 text-sm tracking-wide text-ink/40">{t.year}</div>
            <h2 className="mb-5 text-3xl font-bold md:text-5xl">{t.title}</h2>
            <p className="text-lg leading-relaxed text-ink/65">{t.body}</p>
          </div>
        ))}
      </section>

      <div className="px-8 md:px-15">
        <SectionDivider tone="ink" />
      </div>

      <section className="px-8 py-24 md:px-15">
        <div className="mx-auto max-w-350">
          <RevealText as="h2" className="mb-16 text-3xl font-bold md:text-4xl">
            Why broad, not narrow
          </RevealText>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-lg font-semibold">The market changed</h3>
              <p className="text-ink/65 leading-relaxed">
                Typing code got cheap. AI tools ship a working app in a
                weekend. What&apos;s still scarce is knowing what not to
                build, having taste when everyone has a working prototype,
                and being accountable when something breaks in production.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold">Regional depth is real leverage</h3>
              <p className="text-ink/65 leading-relaxed">
                Understanding how business actually happens here —
                relationship-driven, WhatsApp-first — isn&apos;t a costume,
                it&apos;s an advantage no outside competitor or generic AI
                tool can fake.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold">Range, backed by proof</h3>
              <p className="text-ink/65 leading-relaxed">
                We&apos;d rather show the work than claim a specialty we
                don&apos;t have a track record in. See it on the{" "}
                <Link href="/work" className="underline decoration-ink/30 hover:decoration-ink">
                  Work
                </Link>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        heading="Want to work with us?"
        body="Tell us what you're building — we'll tell you honestly whether Build, Run, or Back fits."
      />
    </div>
  );
}
