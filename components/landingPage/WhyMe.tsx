import React from 'react'

const WhyMe = () => {
  const features = [
    {
      title: 'Systems Thinking',
      description: 'I build systems designed to be both powerful and flexible.',
    },
    {
      title: 'Built for Scale',
      description: 'What you get isn\'t just for now. It\'s designed to grow with your business.',
    },
    {
      title: 'Clarity Over Complexity',
      description: 'Clean structures, clear outcomes, no unnecessary noise.',
    },
    {
      title: 'Intentional Design',
      description: 'Every decision has a purpose always built with strategy.',
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:text-center mb-12 lg:mb-20">
          <h2 className="mb-4">Why Work With Me?.</h2>
          <p className="text-foreground max-w-xl mx-auto">
           Well, I don&apos;t approach projects as tasks to complete. Every build is treated as a system designed to support how your business operates, grows, and evolves over time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group flex flex-col pt-6 lg:pt-8 border-t border-gray-200 hover:border-accent-green transition-colors duration-300 cursor-default"
            >
              <div className="text-4xl lg:text-5xl font-extrabold text-gray-200 group-hover:text-accent-green transition-colors duration-300 mb-4 lg:mb-6">
                0{index + 1}
              </div>
              <h3 className="mb-3 text-xl sm:text-2xl">{feature.title}</h3>
              <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-24 max-w-2xl mx-auto mb-10 text-center border-t border-gray-100 pt-12 lg:pt-16">
          <p className="text-foreground">
            I combine design, code, and systems thinking to deliver digital solutions that are modern, intentional, and built for impact. I don’t just build websites, I build the foundation your business can grow on.
          </p>
        </div>
      </div>
    </section>
  )
}

export default WhyMe
