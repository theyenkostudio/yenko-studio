"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function MenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`site-header__toggle ${open ? "is-open" : ""}`} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
    <span className="site-header__toggle-label" aria-hidden="true"><AnimatePresence mode="wait" initial={false}><motion.span key={open ? "close" : "menu"} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .16 }}>{open ? "CLOSE" : "MENU"}</motion.span></AnimatePresence></span>
    <span className="site-header__toggle-mark" aria-hidden="true"><i /><i /></span>
  </button>;
}
