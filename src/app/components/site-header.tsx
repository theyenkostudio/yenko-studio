"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SankofaMark from "./sankofa-mark";
import MenuToggle from "./menu-toggle";
import RollingLabel from "./ui/rolling-label";

const NAV_LINKS = [
  { href: "/", label: "Home", number: "01" },
  { href: "/work", label: "Work", number: "02" },
  { href: "/about", label: "About", number: "03" },
  { href: "/approach", label: "Approach", number: "04" },
  { href: "/journal", label: "Journal", number: "05" },
];

const WHATSAPP_URL = "https://wa.me/message/MFCTDFBXVE7ZK1";

function LocalTimes() {
  const [times, setTimes] = useState({ accra: "--:--", lagos: "--:--" });
  useEffect(() => {
    const update = () => setTimes({
      accra: new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Accra", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()),
      lagos: new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()),
    });
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);
  return <div className="studio-menu__times"><div><span>Accra</span><strong>{times.accra}</strong></div><div><span>Lagos</span><strong>{times.lagos}</strong></div></div>;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [menuOpen]);

  return <header className={`site-header fixed left-0 right-0 z-100 flex items-center justify-between ${pathname === "/" ? "site-header--home" : ""} ${scrolled ? "site-header--scrolled" : ""} ${menuOpen ? "site-header--menu" : ""} top-0`}>
    <Link href="/" className="site-header__brand flex items-center gap-3" aria-label="Yenko Studio, home"><SankofaMark className="h-5 w-5" tone={(pathname === "/" && !scrolled) || menuOpen ? "paper" : "ink"} /><span>YENKO STUDIO</span></Link>
    <MenuToggle open={menuOpen} onClick={() => setMenuOpen((open) => !open)} />
    <AnimatePresence>
      {menuOpen && <motion.div className="studio-menu" data-lenis-prevent initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: .62, ease: [0.76, 0, 0.24, 1] }}>
        <nav className="studio-menu__nav" aria-label="Primary navigation">{NAV_LINKS.map((link, index) => <motion.div key={link.href} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .14 + index * .065, duration: .45, ease: [0.22, 1, 0.36, 1] }}><Link href={link.href} className="group"><span>{link.number}</span><RollingLabel className="leading-[1.15]">{link.label}</RollingLabel></Link></motion.div>)}</nav>
        <div className="studio-menu__foot"><div><span>Start a conversation</span><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="mailto:hello@yenko.studio">hello@yenko.studio</a></div><div><span>Studio time</span><LocalTimes /></div><div><span>Elsewhere</span><a href="https://www.linkedin.com/company/theyenkostudio" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div>
      </motion.div>}
    </AnimatePresence>
  </header>;
}
