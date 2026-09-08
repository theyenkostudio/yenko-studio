export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
}

export const journalPosts: JournalPost[] = [
  {
    slug: "building-the-tool-we-needed",
    title: "We're rebuilding our own sales process, in public",
    date: "September 2026",
    excerpt:
      "Every call to action on this site used to be a wa.me link. That's not an accident — it's how business actually happens here. So we're building the tool that makes it scale, starting with ourselves.",
    body: [
      "Look at how this studio has always sold its work: WhatsApp. Not a contact form, not a CRM, not a scheduling link — a phone number and a green icon. It's how referrals get made, how quotes get discussed, how projects get signed, across Ghana and Nigeria alike.",
      "That's a real advantage and a real problem at the same time. It works because it's how people actually want to talk to us. It breaks down the moment there's more than a handful of conversations happening at once — nothing is tracked, nothing follows up on its own, and a lead is only as good as someone's memory of a chat from three weeks ago.",
      "So the first thing we're building back isn't a new service line — it's a WhatsApp-native lead-to-invoice tool, for us first. Something that turns a conversation into a tracked lead, a structured quote, a follow-up that doesn't rely on memory, and eventually an invoice, without asking anyone to leave the app they were already using.",
      "We're dogfooding it on our own pipeline before we ever talk about selling it to anyone else. If it doesn't make our own sales process better, it doesn't deserve to exist as a product. More on how it's going, as it's going.",
    ],
  },
];
