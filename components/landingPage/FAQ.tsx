"use client";

import React, { useState } from 'react';

const faqs = [
  {
    question: "How much does a website cost?",
    answer: "Pricing is based on the scope and complexity of your project. We offer fixed-price tiers starting at $200 for simple landing pages, up to custom quotes for complex web applications."
  },
  {
    question: "How long does it take to complete a project?",
    answer: "A standard website typically takes 2-4 weeks from start to finish. Custom applications and larger platforms will have a timeline defined during the discovery phase."
  },
  {
    question: "Do you provide hosting and maintenance?",
    answer: "Yes, all our packages include basic setup, and we offer ongoing hosting and management services to ensure your site remains secure, fast, and up to date."
  },
  {
    question: "What happens if I need changes after launch?",
    answer: "We include revision rounds during development. Post-launch, we provide a handover process so you can make simple edits, or we can handle ongoing updates through a maintenance plan."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-background border-t border-foreground/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="mb-6">
            Common Questions
          </h1>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-foreground/20 pb-2"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-6 text-left group"
              >
                <h3 className="group-hover:text-foreground/70 transition-colors">
                  {faq.question}
                </h3>
                <span className={`ml-6 shrink-0 text-xl font-light w-10 h-10 flex items-center justify-center border border-foreground/20 rounded-full transition-transform duration-300 ${openIndex === index ? 'rotate-45 bg-foreground text-background' : 'bg-background text-foreground'}`}>
                  +
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100 mb-8' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-foreground/70 text-base pr-12 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
