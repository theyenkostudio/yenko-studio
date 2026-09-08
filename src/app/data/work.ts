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
