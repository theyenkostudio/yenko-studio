import Link from "next/link";
import { Metadata } from "next";
import { journalPosts } from "../data/journal";
import RevealText from "../components/reveal-text";
import CTABand from "../components/cta-band";

export const metadata: Metadata = {
  title: "Journal | Yenko Studio",
  description: "Building in public — starting with the tool we're building for ourselves.",
};

export default function JournalPage() {
  return (
    <div>
      <section className="px-8 pt-40 pb-20 text-center md:px-15">
        <div className="mb-6 text-xs tracking-[3px] text-ink/40">journal</div>
        <RevealText
          as="h1"
          className="mx-auto max-w-200 text-4xl font-extrabold leading-tight text-balance md:text-6xl"
        >
          Building in public.
        </RevealText>
        <RevealText
          as="p"
          className="mx-auto mt-8 max-w-165 text-lg leading-relaxed text-ink/65"
          delay={0.1}
        >
          Notes from the revival — starting with the WhatsApp tool
          we&apos;re building for our own sales process before we ever sell
          it to anyone else.
        </RevealText>
      </section>

      <section className="mx-auto flex max-w-225 flex-col gap-6 px-8 pb-24 md:px-15">
        {journalPosts.map((post) => (
          <Link
            href={`/journal/${post.slug}`}
            key={post.slug}
            className="block border border-ink/10 p-8 text-ink no-underline transition-colors hover:border-ink/30"
          >
            <span className="text-xs tracking-wide text-ink/40">{post.date}</span>
            <h2 className="mt-3 mb-3 text-2xl font-bold">{post.title}</h2>
            <p className="mb-5 text-ink/65 leading-relaxed">{post.excerpt}</p>
            <span className="text-sm tracking-wide underline decoration-ink/30">Read →</span>
          </Link>
        ))}
      </section>

      <CTABand />
    </div>
  );
}
