"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// You can add as many projects here as you want in the future,
// the grid will automatically handle rows and columns perfectly!
const projects = [
  {
    title: "Fintech Dashboard",
    category: "Design & Development",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    year: "2026",
    href: "#"
  },
  {
    title: "E-commerce Platform",
    category: "Web Experience",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    year: "2026",
    href: "#"
  },
  {
    title: "Internal CRM",
    category: "Web App",
    src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop",
    year: "2025",
    href: "#"
  },
  {
    title: "HealthTech App",
    category: "Design & Dev",
    src: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop",
    year: "2025",
    href: "#"
  },
  {
    title: "Creative Agency",
    category: "Frontend",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    year: "2024",
    href: "#"
  },
  {
    title: "Logistics Portal",
    category: "Web App",
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    year: "2024",
    href: "#"
  }
];

export default function WorksList() {
  return (
    <div className="w-full bg-white pb-24 md:pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Standard Grid Layout: 1 col (mobile), 2 cols (tablet), 3 cols (desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-16">
          {projects.map((project, index) => (
            <Link 
              key={index}
              href={project.href}
              className="group flex flex-col cursor-pointer w-full"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] relative overflow-hidden rounded-[1.25rem] bg-gray-100 shadow-sm transition-shadow duration-500 group-hover:shadow-md">
                <Image 
                  src={project.src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
              </div>

              {/* Text Container */}
              <div className="pt-5 pb-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight transition-colors group-hover:text-accent-green">
                  {project.title}
                </h2>
                
                <div className="flex items-center gap-2.5 mt-2 opacity-80">
                  <p className="text-foreground/70 font-semibold text-xs md:text-sm uppercase tracking-wide">
                    {project.category}
                  </p>
                  <span className="w-1 h-1 rounded-full bg-foreground/40 hidden md:block"></span>
                  <p className="text-foreground/70 font-semibold text-xs md:text-sm uppercase tracking-wide hidden md:block">
                    {project.year}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
