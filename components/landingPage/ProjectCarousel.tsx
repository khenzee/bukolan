"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const projects = [
  {
    id: 1,
    title: "Project Omega",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "System Alpha",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Digital Flux",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
];

export default function ProjectCarousel() {
  return (
    <div className="w-full z-20">
      <div className="space-y-4">
        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
            renderBullet: function (index, className) {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-md shadow-lg overflow-hidden group"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="relative w-full rounded-lg overflow-hidden aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority={project.id === 1}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <h4 className="text-white ">
                    {project.title}
                  </h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      <style jsx global>{`
        .custom-swiper-pagination .custom-bullet {
          display: block;
          height: 2px;
          width: 12px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: all 0.4s ease;
          cursor: pointer;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          width: 32px;
          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
}