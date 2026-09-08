"use client";

import { motion } from "framer-motion";
import { ElementType, ReactNode } from "react";

/**
 * A single restrained reveal — the line fades and lifts once, the
 * first time it enters the viewport. No looping, no repeat.
 */
export default function RevealText({
  children,
  as: Tag = "div",
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const MotionTag = motion.create(Tag as ElementType);

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
