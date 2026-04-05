import Link from 'next/link'
import ProjectCarousel from './ProjectCarousel'
import HeroReveal from './heroReveal'
import { ArrowRight } from 'lucide-react'

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
        <div className="max-w-7xl min-h-dvh flex flex-col justify-center lg:justify-between py-24 lg:py-40 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end pb-12 gap-16 lg:gap-0 mt-8 lg:mt-0">
            {/* Left Column */}
            <div className="space-y-6 lg:space-y-8 max-w-xl">
              <div>
                <h1 className="text-white">
                  Transforming ideas into organized, scalable digital systems.
                </h1>
              </div>
              <p className="text-white font-bold max-w-md">
                I help startups and growing businesses design, build, and structure their digital systems from high-performing websites to internal tools with clarity and long-term thinking.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-br-full bg-accent-green text-white px-8 py-3 font-bold hover:opacity-90 transition-opacity mt-4 lg:mt-0"
              >
                Let&apos;s Talk
              </Link>
            </div>

            {/* Right Column - Status Card */}
            <div className="relative w-full lg:w-[300px] flex flex-col mt-12 lg:mt-0">
              <div className="w-full">
                <div className='flex justify-between items-center mb-6'>
                  <Link href="/works" className="group flex items-center gap-2">
                    <h3 className="text-white group-hover:text-accent-green transition-all duration-300">Projects</h3>
                    <ArrowRight 
                      className='w-6 h-6 group-hover:text-accent-green transition-all duration-300 text-white group-hover:translate-x-2' 
                      strokeWidth={2.5} 
                    />
                  </Link>
                </div>
                <ProjectCarousel />
              </div>
            </div>
          </div>
        </div>
      </HeroReveal>
    </section>
  )
}

export default Hero