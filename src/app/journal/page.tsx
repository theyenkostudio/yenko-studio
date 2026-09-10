import { journalPosts } from "../data/journal";
import { pageMeta } from "../data/seo";
import Contact from "../components/home/contact";
import MaskReveal from "../components/home/mask-reveal";
import JournalLead from "../components/journal/journal-lead";
import JournalArchive from "../components/journal/journal-archive";

export const metadata = pageMeta({
  title: "Journal",
  description:
    "Notes on design, engineering and running a digital product studio in West Africa, written by the team doing the work.",
  path: "/journal",
});

const FACTS = [
  { term: "Written by", detail: "The team doing the work" },
  { term: "Subjects", detail: "Design, engineering, running a studio" },
];

export default function JournalPage() {
  // Ordered by date rather than by position in the array, so the lead is
  // always the newest note however the data file happens to be arranged.
  const ordered = [...journalPosts].sort(
    (a, b) => Date.parse(b.published) - Date.parse(a.published),
  );
  const [latest, ...earlier] = ordered;

  return (
    <div className="bg-studio-paper text-studio-ink">
      <section className="mt-[var(--header-h)] bg-studio-ink px-[5vw] pt-[clamp(4rem,11vw,9rem)] pb-[clamp(2rem,4vw,3.5rem)] text-studio-paper">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-muted">
          Journal
        </p>

        <MaskReveal
          as="h1"
          immediate
          delay={0.3}
          lines={["This is the", "company brain."]}
          className="mt-[clamp(1.5rem,3.5vw,3rem)] text-[clamp(2.75rem,10.5vw,11rem)] font-medium leading-[0.9] tracking-[-0.06em]"
        />

        <p className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[52ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-studio-dim">
          Where the studio thinks out loud &mdash; how we design, how we build,
          how we run the business, and what we are learning while we do it.
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

      {latest && <JournalLead post={latest} />}
      <JournalArchive posts={earlier} />

      <Contact />
    </div>
  );
}
