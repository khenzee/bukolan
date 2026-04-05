import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: "About | Bukola",
  description: "Building structured digital systems for modern businesses.",
};

const About = () => {
  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-32">
      
      {/* 1. Hero / Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h1 className="text-foreground mb-6">
              Building structured digital systems for modern businesses
            </h1>
            <div className="space-y-4 text-foreground font-medium">
              <p>
                I’m Bukola, a developer focused on creating websites, MVPs, and internal tools that are built with clarity, structure, and long-term intent.
              </p>
              <p>
                My work goes beyond just design or development. Every project is approached as a system something that should not only work, but support how a business operates and grows over time.
              </p>
            </div>
          </div>
          
          <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-full rounded-3xl overflow-hidden bg-gray-100">
             <Image 
                src="/images/hero-img.png"
                alt="Bukola portrait"
                fill
                className="object-cover object-top"
             />
          </div>
        </div>
      </section>

      {/* 2. Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="md:text-center">
          <div>
             <div className="space-y-4 text-foreground font-medium max-w-5xl mx-auto">
               <h2>
                 Most digital projects fail before they even start not because of poor execution, but because of a lack of structure.
                 I focus on understanding the business first, then designing and building solutions that align with real goals, real users, and real workflows.
                 The result isn’t just something that looks good, but something that functions properly, scales effectively, and lasts.
               </h2>
             </div>
          </div>
        </div>
      </section>

      {/* 3. What Makes You Different */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 lg:mb-12 md:text-center max-w-3xl mx-auto">
            <h2 className="text-foreground">
              What Sets My Work Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-12">
            {/* Feature 1 */}
            <div className="group">
              <div className="text-accent-green mb-3 border-b border-gray-200 pb-3">
                <span className="text-sm font-bold tracking-widest uppercase">01</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Systems Thinking</h3>
              <p className="text-foreground">
                I don’t build isolated features. I design systems that connect, scale, and evolve with your business.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group">
              <div className="text-accent-green mb-3 border-b border-gray-200 pb-3">
                <span className="text-sm font-bold tracking-widest uppercase">02</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Clarity First</h3>
              <p className="text-foreground">
                Clear structure always comes before complexity. Every decision is intentional and aligned with a purpose.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="text-accent-green mb-3 border-b border-gray-200 pb-3">
                <span className="text-sm font-bold tracking-widest uppercase">03</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Built to Scale</h3>
              <p className="text-foreground">
                What you get isn’t temporary. It’s built with growth, flexibility, and future expansion in mind.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group">
              <div className="text-accent-green mb-3 border-b border-gray-200 pb-3">
                <span className="text-sm font-bold tracking-widest uppercase">04</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Design + Development</h3>
              <p className="text-foreground">
                The combination of both allows me to create solutions that are not only functional, but refined and cohesive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Closing Section */}
      <section className="bg-gray-50 py-16 lg:py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-foreground mb-6">
            Let’s Build Something That Works
          </h2>
          <p className="text-foreground mb-10 max-w-2xl mx-auto">
            If you’re serious about building something structured, scalable, and thoughtfully designed, I’m open to working with you. Let’s create something that doesn’t just exist but actually works.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-br-full bg-accent-green text-white px-10 py-4 font-bold hover:bg-accent-green/90 transition-all active:scale-95"
          >
            Get in Touch
          </Link>
        </div>
      </section>

    </main>
  )
}

export default About