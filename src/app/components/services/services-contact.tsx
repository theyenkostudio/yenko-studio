import Image from "next/image";
import SectionLabel from "../home/section-label";
import ContactDetails from "../home/contact-details";
import CoverReveal from "../ui/cover-reveal";

/**
 * The services page's closing band, in place of the studio's usual one.
 *
 * Everywhere else the page ends on a statement — "Are you ready to build?" —
 * because the reader has been looking at work or at ideas. Here they have just
 * read what the studio sells and who delivers it, so the honest close is the
 * person they would actually be dealing with, beside the details they need to
 * act. The claim on this page is that a real project manager answers; ending on
 * his face is the cheapest possible proof of it.
 *
 * Ink, like every other closing band, so the page still ends dark.
 */
export default function ServicesContact({
  quote,
  name,
  role,
  image,
}: {
  quote: string;
  name: string;
  role: string;
  image: string;
}) {
  return (
    <section
      data-band="ink"
      className="border-b border-studio-paper/20 bg-studio-ink px-[5vw] py-[clamp(5rem,10vw,9rem)] text-studio-paper"
    >
      <SectionLabel label="Start A Conversation" className="text-studio-dim" />

      <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-[1fr_0.9fr] items-start gap-[clamp(2.5rem,6vw,6rem)] max-[860px]:grid-cols-1">
        <figure className="grid grid-cols-[minmax(0,200px)_minmax(0,1fr)] items-center gap-[clamp(1.5rem,3vw,2.5rem)] max-[600px]:grid-cols-1">
          {/* A cut-out on white, so it keeps its own plate rather than being
              blended into the ink — the same call as the evidence frames. */}
          <CoverReveal className="border border-studio-paper/20 bg-white max-[600px]:max-w-[180px]">
            <Image
              src={image}
              alt={`${name}, ${role.toLowerCase()} at Yenko Studio`}
              width={500}
              height={500}
              sizes="(max-width: 600px) 180px, 200px"
              className="h-auto w-full"
            />
          </CoverReveal>

          <div>
            <blockquote className="text-[clamp(1.15rem,2.2vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.04em] text-balance">
              {quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-studio-paper/20 pt-4">
              <span className="block font-semibold tracking-[-0.02em]">{name}</span>
              <span className="mt-1 block text-sm text-studio-dim">{role}</span>
            </figcaption>
          </div>
        </figure>

        <ContactDetails />
      </div>
    </section>
  );
}
