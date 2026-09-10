/**
 * What the studio sells, in one place.
 *
 * The page and the structured data are generated from this, so a service can
 * never be described one way to a reader and another way to a crawler — which
 * is exactly how three invented engagement tiers ended up published in the
 * site's JSON-LD before anyone noticed.
 */

export interface Pillar {
  number: string;
  title: string;
  /** Who it is for, in one line. */
  forWho: string;
  /** Teaser line for the homepage, so the two surfaces cannot describe the
   *  same service differently. */
  short: string;
  body: string[];
  /** What actually arrives. Concrete, so nobody has to infer the deliverable. */
  includes: string[];
  /** Live work that proves it. Absent when there is none — never implied. */
  proof?: { label: string; href: string };
  /** Shown when there is no case study, so the gap is stated rather than hidden. */
  caveat?: string;
}

export const pillars: Pillar[] = [
  {
    number: "01",
    title: "Websites & digital presence",
    forWho: "For a business whose website has to bring in work.",
    short: "Sites with a job to do: make the right next step obvious.",
    body: [
      "A page for each thing you sell, written so a stranger can tell within seconds whether you do their version of it, and one obvious way to get in touch on every screen.",
      "Pachimond Attorneys had a single services page. It now has six practice areas, each with its own page and its own route to a consultation.",
    ],
    includes: [
      "Page structure and sitemap",
      "Copywriting",
      "Design and build",
      "Mobile, speed and search setup",
      "Launch, and training so your team can update it",
    ],
    proof: { label: "Pachimond Attorneys", href: "/work/pachimond-attorneys" },
  },
  {
    number: "02",
    title: "E-commerce",
    forWho: "For people selling real things online.",
    short: "Stores built around the product, not around the checkout.",
    body: [
      "Most stores lose the sale on the product page, not at checkout. So that is where the work goes: photography that shows the material and the fit, sizing a buyer can trust, and a page that still loads on a poor connection.",
      "Then the machinery behind it — catalogue, variants, payment, and the messages that go out once an order is placed.",
    ],
    includes: [
      "Catalogue and category structure",
      "Product pages, variants and sizing",
      "Payment setup",
      "Order and delivery notifications",
      "Analytics, so you can see what actually sells",
    ],
    proof: { label: "Styled by Aidal", href: "/work/styled-by-aidal" },
  },
  {
    number: "03",
    title: "Brand & content systems",
    forWho: "For a business that looks like three different companies across three channels.",
    short: "Voice, type and structure, so everything reads as one thing.",
    body: [
      "The rules that keep everything looking like one company: how the logo is used, which typefaces and colours, how photography is directed, and how the writing sounds.",
      "You get a system your team can work from rather than a folder of files — so the next person making a slide or a social post gets it right without asking us.",
    ],
    includes: [
      "Logo use and lockups",
      "Typography and colour",
      "Art direction for photography",
      "Tone of voice and writing guidance",
      "Templates and a short guide",
    ],
    proof: { label: "See it in both projects", href: "/work" },
  },
  {
    number: "04",
    title: "Product & internal tools",
    forWho: "For teams whose operations have outgrown a spreadsheet and a group chat.",
    short: "Internal software for teams who have outgrown the spreadsheet.",
    body: [
      "Software for how the business actually runs: admin dashboards, integrations between tools you already pay for, and small apps that replace a spreadsheet three people are editing at once.",
      "This is engineering the team has done across several industries. There is no Yenko case study for it yet — ask us and we will walk you through what we have built elsewhere.",
    ],
    includes: [
      "Admin dashboards and internal tools",
      "Integrations between systems you already use",
      "Data clean-up and migration",
      "Ongoing maintenance",
    ],
    caveat: "No Yenko case study yet. Deliberately said rather than implied.",
  },
];

export const delivery = [
  {
    tag: "Project management",
    title: "Someone answers, and it is not the developer mid-task",
    body: [
      "Every project gets one, and it is not a developer wearing a second hat for the afternoon.",
      "It is also what keeps the build moving. Most delays on small projects are coordination problems rather than technical ones — somebody has to own the plan for that not to happen.",
    ],
  },
  {
    tag: "Quality assurance",
    title: "Somebody whose job is finding what is broken",
    body: [
      "Testing is somebody's job here, not something a developer does to their own work late on a Friday. The most tested parts are the ones that carry money, enquiries and sign-ups — those are the ones that cost you when they break.",
    ],
    checks: [
      "Design built as designed, not approximately",
      "Every flow doing what it claims, including the failure cases",
      "Real behaviour on real screen sizes, not just the two we designed on",
      "Usability — can somebody who has never seen it get through",
      "Performance, because a slow site is a broken one on a poor connection",
      "Cross-browser passes before launch, not after the first complaint",
    ],
  },
];

export const rosters = [
  {
    tag: "Build",
    items: ["React", "Next.js", "React Router", "Astro", "GSAP", "Framer Motion", "Sanity.io", "Payload"],
  },
  {
    tag: "Design & working together",
    items: ["Figma", "Paper", "Slack", "Discord", "WhatsApp", "Google Workspace", "Zoho"],
  },
];
