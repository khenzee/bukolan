"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Compass, PenTool, Code2, Gauge, Rocket } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

const steps = [
  {
    id: 1,
    title: "Onboarding",
    description: "We align on your goals, audience, and vision to set a solid foundation for the project.",
    icon: Compass
  },
  {
    id: 2,
    title: "Direction",
    description: "Crafting the visual blueprint and establishing the core design and architectural language.",
    icon: PenTool
  },
  {
    id: 3,
    title: "Development",
    description: "Translating the direction into robust, scalable code and building the interactive systems.",
    icon: Code2
  },
  {
    id: 4,
    title: "Optimization",
    description: "Refining performance, fine-tuning accessibility, and ensuring a flawless user experience.",
    icon: Gauge
  },
  {
    id: 5,
    title: "Handover",
    description: "Deploying the final product and equipping you with the tools to manage and grow it.",
    icon: Rocket
  }
];

const Process = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="process" className="relative py-24 lg:py-32 bg-background border-t border-foreground/10 overflow-hidden">
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div className="text-center">
          <ScrollReveal direction="up" distance={30}>
            <h2 className="text-foreground max-w-3xl mx-auto">
              A simplified workflow designed to move fast and build right.
            </h2>
          </ScrollReveal>
        </div>
      </div>

      <div className="relative z-10 w-full mt-8 lg:mt-0">
        <ScrollReveal direction="up" distance={40} delay={0.1}>
          <Swiper
            grabCursor={true}
            slidesPerView={1}
            spaceBetween={30}
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <SwiperSlide 
                  key={step.id} 
                  className="w-full px-4 py-8"
                >
                  <div className="mx-auto w-full max-w-[320px] sm:max-w-sm aspect-3/4 sm:aspect-square flex flex-col items-center justify-center bg-background border border-foreground/20 rounded-xl p-8 shadow-xl">
                    <p className='mb-6 text-center text-caption text-foreground/50'>0{step.id}</p>
                    <div className="w-16 h-16 mb-8 flex items-center justify-center rounded-2xl bg-foreground text-background">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-4 text-center">
                      {step.title}
                    </h3>
                    <p className="text-foreground/70 text-small text-center">
                      {step.description}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom React Pagination Pill */}
          <div className="flex justify-center mt-8 z-20 relative px-4">
            <div className="flex items-center gap-1 border border-foreground rounded-full bg-background p-1 shadow-sm">
              {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => swiperInstance?.slideTo(index)}
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-caption transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-foreground text-background' 
                        : 'bg-transparent text-foreground hover:bg-foreground/10'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    0{index + 1}
                  </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Process;
