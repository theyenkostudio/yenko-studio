import ServicesContact from "../components/services/services-contact";
import MaskReveal from "../components/home/mask-reveal";
import Pillar from "../components/services/pillar";
import Role from "../components/services/role";
import { pillars, delivery, rosters } from "../data/services";
import { pageMeta } from "../data/seo";
import { SITE_URL } from "../data/links";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Websites, e-commerce, brand systems and custom software from Yenko Studio in Accra and Abuja — with a dedicated product manager and quality assurance on every project.",
  path: "/services",
});

/** Approved by the person it speaks for. First person on purpose: the studio
 *  speaks everywhere else on this page, so the close should not. Attributed by
 *  role rather than name at his request, which is also why the portrait is a
 *  cut-out rather than a headshot. */
const CLOSER = {
  quote:
    "We are a young studio, and we build like it: close to the work, quick to answer, and careful with anything that carries your name.",
  role: "CTO",
  org: "Yenko Studio",
  image: "/assets/pm-portrait.png",
};

const FACTS = [
  { term: "Based in", detail: "Accra & Abuja" },
  { term: "Working", detail: "Globally" },
  { term: "Engagements", detail: "Project or ongoing" },
];

/**
 * Machine-readable twin of the page. Generated from the same data the reader
 * sees, so the two cannot disagree.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Yenko Studio",
  url: `${SITE_URL}/services`,
  areaServed: ["Ghana", "Nigeria", "Worldwide"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: pillars.map((pillar) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: pillar.title,
        description: pillar.forWho,
      },
    })),
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-studio-paper text-studio-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mt-[var(--header-h)] bg-studio-ink px-[5vw] pt-[clamp(4rem,11vw,9rem)] pb-[clamp(2rem,4vw,3.5rem)] text-studio-paper">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-muted">
          Services
        </p>

        <MaskReveal
          as="h1"
          immediate
          delay={0.3}
          lines={["What we build,", "and who builds it."]}
          className="mt-[clamp(1.5rem,3.5vw,3rem)] text-[clamp(2.75rem,10.5vw,11rem)] font-medium leading-[0.9] tracking-[-0.06em]"
        />

        <p className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[52ch] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-studio-dim">
          We specialize in building digital products, with a strong focus on the
          technical expertise that brings them to life.
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

      <section className="px-[5vw] py-[clamp(4rem,9vw,7.5rem)]">
        <h2 className="max-w-[20ch] text-[clamp(2rem,4.6vw,4rem)] font-medium leading-[0.98] tracking-[-0.055em] text-balance">
          What we build.
        </h2>
        <p className="mt-6 max-w-[56ch] text-[clamp(1rem,1.3vw,1.125rem)] leading-loose text-studio-muted">
          Four areas of work, taken from the first conversation through to
          something live and doing its job.
        </p>

        <div className="mt-[clamp(3rem,6vw,5rem)] border-t border-studio-ink">
          {pillars.map((pillar) => (
            <Pillar key={pillar.number} pillar={pillar} />
          ))}
        </div>
      </section>

      <section className="bg-studio-stone px-[5vw] py-[clamp(4rem,9vw,7.5rem)]">
        <h2 className="max-w-[20ch] text-[clamp(2rem,4.6vw,4rem)] font-medium leading-[0.98] tracking-[-0.055em] text-balance">
          And who builds it.
        </h2>
        <p className="mt-6 max-w-[56ch] text-[clamp(1rem,1.3vw,1.125rem)] leading-loose text-studio-muted">
          Every project has a product manager and a tester assigned to it. That
          is standard, not an upgrade.
        </p>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(2rem,5vw,4rem)]">
          {delivery.map((role) => (
            <Role key={role.tag} {...role} />
          ))}
        </div>
      </section>

      <section className="px-[5vw] py-[clamp(4rem,9vw,7.5rem)]">
        <h2 className="max-w-[20ch] text-[clamp(2rem,4.6vw,4rem)] font-medium leading-[0.98] tracking-[-0.055em] text-balance">
          Our tech and tools.
        </h2>
        <p className="mt-6 max-w-[56ch] text-[clamp(1rem,1.3vw,1.125rem)] leading-loose text-studio-muted">
          What we build with, and what we use to work together. This is where
          we are already fluent rather than where we stop — the language is
          usually the smallest decision on a project.
        </p>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(2rem,5vw,4rem)]">
          {rosters.map(({ tag, items }) => (
            <div key={tag}>
              <p className="border-b border-studio-line pb-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-dim">
                {tag}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="border border-studio-line px-3 py-1.5 text-sm tracking-[-0.01em]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ServicesContact {...CLOSER} />
    </div>
  );
}
