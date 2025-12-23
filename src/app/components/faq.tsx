"use client";

import ExpandableBlock from "./expandable-block";

const FAQs = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We specialize in web applications, mobile apps (both native and cross-platform), and custom software solutions including SaaS platforms, API development, and AI integrations. Each project is tailored to your specific business needs.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity and scope. A simple website might take 4-6 weeks, while a full SaaS platform could take 3-6 months. We'll provide a detailed timeline after understanding your requirements.",
    },
    {
      question: "What is your development process?",
      answer:
        "We follow an agile development approach with regular check-ins and iterations. You'll be involved throughout—from initial planning and design, through development sprints, to testing and launch. Transparency and collaboration are key to our process.",
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer:
        "Yes, we offer maintenance and support packages to ensure your product continues to perform optimally. This includes bug fixes, updates, performance monitoring, and feature enhancements as your business grows.",
    },
    {
      question: "What technologies do you work with?",
      answer:
        "We use modern, proven technologies including React, Next.js, Node.js, React Native, and more. We choose the tech stack based on your project requirements, scalability needs, and long-term maintenance considerations.",
    },
    {
      question: "How much does a project cost?",
      answer:
        "Project costs vary significantly based on complexity, features, and timeline. We provide transparent, detailed quotes after an initial consultation. Our focus is on delivering value—building solutions that drive real business growth and ROI.",
    },
  ];

  return (
    <div className=" bg-white py-10 mb-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8 space-y-2 px-5">
          <h1 className="text-black md:text-8xl text-lg font-bold">
            Do you have questions?
          </h1>
          <p className="text-slate-500">
            Discover how Yenko Studio empowers you to build remarkable digital
            experiences
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
