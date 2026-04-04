"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const servicesData = [
  {
    title: "Business Websites",
    description:
      "High-performance websites built to clearly communicate your brand, convert visitors, and support growth. Every build is structured, scalable, and aligned with real business goals.",
    image: "/images/service_business.png",
  },
  {
    title: "MVP & Web Applications",
    description:
      "From idea to execution, I design and build structured MVPs and custom web applications that are ready for real users—focused on clarity, usability, and long-term scalability.",
    image: "/images/service_webapp.png",
  },
  {
    title: "Internal Tools & Systems",
    description:
      "Custom dashboards, CRMs, and operational tools built to simplify workflows and improve efficiency—helping your business run smoother as it grows.",
    image: "/images/service_tools.png",
  },
  {
    title: "Web Development Training",
    description:
      "Personalized training sessions for individuals or teams looking to master modern web technologies, from React and Next.js to advanced frontend engineering.",
    image: "/images/service_training.png",
  },
];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.innerWidth < 1024) return;

      if (!leftRef.current || !rightRef.current) return;

      ScrollTrigger.create({
        trigger: leftRef.current,
        start: "top 20%",
        endTrigger: rightRef.current,
        end: "bottom bottom",
        pin: leftRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="services"
      className="py-24 overflow-hidden"
      ref={containerRef}
    >
      <div className="flex flex-col lg:flex-row justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-12 lg:gap-24 relative">
        
        {/* LEFT (Sticky on Desktop, Top on Mobile) */}
        <div ref={leftRef} className="w-full lg:w-1/2 lg:max-w-md h-full z-10 flex flex-col justify-between">
          
          <div>
            <h2 className="mb-4 text-4xl sm:text-5xl lg:text-5xl">
              Structured Digital Solutions
            </h2>
            <p className="text-foreground max-w-md text-lg">
              Designed with clarity, built with structure, and made to scale.
            </p>
          </div>

          {/* Custom Needs Card - Hidden on Mobile, Shows at bottom on Desktop */}
          <div className="hidden lg:block mt-24">
            <div className="space-y-6">
              <h3 className="text-foreground text-2xl">
                Something more specific?
              </h3>
              <p className="text-foreground leading-relaxed">
                Not every problem fits into a predefined service. If you’re
                working on something unique, I’m open to exploring and building
                a solution that fits your exact needs.
              </p>
              <Link
                href="#contact"
                className="inline-block rounded-br-full bg-accent-green text-white px-8 py-4 font-bold hover:bg-accent-green/90 transition-all hover:scale-105 active:scale-95 w-fit uppercase text-sm"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT (Scrollable Cards) */}
        <div ref={rightRef} className="w-full lg:w-1/2 lg:max-w-md space-y-12 sm:space-y-16 lg:space-y-20 mt-8 lg:mt-0">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="relative overflow-hidden group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6 relative">
                <h3 className="mb-4 text-accent-green text-2xl sm:text-3xl">
                  {service.title}
                </h3>
                <p className="text-foreground sm:text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile ONLY Custom Needs Card - Shows after services on mobile/tablet */}
        <div className="lg:hidden w-full pt-12 border-t border-gray-200">
          <div className="space-y-6">
            <h3 className="text-foreground text-2xl sm:text-3xl">
              Something more specific?
            </h3>
            <p className="text-foreground leading-relaxed sm:text-lg">
              Not every problem fits into a predefined service. If you’re
              working on something unique, I’m open to exploring and building
              a solution that fits your exact needs.
            </p>
            <Link
              href="#contact"
              className="inline-block rounded-br-full bg-accent-green text-white px-8 py-4 font-bold hover:bg-accent-green/90 transition-all active:scale-95 w-full sm:w-fit text-center uppercase text-sm"
            >
              Start a Conversation
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;