"use client";

import { useEffect, useState } from "react";

const format = (timeZone: string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

/**
 * Live Accra and Abuja time. Renders a placeholder on the server and fills in
 * after hydration — the client's clock is the only source of truth here.
 *
 * The IANA zone stays "Africa/Lagos": that identifier covers all of Nigeria,
 * Abuja included. There is no "Africa/Abuja" zone, so renaming it would break
 * the clock rather than correct it.
 */
export default function StudioClock() {
  const [times, setTimes] = useState({ accra: "--:--", abuja: "--:--" });

  useEffect(() => {
    const update = () =>
      setTimes({ accra: format("Africa/Accra"), abuja: format("Africa/Lagos") });
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums tracking-[0.02em]">
      {times.accra} Accra &nbsp;·&nbsp; {times.abuja} Abuja
    </span>
  );
}
