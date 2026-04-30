"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  stagger?: number;
}

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 50,
  stagger = 0.1,
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const childrenElements = containerRef.current.children;
    
    // Initial positions
    const x = direction === "left" ? distance : direction === "right" ? -distance : 0;
    const y = direction === "up" ? distance : direction === "down" ? -distance : 0;

    gsap.from(childrenElements, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", // Starts when the top of the element hits 85% of viewport height
        toggleActions: "play none none none",
      },
      x,
      y,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  );
};

export default ScrollReveal;
