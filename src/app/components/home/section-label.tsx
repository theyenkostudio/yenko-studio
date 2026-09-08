/**
 * The index label that opens every section: number on one side,
 * name pushed to the other. Always spans the full width of its band.
 */
export default function SectionLabel({
  number,
  label,
  className = "",
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-baseline justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.12em] ${className}`}
    >
      <span>{number}</span>
      <span>{label}</span>
    </div>
  );
}
