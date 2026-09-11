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
 * act — here the CTO, since a services enquiry is a technical conversation
 * before it is a scheduling one.
 *
 * Attributed by role rather than by name, at the subject's request — which is
 * also why the portrait is dithered down to 1-bit. The quote stays first
 * person: an unnamed "I" is still a person speaking, where a rewrite into the
 * studio voice would give the section away as boilerplate.
 *
 * Ink, like every other closing band, so the page still ends dark.
 */
export default function ServicesContact({
  quote,
  role,
  org,
  image,
}: {
  quote: string;
  role: string;
  org: string;
  image: string;
}) {
  return (
    <section
      data-band="ink"
      className="border-b border-studio-paper/20 bg-studio-ink px-[5vw] py-[clamp(5rem,10vw,9rem)] text-studio-paper"
    >
      <SectionLabel label="Start A Conversation" className="text-studio-dim" />

      <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-[1fr_0.9fr] items-start gap-[clamp(2.5rem,6vw,6rem)] max-[860px]:grid-cols-1">
        <figure className="grid grid-cols-[minmax(0,280px)_minmax(0,1fr)] items-center gap-[clamp(1.5rem,3vw,2.5rem)] max-[600px]:grid-cols-1">
          {/* Same square stone plate as the Sankofa block on /about. The
              portrait is cut out of its background rather than sitting on a
              plate of its own: the source is a room photo, and a wall behind
              the figure would read as a second, brighter surface inside this
              one. Greyscale so it belongs to the palette rather than bringing
              its own. */}
          <CoverReveal className="flex aspect-square items-center justify-center bg-studio-stone max-[600px]:max-w-[220px]">
            <Image
              src={image}
              alt={`${role} at ${org}`}
              width={560}
              height={560}
              sizes="(max-width: 600px) 220px, 280px"
              className="h-auto w-full grayscale"
            />
          </CoverReveal>

          <div>
            <blockquote className="text-[clamp(1.15rem,2.2vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.04em] text-balance">
              {quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-studio-paper/20 pt-4">
              <span className="block font-semibold tracking-[-0.02em]">{role}</span>
              <span className="mt-1 block text-sm text-studio-dim">{org}</span>
            </figcaption>
          </div>
        </figure>

        <ContactDetails />
      </div>
    </section>
  );
}
