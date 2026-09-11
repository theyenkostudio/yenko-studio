"use client";

import { useEffect, useState } from "react";

/**
 * Live Accra and Abuja time, in one place.
 *
 * The IANA zone for Abuja is "Africa/Lagos" — that identifier covers all of
 * Nigeria, Abuja included, and there is no "Africa/Abuja". Renaming it to
 * match the label would not correct the clock, it would break it. This is the
 * only place that identifier should appear; everywhere else says Abuja.
 *
 * Renders a placeholder until hydration, since the viewer's own clock is the
 * only source of truth and the server has no business guessing it.
 */
const format = (timeZone: string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

export const PLACEHOLDER = "--:--";

export function useStudioTimes() {
  const [times, setTimes] = useState({
    accra: PLACEHOLDER,
    abuja: PLACEHOLDER,
  });

  useEffect(() => {
    const update = () =>
      setTimes({ accra: format("Africa/Accra"), abuja: format("Africa/Lagos") });
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return times;
}
