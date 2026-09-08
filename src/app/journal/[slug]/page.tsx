import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { journalPosts } from "../../data/journal";
import RevealText from "../../components/reveal-text";
import CTABand from "../../components/cta-band";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} | Yenko Studio Journal`, description: post.excerpt };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="px-8 pt-40 pb-24 md:px-15">
      <div className="mx-auto max-w-165">
        <Link
          href="/journal"
          className="mb-10 inline-block text-sm tracking-wide underline decoration-ink/30 hover:decoration-ink"
        >
          ← Back to journal
        </Link>
        <span className="block text-xs tracking-wide text-ink/40">{post.date}</span>
        <RevealText as="h1" className="mt-4 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">
          {post.title}
        </RevealText>
        <div className="flex flex-col gap-6 text-lg leading-relaxed text-ink/75">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
      <div className="mt-24">
        <CTABand
          heading="Selling the same way?"
          body="If your business also runs on WhatsApp, we'd like to hear how you're managing it — and eventually, show you what we built."
        />
      </div>
    </article>
  );
}
