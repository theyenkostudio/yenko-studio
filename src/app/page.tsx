import type { Metadata } from "next";
import LandingTemplate from "./components/landing";

// Title and description are inherited from the root layout; this page only
// needs to name itself as its own canonical.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return <LandingTemplate />;
}
