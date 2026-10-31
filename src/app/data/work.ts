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
      "The first website for a Port Harcourt law firm that had built a real corporate and commercial practice on referral alone. Six practice areas, a consultation flow that reaches a person, and a voice serious enough for the clients they actually take.",
    services: ["Web", "Brand voice", "Content structure"],
    status: "live",
    thumbnail: "/assets/pachimond-cover.png",
    url: "https://pachimondattorneys.com",
    challenge:
      "Pachimond had never had a website. The firm had been doing serious corporate and commercial work for years, and every new client still arrived through a referral or a conversation, with nothing online to check them against first. The brief, when it came, was about as open as a brief gets: we need a website.",
    approach:
      "We started from nothing, which meant deciding what the firm actually is before deciding what the site should look like. That turned into six named practice areas instead of a vague services page, a blog the firm could use to write in its own voice about its own work, and a consultation flow built to put a prospective client in touch with a person rather than dump them into a form that goes quiet.",
    outcome:
      "A firm that has only ever been found through referral now has somewhere to send a new client before the first call, and a consultation form that reaches someone on the other end instead of disappearing into an inbox nobody checks.",
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
