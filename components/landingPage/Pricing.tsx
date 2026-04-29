"use client";

import React from 'react';
import { useFormModal } from './FormModalContext';

type PlanTier = 'lite' | 'scale' | 'grand';

const Pricing = () => {
  const { openForm } = useFormModal();

  const plans: {
    name: string;
    price: string;
    subtitle: string;
    target: string;
    description: string;
    includes: string[];
    ctaText: string;
    tier: PlanTier;
  }[] = [
    {
      name: "Lite",
      price: "$200 / project",
      subtitle: "",
      target: "Best for startups, service businesses, and simple launches.",
      description: "A functional one-page website designed to validate ideas, collect leads, or showcase services fast.",
      includes: [
        "One-page design & development",
        "Responsive layout & UI animation",
        "Basic SEO & deployment",
        "Hosting & management",
        "2 revision rounds",
        "Timeline: 1–2 weeks"
      ],
      ctaText: "choose Lite",
      tier: "lite"
    },
    {
      name: "Scale",
      price: "$500 / project",
      subtitle: "Starting at",
      target: "For businesses that need a full website.",
      description: "Multi-page websites designed for growth, content, and conversions.",
      includes: [
        "Multi-page website",
        "Responsive & advanced animation",
        "Modular UI & Custom CMS",
        "SEO setup & documentation",
        "Everything in Lite",
        "Timeline: 1–3 weeks"
      ],
      ctaText: "choose Scale",
      tier: "scale"
    },
    {
      name: "Grand",
      price: "$800 / project",
      subtitle: "Starting at",
      target: "For startups building products or custom platforms.",
      description: "Custom web applications and MVPs built for scalability and real users.",
      includes: [
        "Custom web application",
        "MVP planning & scalable architecture",
        "Advanced UI & Admin dashboard",
        "API integrations & documentation",
        "Everything in Scale",
        "Timeline: Based on scope"
      ],
      ctaText: "choose Grand",
      tier: "grand"
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-background border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="lg:text-center max-w-3xl mx-auto mb-16 lg:mb-16">
          <h2 className=" mb-6">
            Clear pricing for different types of collaboration.
          </h2>
          <p className="text-foreground max-w-xl mx-auto text-lg sm:text-xl">
            Start small, scale when you{"'"}re ready, or build something fully custom.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className="group flex flex-col border border-foreground/20 hover:border-foreground transition-colors duration-500 p-8  bg-background"
            >
              {/* Header */}
              <div className="mb-8">
                <h5 className="mb-8 text-gray-500">
                  {plan.name}
                </h5>
                <div className="min-h-[20px] mb-2">
                  {plan.subtitle && (
                    <p className="text-xs text-foreground">
                      {plan.subtitle}
                    </p>
                  )}
                </div>
                <h3 className="">
                  {plan.price}
                </h3>
              </div>
              
              {/* Content */}
              <div className="mb-6 grow">
                <p className="text-foreground  mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-4">
                  {plan.includes.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-foreground/90">
                      <span className="mr-4 text-foreground/40 text-xs mt-0.5">●</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-4">
                <button 
                  onClick={() => openForm(plan.tier)}
                  className="flex items-center justify-center w-full py-2 rounded-full border-2 border-foreground text-lg hover:bg-foreground hover:text-background transition-all duration-300 group-hover:bg-foreground group-hover:text-background cursor-pointer"
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
