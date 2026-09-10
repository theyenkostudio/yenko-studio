/**
 * A delivery discipline — the people a project comes with, rather than a thing
 * a client buys separately. Kept in its own register from the build pillars for
 * that reason: mixing them would read as line items to be priced.
 */
export default function Role({
  tag,
  title,
  body,
  checks,
}: {
  tag: string;
  title: string;
  body: string[];
  checks?: string[];
}) {
  return (
    <article className="border-t border-studio-ink pt-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-studio-dim">
        {tag}
      </p>
      <h3 className="mt-4 text-[clamp(1.35rem,2.4vw,1.875rem)] font-medium leading-tight tracking-[-0.045em]">
        {title}
      </h3>

      {body.map((para, i) => (
        <p key={i} className="mt-4 max-w-[46ch] leading-relaxed text-[#2b2a27]">
          {para}
        </p>
      ))}

      {checks && (
        <ul className="mt-6 grid gap-2.5">
          {checks.map((check) => (
            <li
              key={check}
              className="grid grid-cols-[14px_1fr] gap-3 text-[15px] leading-snug text-studio-muted"
            >
              <span aria-hidden="true" className="text-studio-ink">
                —
              </span>
              {check}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
