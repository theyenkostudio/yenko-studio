import Hero from "./home/hero";
import StudioIntro from "./home/studio-intro";
import SelectedWork from "./home/selected-work";
import Capabilities from "./home/capabilities";
import Principle from "./home/principle";
import Contact from "./home/contact";
import StudioFaq from "./studio-faq";

export default function LandingTemplate() {
  return (
    <main className="overflow-x-clip bg-studio-paper text-studio-ink">
      <Hero />
      <StudioIntro />
      <SelectedWork />

      {/*
        Stacked panels. Each pins at the top of the viewport and the next one
        scrolls up to cover it — ascending z-index plus opaque backgrounds is
        the entire mechanism, no scroll interception.

        The FAQ is deliberately NOT sticky: it is the release. A pinned panel
        taller than the viewport would trap content below the fold, and the
        FAQ grid is taller than one screen.

        Below 860px every panel goes static and the page scrolls normally.
      */}
      <div className="relative">
        <div className="sticky top-0 z-[1] max-[860px]:static">
          <Capabilities />
        </div>
        <div className="sticky top-0 z-[2] max-[860px]:static">
          <Principle />
        </div>
        <div className="relative z-[3] border-t border-studio-line">
          <StudioFaq />
        </div>
      </div>

      <Contact />
    </main>
  );
}
