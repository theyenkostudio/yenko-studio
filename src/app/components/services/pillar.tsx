import Link from "next/link";
import type { Pillar as PillarData } from "../../data/services";
import RollingLabel from "../ui/rolling-label";

/**
 * One thing the studio builds, on the same three-lane grid the case studies
 * and beliefs use — numeral, name, argument.
 *
 * A pillar links to live work when there is some and says so plainly when
 * there is not. Silence would read as proof the reader is expected to assume.
 */
export default function Pillar({ pillar }: { pillar: PillarData }) {
  return (
    <article className="grid grid-cols-[40px_minmax(0,0.85fr)_minmax(0,1.5fr)] items-start gap-[clamp(1.25rem,3vw,2.5rem)] border-b border-studio-line py-[clamp(2rem,4vw,3rem)] max-[860px]:grid-cols-[40px_1fr]">
      <span className="pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] tabular-nums text-studio-dim">
        {pillar.number}
      </span>

      <div>
        <h3 className="text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.045em]">
          {pillar.title}
        </h3>
        <p className="mt-3.5 text-sm leading-relaxed text-studio-muted">{pillar.forWho}</p>
      </div>

      <div className="max-[860px]:col-start-2">
        {pillar.body.map((para, i) => (
          <p
            key={i}
            className="max-w-[58ch] leading-relaxed text-[#2b2a27] [&:not(:first-child)]:mt-4"
          >
            {para}
          </p>
        ))}

        {/* What actually arrives. The prose explains the thinking; this answers
            the question the prose cannot, which is "so what do I get". */}
        <ul className="mt-6 grid gap-2">
          {pillar.includes.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[14px_1fr] gap-3 text-[15px] leading-snug text-studio-muted"
            >
              <span aria-hidden="true" className="text-studio-ink">
                —
              </span>
              {item}
            </li>
          ))}
        </ul>

        {pillar.proof && (
          <Link
            href={pillar.proof.href}
            className="group mt-5 flex w-fit items-center gap-2.5 border-b border-studio-ink pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
          >
            <RollingLabel className="leading-[1.25]">{pillar.proof.label}</RollingLabel>
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" aria-hidden="true"
              className="transition-transform duration-[400ms] ease-out group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        )}

        {pillar.caveat && (
          <p className="mt-5 max-w-[46ch] text-[13px] leading-relaxed text-studio-muted">
            {pillar.caveat}
          </p>
        )}
      </div>
    </article>
  );
}
