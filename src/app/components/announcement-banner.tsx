"use client";

import Link from "next/link";

export default function AnnouncementBanner() {
  return (
    <Link href="/partner" className="announcement-banner">
      <div className="announcement-content">
        <span className="announcement-label">NOW HIRING</span>
        <span className="announcement-text">
          Earn commissions by connecting us with clients
        </span>
        <span className="announcement-arrow">→</span>
      </div>
    </Link>
  );
}
