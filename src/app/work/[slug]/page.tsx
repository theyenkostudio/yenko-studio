import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { workItems } from "../../data/work";
import RevealText from "../../components/reveal-text";
import CTABand from "../../components/cta-band";

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
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
    title: `${item.client} | Yenko Studio Work`,
    description: item.summary,
  };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = workItems.find((w) => w.slug === slug);

  if (!item) notFound();

  if (item.status !== "live") {
    return (
      <div>
        <section className="px-8 pt-40 pb-24 text-center md:px-15">
          <RevealText as="h1" className="text-4xl font-extrabold md:text-6xl">
            {item.client}
          </RevealText>
          <RevealText
            as="p"
            className="mx-auto mt-8 max-w-165 text-lg leading-relaxed text-ink/65"
            delay={0.1}
          >
            {item.summary}
          </RevealText>
          <Link
            href="/work"
            className="mt-10 inline-block text-sm tracking-wide underline decoration-ink/30 hover:decoration-ink"
          >
            ← Back to work
          </Link>
        </section>
        <CTABand />
      </div>
    );
  }

  return (
    <div>
      <section className="px-8 pt-40 pb-20 md:px-15">
        <Link
          href="/work"
          className="mb-10 inline-block text-sm tracking-wide underline decoration-ink/30 hover:decoration-ink"
        >
          ← Back to work
        </Link>
        <div className="mb-6 flex flex-wrap gap-4 text-xs tracking-wide text-ink/40">
          <span>{item.year}</span>
          {item.services.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <RevealText as="h1" className="max-w-225 text-4xl font-extrabold leading-tight md:text-6xl">
          {item.client}
        </RevealText>
        <RevealText
          as="p"
          className="mt-6 max-w-165 text-lg leading-relaxed text-ink/65"
          delay={0.1}
        >
          {item.summary}
        </RevealText>
        <div className="mt-12 aspect-21/9 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.thumbnail} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-sm tracking-wide underline decoration-ink/30 hover:decoration-ink"
          >
            Visit the live site →
          </a>
        )}
      </section>

      <section className="mx-auto grid max-w-350 grid-cols-1 gap-12 px-8 pb-24 md:grid-cols-3 md:px-15">
        {item.challenge && (
          <div>
            <h2 className="mb-3 text-lg font-semibold">The challenge</h2>
            <p className="text-ink/65 leading-relaxed">{item.challenge}</p>
          </div>
        )}
        {item.approach && (
          <div>
            <h2 className="mb-3 text-lg font-semibold">The approach</h2>
            <p className="text-ink/65 leading-relaxed">{item.approach}</p>
          </div>
        )}
        {item.outcome && (
          <div>
            <h2 className="mb-3 text-lg font-semibold">The outcome</h2>
            <p className="text-ink/65 leading-relaxed">{item.outcome}</p>
          </div>
        )}
      </section>

      <CTABand
        heading="Want something like this, done right?"
        body="Tell us about the project on WhatsApp — we'll tell you honestly whether it's a Build, a Run, or neither."
      />
    </div>
  );
}
