"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

export default function LineReveal({
  lines,
  as: Tag = "h2",
  className,
  immediate = false,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  immediate?: boolean;
}) {
  return <Tag className={`line-reveal ${className ?? ""}`}>
    {lines.map((text, index) => <span className="line-reveal__mask" key={text}>
      <motion.span
        className="line-reveal__line"
        initial={{ y: "108%" }}
        animate={immediate ? { y: 0 } : undefined}
        whileInView={immediate ? undefined : { y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 1.05, delay: (immediate ? 0.38 : 0) + index * 0.13, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {text}
      </motion.span>
    </span>)}
  </Tag>;
}
