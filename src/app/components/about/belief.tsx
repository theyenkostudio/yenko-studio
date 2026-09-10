/**
 * One thing the studio holds to, on the same three-lane grid the case study
 * uses — numeral, claim, argument. Numbered because they are a set the reader
 * works through, not a ranking.
 */
export default function Belief({
  number,
  claim,
  children,
}: {
  number: string;
  claim: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[40px_minmax(0,0.8fr)_minmax(0,1.6fr)] items-start gap-[clamp(1.25rem,3vw,2.5rem)] border-b border-studio-line py-[clamp(1.75rem,3.5vw,2.75rem)] max-[860px]:grid-cols-[40px_1fr]">
      <span className="pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] tabular-nums text-studio-dim">
        {number}
      </span>
      <h3 className="text-[clamp(1.15rem,2vw,1.6rem)] font-medium leading-tight tracking-[-0.04em]">
        {claim}
      </h3>
      <p className="max-w-[56ch] leading-relaxed text-studio-muted max-[860px]:col-start-2">
        {children}
      </p>
    </div>
  );
}
