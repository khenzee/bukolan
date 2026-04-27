"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import { Compass, PenTool, Code2, Gauge, Rocket } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-cards';

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
    <section className="relative py-24 lg:py-32 bg-background border-t border-foreground/10">
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24 relative z-10">
        <div className="text-center">
          <h1 className="text-foreground max-w-3xl mx-auto">
            A simplified workflow designed to move fast and build right.
          </h1>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[320px] sm:max-w-sm mx-auto px-4">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full aspect-3/4 sm:aspect-square"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <SwiperSlide key={step.id} className="flex items-center justify-center bg-background border border-foreground/20 rounded-xl p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <p className='mb-6 text-center'>{step.id}</p>
                  <div className="w-16 h-16 mb-8 flex items-center justify-center rounded-2xl bg-foreground text-background">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-widest mb-4">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom React Pagination Pill */}
        <div className="flex justify-center mt-12 z-20 relative">
          <div className="flex items-center gap-1 border border-foreground rounded-full bg-background p-1 shadow-sm">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => swiperInstance?.slideTo(index)}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
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
      </div>
    </section>
  );
};

export default Process;
