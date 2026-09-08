export default function SankofaMark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  const src = tone === "ink" ? "/assets/sankofa-mark-ink.svg" : "/assets/sankofa-mark-paper.svg";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" aria-hidden="true" className={className} />;
}
