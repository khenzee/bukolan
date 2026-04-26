import HeroReveal from './heroReveal'

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <HeroReveal
        imageSrc="/images/hero-img.png"
        revealRadius={130}
        trailFade={1.5}
        blurAmount={16}
      >
        {/* Hero Content — rendered on top of the reveal effect */}
        <div className="max-w-7xl min-h-dvh flex flex-col justify-center items-center lg:justify-between py-24 lg:py-40 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-12 mt-8 lg:mt-0">
            {/* Left Column */}
            <div className="space-y-6 lg:space-y-8 mt-16 text-center max-w-3xl mx-auto">
              <div>
                <h1 className="text-gray-body">
                  DIGITAL AGENCY FOR BUSINESSES AND INNOVATIVE MINDS.
                </h1>
              </div>
              <p className="text-gray-body font-bold max-w-2xl mx-auto">
                I help growing businesses and startups design, build, and structure their digital systems from high-performing websites to internal tools with clarity and long-term thinking.
              </p>
            </div>
          </div>
        </div>
      </HeroReveal>
    </section>
  )
}

export default Hero