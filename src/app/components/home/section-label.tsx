/**
 * The index label that opens every section: number on one side,
 * name pushed to the other. Always spans the full width of its band.
 *
 * The number is optional because it only means something inside the homepage's
 * single numbered sequence. A section reused on a top-level page keeps the
 * label and drops the numeral — printing "06" on a page that has no 01 is what
 * makes a main page read as somebody else's subsection.
 */
export default function SectionLabel({
  number,
  label,
  className = "",
}: {
  number?: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-baseline justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.12em] ${className}`}
    >
      {number && <span>{number}</span>}
      <span>{label}</span>
    </div>
  );
}
