"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    id: "01",
    question: "How much does a website cost?",
    answer: "Pricing is based on the scope and complexity of your project. We offer fixed-price tiers starting at $200 for simple landing pages, up to custom quotes for complex web applications."
  },
  {
    id: "02",
    question: "How long does it take to complete a project?",
    answer: "A standard website typically takes 2-4 weeks from start to finish. Custom applications and larger platforms will have a timeline defined during the discovery phase."
  },
  {
    id: "03",
    question: "Do you provide hosting and maintenance?",
    answer: "Yes, all our packages include basic setup, and we offer ongoing hosting and management services to ensure your site remains secure, fast, and up to date."
  },
  {
    id: "04",
    question: "What happens if I need changes after launch?",
    answer: "We include revision rounds during development. Post-launch, we provide a handover process so you can make simple edits, or we can handle ongoing updates through a maintenance plan."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-40 bg-background border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Title */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <span className="text-caption text-foreground/40 block mb-6">Common Inquiries</span>
              <h2 className="mb-8">
                Answers to frequently asked questions about our process.
              </h2>
              <p className="text-foreground/60 max-w-sm">
                If you have a specific question not covered here, feel free to reach out directly via the form below.
              </p>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <div className="border-t border-foreground/10">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border-b border-foreground/10 transition-colors duration-500 ${openIndex === index ? 'bg-foreground/2' : 'hover:bg-foreground/1'}`}
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-start justify-between py-8 lg:py-12 text-left group"
                  >
                    <div className="flex gap-8 lg:gap-12 items-start pr-8">
                      <span className="text-caption text-foreground/30 mt-1.5 shrink-0">
                        {faq.id}
                      </span>
                      <h3 className={`transition-colors duration-300 ${openIndex === index ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'}`}>
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`mt-1.5 shrink-0 transition-transform duration-500 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                      <Plus size={24} strokeWidth={1.5} className="text-foreground/40" />
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      openIndex === index ? 'max-h-[300px] opacity-100 pb-12 lg:pb-16' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex gap-8 lg:gap-12 pl-14 lg:pl-20">
                      <div className="max-w-xl">
                        <p className="text-foreground/60">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;

