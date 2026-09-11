"use client";

import { useStudioTimes } from "../ui/use-studio-times";

/** Accra and Abuja on one line, for the contact ledger. */
export default function StudioClock() {
  const { accra, abuja } = useStudioTimes();

  return (
    <span className="tabular-nums tracking-[0.02em]">
      {accra} Accra &nbsp;·&nbsp; {abuja} Abuja
    </span>
  );
}
