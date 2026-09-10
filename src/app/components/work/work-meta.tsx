import { LABEL } from "./case-lane";

/**
 * Year, services and status as a labelled rail rather than the loose run of
 * dimmed spans this page used to open with — the reader can tell which value
 * is which without inferring it from order.
 *
 * Narrow screens turn it into stacked label/value rows; the label column is
 * a fixed width there so the values still form a lane.
 */
export default function WorkMeta({
  year,
  services,
  status,
}: {
  year: string;
  services: string[];
  status: string;
}) {
  const entries = [
    { label: "Year", value: year },
    { label: "Services", value: services.join(" / ") },
    { label: "Status", value: status },
  ].filter((entry) => entry.value);

  return (
    <dl className="mt-[clamp(2rem,4vw,4.5rem)] flex border-b border-studio-line pb-7 max-[860px]:mt-9 max-[860px]:flex-col max-[860px]:border-t max-[860px]:pb-0">
      {entries.map(({ label, value }) => (
        <div
          key={label}
          className="flex w-[200px] flex-shrink-0 flex-col gap-2.5 [&:nth-child(2)]:w-[320px] max-[860px]:w-full max-[860px]:flex-row max-[860px]:items-baseline max-[860px]:gap-4 max-[860px]:border-b max-[860px]:border-studio-line max-[860px]:py-3.5 max-[860px]:[&:nth-child(2)]:w-full"
        >
          <dt className={`${LABEL} font-medium text-studio-dim max-[860px]:w-[90px] max-[860px]:flex-shrink-0`}>
            {label}
          </dt>
          <dd className="text-[15px] tracking-[-0.01em] max-[860px]:text-sm">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
