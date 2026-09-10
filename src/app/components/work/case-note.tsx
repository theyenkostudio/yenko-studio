import CaseLane from "./case-lane";

/** A written section of the case study — challenge, approach. */
export default function CaseNote({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: string;
}) {
  return (
    <CaseLane number={number} label={label}>
      <p className="max-w-[700px] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-relaxed tracking-[-0.015em]">
        {children}
      </p>
    </CaseLane>
  );
}
