"use client";

import Link from "next/link";

export default function AnnouncementBanner() {
  return (
    <Link href="/journal" className="announcement-banner">
      <div className="announcement-content">
        <span className="announcement-label">WE&apos;RE BACK</span>
        <span className="announcement-text">
          Yenko Studio is reviving — see what we&apos;re building
        </span>
        <span className="announcement-arrow">→</span>
      </div>
    </Link>
  );
}
