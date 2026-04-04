"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  const magnetInnerRef = useRef<HTMLDivElement>(null);

  // ── Scroll-driven text color reveal ──────────────────────────
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    // Split text into individually animatable words while preserving
    // the accent-green span styling. We walk through child nodes so
    // that text nodes get the default (foreground) color and nodes
    // inside <span class="text-accent-green"> get the accent color.
    const words: { el: HTMLSpanElement; isAccent: boolean }[] = [];

    const wrap = (text: string, isAccent: boolean) => {
      // Split on whitespace, keep spaces as separators
      text.split(/(\s+)/).forEach((token) => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          // Preserve whitespace as text nodes
          heading.appendChild(document.createTextNode(token));
          return;
        }
        const span = document.createElement("span");
        span.textContent = token;
        span.style.display = "inline";
        span.style.transition = "none";
        // Start as light gray
        span.style.color = "#d1d1d1";
        heading.appendChild(span);
        words.push({ el: span, isAccent });
      });
    };

    // Snapshot original child nodes before we clear
    const original = Array.from(heading.childNodes);
    heading.textContent = "";

    original.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        wrap(node.textContent || "", false);
      } else if (node instanceof HTMLElement) {
        const isAccent = node.classList.contains("text-accent-green");
        wrap(node.textContent || "", isAccent);
      }
    });

    // Animate each word's color based on scroll progress
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 15%",
        scrub: 0.6,
      },
    });

    words.forEach((w, i) => {
      const targetColor = w.isAccent
        ? "var(--accent-green)"
        : "var(--foreground)";
      tl.to(
        w.el,
        {
          color: targetColor,
          duration: 0.3,
          ease: "none",
        },
        i * 0.04 // stagger start
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // ── Magnetic button effect ───────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const magnet = magnetRef.current;
    const inner = magnetInnerRef.current;
    if (!section || !magnet || !inner) return;

    const MAX_SHIFT = 14; // max px the button can move from origin

    const onMove = (e: MouseEvent) => {
      const sectionRect = section.getBoundingClientRect();
      const btnRect = magnet.getBoundingClientRect();

      // Button center (relative to viewport)
      const centerX = btnRect.left + btnRect.width / 2;
      const centerY = btnRect.top + btnRect.height / 2;

      // Vector from button center to cursor
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Section diagonal = max possible distance within the section
      const diagonal = Math.sqrt(
        sectionRect.width ** 2 + sectionRect.height ** 2
      );

      // Strength: strongest when cursor is on the button, weakest at
      // the far corners. Uses a power curve so it feels natural.
      const normalised = Math.min(dist / diagonal, 1);
      const strength = Math.pow(1 - normalised, 1.5); // 1 at center, ~0 at edges

      // Direction × strength × max shift
      const angle = Math.atan2(dy, dx);
      const moveX = Math.cos(angle) * strength * MAX_SHIFT;
      const moveY = Math.sin(angle) * strength * MAX_SHIFT;

      gsap.to(magnet, {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: "power3.out",
      });
      // Inner label counter-shifts for a 3D parallax feel
      gsap.to(inner, {
        x: moveX * 0.2,
        y: moveY * 0.2,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
      gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="">
          {/* Main Copy — words animate gray → color on scroll */}
          <div className="text-left md:text-center">
            <h2 ref={headingRef} className="mb-8">
              I help businesses build
                clarity, structure, and impact
              in the digital era. Together, we create <span className="text-accent-green">
                systems, websites, and tools
              </span>{" "} that set a new standard not just follow trends. No
              shortcuts, no minimal effort, always precise, thoughtful, and
              built to scale.
            </h2>
          </div>

          {/* About CTA Circular — magnetic tracking */}
          <div className="flex lg:justify-center">
            {/* Decorative subtext nearby */}
            <div className="mt-6 max-w-xs">
              <p className="italic">
                My combination of design, code, and systems thinking allows me
                uniquely to craft solutions that are beautiful, functional, and
                built to last.
              </p>
            </div>
            <div ref={magnetRef} className="relative cursor-pointer will-change-transform">
              <Link href="#about-more" className="block">
                <div
                  ref={magnetInnerRef}
                  className="about-btn group relative w-40 h-40 rounded-full overflow-hidden will-change-transform"
                >
                  {/* Layer 1: Portrait image (always present, revealed on hover) */}
                  <Image
                    src="/images/hero-img.png"
                    alt="Bukola portrait"
                    fill
                    sizes="160px"
                    className="object-cover object-top"
                  />

                  {/* Layer 2: Green overlay that shrinks away on hover */}
                  <div className="about-btn__overlay absolute inset-0 bg-accent-green rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-500 ease-in-out group-hover:scale-0 group-hover:opacity-0">
                    {/* Arrow icon */}
                    <svg
                      className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-45"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7v10"
                      />
                    </svg>
                    <span className="font-bold uppercase text-xs text-white tracking-wider">
                      About Me
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
