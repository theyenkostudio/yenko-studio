import { notFound } from "next/navigation";
import { Metadata } from "next";
import { workItems } from "../../data/work";
import { pageMeta } from "../../data/seo";
import RevealText from "../../components/reveal-text";
import WorkBreadcrumb from "../../components/work/work-breadcrumb";
import WorkMeta from "../../components/work/work-meta";
import CaseNote from "../../components/work/case-note";
import CaseEvidence from "../../components/work/case-evidence";
import CaseOutcome from "../../components/work/case-outcome";
import ProjectPager from "../../components/work/project-pager";
import Contact from "@/app/components/home/contact";

export function generateStaticParams() {
  // Only published work gets a page. Unwritten case studies were rendering a
  // stub that nothing linked to and that we had to noindex — a page whose only
  // job was to exist. They 404 now, which is the same answer the work index
  // already gives by not listing them.
  return workItems
    .filter((item) => item.status === "live")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = workItems.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    ...pageMeta({
      title: item.client,
      description: item.summary,
      path: `/work/${item.slug}`,
    }),
  };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = workItems.find((w) => w.slug === slug);

  if (!item || item.status !== "live") notFound();

  // The pager numbers projects the way Selected Work does — by position among
  // the live entries, not among all of them. Flipping a coming-soon item to
  // live renumbers both places at once, which is the point of deriving it.
  const live = workItems.filter((w) => w.status === "live");
  const position = live.findIndex((w) => w.slug === item.slug);
  const prev = live[position - 1];
  const next = live[position + 1];
  // Forward while there is a forward; otherwise back, so the last case study
  // still hands the reader somewhere to go.
  const onward = next ?? prev;

  // The written notes and the evidence share one run of numbers, so the
  // evidence and the outcome shift up if a case study has no challenge.
  const notes = [
    item.challenge && { label: "The challenge", body: item.challenge },
    item.approach && { label: "The approach", body: item.approach },
  ].filter((n): n is { label: string; body: string } => Boolean(n));

  const pad = (n: number) => String(n).padStart(2, "0");
  const evidenceNumber = pad(notes.length + 1);
  const outcomeNumber = pad(notes.length + (item.evidence?.length ? 2 : 1));

  return (
    <div className="bg-studio-paper text-studio-ink">
      <WorkBreadcrumb
        client={item.client}
        index={position + 1}
        total={live.length}
        prevSlug={prev?.slug}
        nextSlug={next?.slug}
      />

      <section className="px-[5vw] pt-[clamp(3.5rem,7vw,6rem)]">
        <div className="">
          <RevealText
            as="h1"
            className="max-w-[900px] text-[clamp(2.75rem,6.1vw,5.5rem)] font-medium leading-[1] tracking-[-0.055em]"
          >
            {item.client}
          </RevealText>
          <RevealText
            as="p"
            className="mt-7 max-w-[680px] text-[clamp(1.0625rem,1.7vw,1.5rem)] leading-[1.5] tracking-[-0.015em] text-studio-muted"
            delay={0.1}
          >
            {item.summary}
          </RevealText>
          <WorkMeta year={item.year} services={item.services} status="Live" />
        </div>
      </section>

      <section className="px-[5vw] pt-[clamp(2.5rem,4vw,4rem)]">
        <div className="h-[clamp(220px,43vw,620px)] w-full overflow-hidden bg-studio-stone">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.thumbnail}
            alt=""
            aria-hidden="true"
            className="size-full object-cover object-top"
          />
        </div>
        {item.url && (
          <div className="mt-5 flex items-center justify-between gap-6 border-t border-studio-line pt-5">
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-studio-dim max-[860px]:truncate">
              {item.url.replace(/^https?:\/\//, "")}
            </span>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-shrink-0 items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
            >
              Visit the live site
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        )}
      </section>

      {notes.length > 0 && (
        <section className="flex flex-col gap-24 px-[5vw] pt-[clamp(4rem,10vw,8.75rem)] max-[860px]:gap-12">
          {notes.map((note, i) => (
            <CaseNote key={note.label} number={pad(i + 1)} label={note.label}>
              {note.body}
            </CaseNote>
          ))}
        </section>
      )}

      {item.evidence && item.evidence.length > 0 && (
        <CaseEvidence evidence={item.evidence} client={item.client} number={evidenceNumber} />
      )}

      {item.outcome && (
        <CaseOutcome number={outcomeNumber} flush={Boolean(item.evidence?.length)}>
          {item.outcome}
        </CaseOutcome>
      )}

      {onward && (
        <ProjectPager
          slug={onward.slug}
          client={onward.client}
          direction={next ? "next" : "prev"}
        />
      )}

      <Contact />
    </div>
  );
}
