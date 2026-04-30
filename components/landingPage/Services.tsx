"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const services = [
  {
    id: "01",
    title: "Design",
    subtitle: "Clear, purposeful interfaces built to communicate and convert.",
    details: "Custom websites, art direction, brand identity, responsive layouts, motion design, and 2D/3D illustration."
  },
  {
    id: "02",
    title: "Development",
    subtitle: "Fast, maintainable frontends powered by modern web technologies.",
    details: "Custom frontend development, cleanly documented code, technical SEO setup, and easy content publishing."
  },
  {
    id: "03",
    title: "Management",
    subtitle: "Structured for business growth and long-term scalability.",
    details: "Admin panels, CMS integrations, scalable architecture, design systems, editable content, and ongoing technical support."
  }
];

const Services = () => {
  return (
    <section className="bg-foreground relative overflow-hidden">
      {/* Header Section */}
        <div className="py-16 px-4 bg-background">
          <ScrollReveal direction="up" distance={30}>
            <h2 className="text-foreground mx-auto max-w-3xl lg:text-center mb-6">
              Our Services & Capabilities
            </h2>
          </ScrollReveal>
        </div>
      <div className="relative mx-auto px-6 lg:px-0">
        {/* Editorial List Layout */}
        <ScrollReveal stagger={0.15}>
          <div className="flex flex-col">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`group relative overflow-hidden cursor-pointer transition-colors duration-500 ease-out text-background hover:text-foreground py-12 lg:py-16 border-background ${
                  index === 0 ? "border-t-2 border-b-2" : "border-b-2"
                }`}
              >
                {/* Sleek bottom-up background wipe */}
                <div className="absolute inset-0 bg-gray-body origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-0" />

                <div className="relative z-10 flex mx-auto max-w-4xl flex-col lg:flex-row gap-8 lg:gap-16 ">
                  {/* Left: Number & Title */}
                <div className="w-full lg:w-1/2 flex items-start gap-6 sm:gap-8">

                  <h3 className="">
                    {service.title}
                  </h3>
                </div>

                {/* Right: Copy */}
                <div className="w-full lg:w-1/2 gap-4 flex flex-col justify-center max-w-xl lg:ml-auto mt-4 lg:mt-0">
                  <h4 className="">
                    {service.subtitle}
                  </h4>
                  <p className="">
                    {service.details}
                  </p>
                </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default Services;