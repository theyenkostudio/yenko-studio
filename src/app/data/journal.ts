/**
 * A paragraph, or a subheading. Long posts need real headings — they are how a
 * crawler reads a document's structure, and how a reader scans one — so the
 * body is a block list rather than a flat array of paragraphs.
 */
export type Block = string | { heading: string };

export interface JournalPost {
  slug: string;
  title: string;
  /**
   * ISO date. The displayed date is derived from it, so a machine-readable
   * `datePublished` and the human one on the page cannot drift apart.
   */
  published: string;
  excerpt: string;
  body: Block[];
}

/** "September 2026" — the display form, derived so it is never authored twice. */
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/**
 * Derived from the body rather than authored, so it cannot drift out of date
 * when a post is edited. 220 wpm is the usual reading-speed assumption for
 * prose; anything under a minute still reads as "1 min".
 */
export function readingTime(post: JournalPost) {
  const text = post.body
    .map((block) => (typeof block === "string" ? block : block.heading))
    .join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const journalPosts: JournalPost[] = [
  {
    slug: "introducing-yenko-studio",
    title: "Introducing Yenko Studio",
    published: "2026-09-09",
    excerpt:
      "A design and technology studio in Accra and Abuja, building websites, products and brand systems for businesses here and anywhere. What we are, and how we work.",
    body: [
      "Yenko is a design and technology studio working out of Accra and Abuja. We build websites, digital products and the brand systems that hold them together \u2014 for businesses in Ghana and Nigeria, and for anyone else who wants what we do.",
      "This is the first note on a site that was overdue one. So rather than a manifesto, here is what we are, plainly.",
      { heading: "The name" },
      "Yenko is Akan for let\u2019s go. It is not a metaphor we reverse-engineered after the fact \u2014 it is the tone of the studio. Most of our work starts with a business that knows something needs to change and has been putting it off. The name is the answer to that.",
      "The mark is Sankofa, the bird turning its head to retrieve what it left behind. It has sat in the corner of every page of this site as the scroll dial since we launched, and it describes the job accurately: a great deal of what we are called in to do is retrieval. A codebase somebody walked away from. A brand that drifted three redesigns from what the business actually is. A site that stopped earning years ago and nobody wanted to open. You go back for the part worth keeping, and then you go.",
      { heading: "What we build" },
      "Websites that have to earn something \u2014 enquiries, sales, credibility with a client who is deciding whether to take you seriously. E-commerce for businesses selling real things to real people. Internal tools and integrations for teams whose operations have outgrown a spreadsheet. And the brand work that makes all of it read as one thing rather than three.",
      "We are deliberately not a vertical specialist. The through line is not an industry, it is a standard: the work has to be in production and doing its job before we call it finished.",
      { heading: "How we work" },
      "Most projects start with a conversation rather than a brief. Tell us what you are trying to do and we will tell you honestly whether we are the right people for it \u2014 including when the answer is no.",
      "A few things we hold to. Knowing what to leave out is most of the job, now that anyone can generate a working prototype in a weekend. Being reachable beats being impressive. We would rather point at something live than claim a specialty we have no track record in. And a project is finished when it is in production, not when a demo is approved.",
      { heading: "Where to look next" },
      "The work page is short and every project on it is live, named and linked \u2014 go and use them. The about page has the longer version of what we think and why. And this journal is where the studio thinks out loud: how we design, how we build, how we run the business, and what we are learning while we do it.",
      "If you have something you have been putting off, tell us about it. We will tell you honestly whether it is something we should take on.",
    ],
  },
  {
    slug: "why-your-business-needs-a-website",
    title: "Why your business needs a website (when it already has Instagram)",
    published: "2026-09-09",
    excerpt:
      "If your customers already find you on Instagram and WhatsApp, a website can feel optional. Here is what a site does that a social page structurally cannot.",
    body: [
      "This is a fair question and it deserves a straight answer rather than a sales pitch. A lot of good businesses in Ghana and Nigeria run almost entirely on Instagram, WhatsApp and word of mouth. Orders come in, customers are happy, money moves. So what is a website actually for?",
      "The honest answer is that a social presence and a website do different jobs, and the second one only becomes urgent at a particular point in a business\u2019s life. Here is how to tell whether you are at it.",
      { heading: "You do not own the page you built" },
      "Everything you have on Instagram sits on land you rent. The account can be restricted, hacked, or lost with a phone. The algorithm decides how many of the people who chose to follow you actually see you. And none of it is portable \u2014 you cannot take three years of posts and customer proof somewhere else.",
      "A domain you own is the one asset in this list that cannot be taken away by a platform decision. For a business that intends to be around in five years, that alone is usually the argument.",
      { heading: "Nobody searches Instagram for a supplier" },
      "This is the part most businesses underestimate. Social platforms are discovery by browsing \u2014 people find you while scrolling, when they were not looking for you. Search is discovery by intent: somebody has a specific problem, right now, and is typing it.",
      "\u201cCorporate lawyer in Port Harcourt.\u201d \u201cAbaya tailor Accra.\u201d \u201cInventory software for a pharmacy.\u201d Those people are ready to buy and they are not scrolling. If you have no site, you are not in that conversation at all, and the competitor with three plain pages is.",
      { heading: "Some buyers will not take you seriously without one" },
      "Below a certain deal size nobody minds. Above it, behaviour changes. A company procurement officer, a corporate client, an institution, an international partner \u2014 they will look for a site, and its absence is read as an answer about how established you are, fairly or not.",
      "The bigger the cheque, the more the buyer needs to reassure somebody else internally that you are real. A site is what they forward.",
      { heading: "A social page cannot hold structure" },
      "A feed is a stream. It is very good at showing what is new and very bad at answering a specific question. If you do six different things, a visitor cannot see the six. They see your last nine posts.",
      "A site can give each thing you do its own page, in your own words, permanently \u2014 something a customer can be sent directly to, that can be found by search, and that does not scroll away next week.",
      { heading: "You control the path" },
      "On social, the platform decides what happens after someone becomes interested. On your own site you decide: what they read first, what they see next, and how they reach you \u2014 including handing them straight to whichever channel you actually prefer to talk on. A site does not replace the channels your business already runs on. It feeds them better.",
      { heading: "How much is enough" },
      "Not much, to begin with. Who you are, what you do, proof that you have done it, and an obvious way to start a conversation. Most businesses need that far more than they need a large site, and building more before you need it is a good way to spend money on something nobody reads.",
      "The test is simple. If a stranger who is ready to buy lands on it, can they tell within a few seconds that you do the specific thing they need, and can they reach a human without thinking about it? If yes, the site is doing its job.",
    ],
  },
  {
    slug: "professional-services-website",
    title: "What a professional services firm actually needs from a website",
    published: "2026-09-09",
    excerpt:
      "Law firms, accountants and consultancies do not need a beautiful homepage. They need structure, a route to a person, and proof. Here is what that looks like in practice.",
    body: [
      "Professional services firms are sold on trust, and trust is not a visual quality. It comes from a prospective client being able to work out, quickly and without asking, whether you do the specific thing they need and whether you are serious about it.",
      "Most firm websites fail that test in the first ten seconds. Not because they are ugly — many are perfectly pleasant — but because they are organised around the firm rather than around the question the visitor arrived with.",
      { heading: "Structure beats decoration" },
      "A visitor almost never arrives wanting to know about your firm. They arrive with a problem that has a name: a contract dispute, a property transfer, an employment matter, a tax filing. The site's structure should answer that name back to them.",
      "That means a real page for each area you practise in, not a single services page with a list. A page can rank, be linked to, be sent to a colleague, and be found by somebody searching the exact phrase for their problem. A bullet in a list can do none of those things.",
      { heading: "One page per thing you actually do" },
      "The discipline here is subtraction. Six areas you genuinely practise, each with a page that says what the work involves and who it is for, will outperform fifteen areas listed to look comprehensive. Listing work you rarely take costs you twice — it dilutes the pages that matter, and it brings in enquiries you will turn down.",
      "Each page should be answerable to a person in the firm. If nobody will own the content for an area, that is usually a sign the area does not belong on the site.",
      { heading: "A route to a person, not a void" },
      "The single most common failure is a consultation request that goes nowhere in particular. A form that submits into a shared inbox is, from the outside, indistinguishable from a form that submits into nothing. The visitor cannot tell, so they assume the worst.",
      "Fix it with specifics rather than reassurance. Say who receives the enquiry. Say how long a reply takes. Offer the channel the client would actually use — for a lot of firms here, that is a phone call or a WhatsApp message, not an email. And make the path shorter for the areas where speed matters.",
      { heading: "Proof, in the firm's own words" },
      "Credentials, named clients where confidentiality allows, matters handled, commentary written by the people who did the work. A blog is worth having only if the firm writes it — outsourced legal content reads as outsourced, and a prospective client can tell.",
      "This is also the part that compounds. Practice-area pages plus genuine commentary is what gets a firm found for the terms its clients actually search, which is a slower and far more durable route than paid placement.",
      { heading: "What to do first" },
      "If you only change one thing: split your services page into real pages, one per practice area, and put a named route to a human on each of them. That is most of the value, and it does not require a redesign.",
    ],
  },
];
