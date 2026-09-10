import { pageMeta } from "../data/seo";
import Contact from "../components/home/contact";
import MaskReveal from "../components/home/mask-reveal";
import CoverReveal from "../components/ui/cover-reveal";
import Sankofa from "../components/ui/sankofa";
import Belief from "../components/about/belief";
import Coordinates from "../components/about/coordinates";

export const metadata = pageMeta({
  title: "About",
  description:
    "Yenko Studio is a design and technology studio in Accra and Abuja, building websites, products and brand systems for businesses here and anywhere.",
  path: "/about",
});

const FACTS = [
  { term: "Founded", detail: "2025" },
  { term: "Based in", detail: "Accra & Abuja" },
  { term: "Working", detail: "Globally" },
];

const BELIEFS = [
  {
    claim: "Knowing what not to build is the scarce skill",
    body: "Typing code got cheap — an AI tool will ship a working app in a weekend. What stayed scarce is judgement about what deserves to exist, taste when everyone has a working prototype, and somebody accountable when it breaks in production.",
  },
  {
    claim: "Being reachable beats being impressive",
    body: "Business here is relationship-driven and WhatsApp-first. That is not a quirk to design around — it is the fastest route between a person with a problem and the people who can fix it. A studio you can actually reach is worth more than one with a better landing page.",
  },
  {
    claim: "Show the work, don't claim the specialty",
    body: "We would rather point at something live than describe a capability we have no track record in. Every project on the work page is running, named and linked — go and use it.",
  },
  {
    claim: "Ship it, don't hand over a prototype",
    body: "A project is finished when it is in production doing its job, not when a demo is approved. Anything short of that is a handover of unfinished work dressed up as a delivery.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-studio-paper text-studio-ink">
      <section className="mt-[var(--header-h)] bg-studio-ink px-[5vw] pt-[clamp(4rem,11vw,9rem)] pb-[clamp(2rem,4vw,3.5rem)] text-studio-paper">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-muted">
          The studio
        </p>

        {/* The name is the strongest thing we have to open with, and until now
            the site never said what it meant. */}
        <MaskReveal
          as="h1"
          immediate
          delay={0.3}
          lines={["Yenko means", "let's go."]}
          className="mt-[clamp(1.5rem,3.5vw,3rem)] text-[clamp(2.75rem,10.5vw,11rem)] font-medium leading-[0.9] tracking-[-0.06em]"
        />

        <p className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[48ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-studio-dim">
          A design and technology studio in Accra and Abuja, competing on taste,
          judgement and the outcomes it actually produces &mdash; for businesses
          around us, and for anyone who wants what we do.
        </p>

        <dl className="mt-[clamp(3rem,7vw,5rem)] flex flex-wrap gap-x-16 gap-y-5 border-t border-studio-paper/20 pt-6">
          {FACTS.map(({ term, detail }) => (
            <div key={term} className="flex flex-col gap-2">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-muted">
                {term}
              </dt>
              <dd className="m-0 text-[15px] tracking-[-0.01em]">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The mark, finally explained — and pointed at the work, not at us. */}
      <section className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-[clamp(2.5rem,7vw,7rem)] border-b border-studio-line px-[5vw] py-[clamp(4rem,9vw,8rem)] max-[860px]:grid-cols-1">
        {/* Same reveal as the work covers. It is its own client component, so
            importing it here costs nothing — this page stays a server
            component. */}
        <CoverReveal className="flex aspect-square items-center justify-center bg-studio-stone">
          <svg viewBox="0 0 64 64" role="img" aria-label="The Sankofa mark" className="w-[58%] text-studio-ink">
            <Sankofa />
          </svg>
        </CoverReveal>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-dim">
            The mark
          </p>
          <h2 className="mt-6 text-[clamp(1.9rem,4.2vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.05em] text-balance">
            The bird looks backward, and keeps moving.
          </h2>
          <p className="mt-6 max-w-[54ch] leading-loose text-studio-muted">
            <strong className="font-semibold text-studio-ink">Sankofa</strong> is
            an Akan symbol &mdash; a bird turning its head to retrieve what it
            left behind. It has been on every page of this site as the scroll
            dial in the corner, and until now we never said why.
          </p>
          <p className="mt-4 max-w-[54ch] leading-loose text-studio-muted">
            Most of what we are called in to do is retrieval. A codebase somebody
            walked away from. A brand that drifted three redesigns from what the
            business actually is. A site that stopped earning years ago and
            nobody wanted to open. Going back for the part worth keeping, then
            carrying it forward, is most of the job &mdash; and the name says
            where it goes from there.
          </p>
        </div>
      </section>

      <section className="bg-studio-stone px-[5vw] py-[clamp(4rem,9vw,7.5rem)]">
        <h2 className="max-w-[22ch] text-[clamp(2rem,4.6vw,4rem)] font-medium leading-[0.98] tracking-[-0.055em] text-balance">
          What we hold to.
        </h2>

        <div className="mt-[clamp(3rem,6vw,5rem)] border-t border-studio-ink">
          {BELIEFS.map((belief, i) => (
            <Belief
              key={belief.claim}
              number={String(i + 1).padStart(2, "0")}
              claim={belief.claim}
            >
              {belief.body}
            </Belief>
          ))}
        </div>
      </section>

      {/* Local and global, stated as one position rather than two. */}
      <section className="bg-studio-paper px-[5vw] py-[clamp(4rem,9vw,7.5rem)] text-studio-ink">
        <h2 className="max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.05em] text-balance">
          Rooted in two cities. Not limited to them.
        </h2>

        <p className="mt-6 max-w-[52ch] leading-loose text-studio-muted">
          One team, two countries, an hour of time between them. Close enough to
          know the businesses around us, and set up for clients who have never
          been to either city.
        </p>

        <Coordinates />

      </section>

      <Contact />
    </div>
  );
}
