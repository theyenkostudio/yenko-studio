/**
 * Evidence is the proof attached to a claim in the case study — the thing
 * that turns "we built a consultation flow" into something a reader can
 * check. Which medium a piece of evidence uses is not a styling choice:
 *
 *   still — a structural claim. "Six practice areas" is proved completely
 *           by one frame; motion would add nothing.
 *   clip  — a behavioural claim. A form that routes to a person looks
 *           identical to one that routes nowhere until you press submit,
 *           so a still literally cannot make the claim.
 *
 * `src` is optional on both. Until the capture exists the component renders
 * its own slot with the shooting spec, so the section ships before the
 * screenshots do and fills in by adding a path.
 */
interface EvidenceBase {
  /** The claim this proves, stated as a claim — not a description of the image. */
  claim: string;
  /** One sentence of substantiating detail. */
  detail: string;
  /** Shown in the frame's address bar, so the reader can see where it came from. */
  url: string;
}

export interface EvidenceStill extends EvidenceBase {
  kind: "still";
  src?: string;
  alt?: string;
}

export interface EvidenceClip extends EvidenceBase {
  kind: "clip";
  /** WebM first; MP4 is the Safari-and-older fallback. */
  webm?: string;
  mp4?: string;
  /** Also the reduced-motion still — so that path shows a frame, not a gap. */
  poster?: string;
  duration: string;
}

export type Evidence = EvidenceStill | EvidenceClip;

export interface WorkItem {
  slug: string;
  client: string;
  year: string;
  summary: string;
  services: string[];
  status: "live" | "coming-soon";
  thumbnail: string;
  url?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  /** Proof for the claims above. Omitted entirely on work with nothing to show yet. */
  evidence?: Evidence[];
}

export const workItems: WorkItem[] = [
  {
    slug: "pachimond-attorneys",
    client: "Pachimond Attorneys",
    year: "2024",
    summary:
      "A marketing and lead-generation site for a Port Harcourt law firm — six practice areas, a working consultation pipeline, and a voice serious enough for the clients they actually take.",
    services: ["Web", "Brand voice", "Content structure"],
    status: "live",
    thumbnail: "/assets/pachimond-cover.png",
    url: "https://pachimondattorneys.com",
    challenge:
      "A firm doing real corporate and commercial work had a web presence that undersold it — no clear practice-area structure, no consultation path, nothing that read as credible to the kind of client they wanted more of.",
    approach:
      "Built a clean, fast Next.js site around six named practice areas, a blog for real legal commentary, and a consultation flow that actually routes to a person — no dead-end contact forms.",
    outcome:
      "A site that functions as the firm's first impression, not an afterthought — practice pages, testimonials, and a consultation form doing the job a receptionist used to do alone.",
    evidence: [
      {
        kind: "still",
        claim: "Six practice areas, each with its own page",
        detail:
          "The structure the old site never had. Corporate, commercial, litigation, property, employment, family.",
        url: "pachimondattorneys.com/practice-areas",
      },
      {
        kind: "still",
        claim: "A blog carrying real legal commentary",
        detail:
          "Written by the firm rather than outsourced, indexed and searchable from launch.",
        url: "pachimondattorneys.com/insights",
      },
      {
        kind: "still",
        claim: "Every practice area has a real page behind it",
        detail:
          "Not six links to one generic contact form — each area carries its own scope, its own language, its own way in.",
        url: "pachimondattorneys.com/practice-areas/corporate-commercial",
      },
      {
        kind: "still",
        claim: "Named clients, on the record",
        detail:
          "Attributed testimonials rather than anonymous praise — the kind a prospective client can actually weigh.",
        url: "pachimondattorneys.com/#testimonials",
      },
      {
        kind: "clip",
        claim: "A consultation that reaches a person",
        detail:
          "The one claim a screenshot cannot make. Recorded end to end — form, validation, routing, confirmation — because a dead-end form looks identical to a working one until you press submit.",
        url: "pachimondattorneys.com/consultation",
        duration: "0:14",
      },
    ],
  },
  {
    slug: "styled-by-aidal",
    client: "Styled by Aidal",
    year: "2025",
    summary:
      "A refined digital home for an Accra fashion house crafting ladies' abayas and men's jalabiyas from premium fabrics, thoughtful design, and local craftsmanship.",
    services: ["Web", "E-commerce", "Art direction"],
    status: "live",
    thumbnail: "/assets/styled-by-aidal-cover.png",
    challenge:
      "Translate the quiet luxury and hand-finished quality of the garments into a digital experience that feels as considered as the pieces themselves.",
    approach:
      "Built a composed, commerce-ready experience around material detail, clear product discovery, and a visual language designed for a warm, contemporary Accra fashion brand.",
    outcome:
      "A digital foundation that gives Styled by Aidal the space to present its collections with the same confidence and care as the garments.",
  },
  {
    slug: "founder-work-in-progress",
    client: "Case study in progress",
    year: "—",
    summary:
      "Real client work from the founders' own history is being catalogued properly — write-ups and screenshots, not filler. This slot updates as that lands.",
    services: [],
    status: "coming-soon",
    thumbnail: "/assets/work-thumbnail-03.svg",
  },
  {
    slug: "team-work-in-progress",
    client: "Case study in progress",
    year: "—",
    summary:
      "Same here — a second body of real work being pulled together honestly rather than backfilled with placeholder clients.",
    services: [],
    status: "coming-soon",
    thumbnail: "/assets/work-thumbnail-04.svg",
  },
];
