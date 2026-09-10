"use client";

import { useEffect, useState } from "react";

/**
 * Whether this visitor asked for reduced motion.
 *
 * Starts `true` on purpose. The server cannot know the answer, so the first
 * render has to be the safe one — anything that defaults to "motion is fine"
 * plays at people who opted out for the frame or two before React catches up.
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
