"use client";

import ExpandableBlock from "./expandable-block";

const FAQs = () => {
  const faqs = [
    {
      question: "Wait, didn't Yenko go quiet for a while?",
      answer:
        "Yes. The team scattered and the pipeline stopped for a stretch. We're not hiding that — a studio choosing to come back on its own terms, sharper than before, is a better story than pretending nothing happened.",
    },
    {
      question: "What's the difference between Build, Run, and Back?",
      answer:
        "Build is a fixed-scope project priced against the outcome. Run is a standing monthly retainer — we become your ongoing technical and creative function. Back is cash plus equity, reserved for a small number of early-stage teams a year. Most engagements start as a Build and graduate to a Run.",
    },
    {
      question: "What do you actually build?",
      answer:
        "Web, mobile (native and cross-platform), brand and product design, and bespoke systems — APIs, backends, integrations. We stay broad on purpose; the range is backed by real delivered work, not a guess at what we should specialize in.",
    },
    {
      question: "How long does a Build take?",
      answer:
        "Typically 6–12 weeks, start to production, depending on scope. We'll give a real timeline after understanding what you actually need — not a generic range.",
    },
    {
      question: "Why WhatsApp instead of a contact form?",
      answer:
        "Because that's genuinely how business gets done here. A form is where inquiries go to be ignored; a WhatsApp message gets a real person, usually the same day.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Depends on the tier and the scope — we don't publish a generic price list because generic pricing produces generic work. Tell us what you're building on WhatsApp and we'll give you a real number.",
    },
  ];

  return (
    <div className=" bg-white py-10 mb-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8 space-y-2 px-5">
          <h1 className="text-black md:text-8xl text-lg font-bold">
            Questions, answered straight
          </h1>
          <p className="text-slate-500">
            No boilerplate — including the one about the dormancy.
          </p>
        </div>
        <div>
          {faqs?.map((v) => (
            <ExpandableBlock
              content={v.answer}
              title={v.question}
              key={v.question}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
