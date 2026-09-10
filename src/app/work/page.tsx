import { workItems } from "../data/work";
import { pageMeta } from "../data/seo";
import Contact from "../components/home/contact";
import WorkEntry from "../components/work/work-entry";
import MaskReveal from "../components/home/mask-reveal";

export const metadata = pageMeta({
  title: "Work",
  description:
    "Websites, web apps and custom software built by Yenko Studio for clients across Ghana, Nigeria and beyond — with what we did and why.",
  path: "/work",
});

/** Stated in the masthead rather than counted from the work, so a short list
 *  never reads as the page apologising for itself. */
const FACTS = [
  { term: "Based in", detail: "Accra & Abuja" },
  { term: "Practice", detail: "Web, e-commerce, brand systems" },
];

export default function WorkPage() {
  // Only published work. Cataloguing what hasn't been written yet turns the
  // index into a list of absences — and a placeholder card reads as a card
  // that failed to load, not as honesty about the pipeline.
  const live = workItems.filter((item) => item.status === "live");

  return (
    <div className="bg-studio-paper text-studio-ink">
      {/*
        A top-level destination, so it opens on ink at full display scale and
        carries no section numeral. Numbering belongs to the homepage's single
        sequence; borrowing it here is what makes a main page read as somebody
        else's subsection.
      */}
      <section className="mt-[var(--header-h)] bg-studio-ink px-[5vw] pt-[clamp(4rem,11vw,9rem)] pb-[clamp(2rem,4vw,3.5rem)] text-studio-paper">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-muted">
          Work
        </p>

        {/*
          The studio's opening gesture, same as the homepage hero. `immediate`
          because this is above the fold on load — waiting for the viewport
          would mean the heading is only ever seen already-arrived. The delay
          clears the page transition so the lines rise into a settled page.

          Lines are authored, never auto-split, so `text-balance` comes off:
          the breaks are the decision now, not something the browser guesses.

          Two lines rather than three, and the long one carries the phrase that
          matters. Short lines cannot fill a wide measure at any sane size — at
          this width "Work that" alone would need ~315px type to span it — so
          the break, not the font size, is what was leaving the right half
          empty. The ceiling is raised to sit nearer the homepage hero's scale.
        */}
        <MaskReveal
          as="h1"
          immediate
          delay={0.3}
          lines={["Work that", "earns its keep."]}
          className="mt-[clamp(1.5rem,3.5vw,3rem)] text-[clamp(2.75rem,10.5vw,11rem)] font-medium leading-[0.9] tracking-[-0.06em]"
        />

        <p className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[46ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-studio-dim">
          Sites and products built to do a job &mdash; bring in the right
          clients, sell the goods, hold up under real use. Each one is live. Go
          and use it.
        </p>

        <dl className="mt-[clamp(3rem,7vw,5.5rem)] flex flex-wrap gap-x-16 gap-y-5 border-t border-studio-paper/20 pt-6">
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

      {live.map((item, index) => (
        <WorkEntry key={item.slug} item={item} index={index} />
      ))}

      {/* The homepage's closing band. No numeral: passing none is how a page
          outside the homepage sequence opts out. */}
      <Contact />
    </div>
  );
}
