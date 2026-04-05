"use client";

import React from 'react'
import HeroReveal from '@/components/landingPage/heroReveal'

const Contact = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <HeroReveal
        imageSrc="/images/hero-img.png"
        revealRadius={130}
        trailFade={1.5}
        blurAmount={16}
      >
        <div className="max-w-7xl min-h-dvh flex flex-col justify-center lg:justify-between py-24 lg:py-40 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 lg:gap-12 mt-12 lg:mt-0 w-full">
            
            {/* Left Column / Copy */}
            <div className="space-y-6 lg:space-y-8 max-w-xl z-10 w-full">
              <div>
                <h1 className="text-white">
                  Let&apos;s build something that works.
                </h1>
              </div>
              <p className="text-white max-w-md opacity-90">
                If you’re serious about building something structured, scalable, and thoughtfully designed, I’m open to working with you. Fill out the form, and I&apos;ll be in touch shortly.
              </p>
            </div>

            {/* Right Column / Form Container */}
            <div className="relative w-full lg:w-[480px] flex flex-col z-10">
              <div className="w-full bg-white/5 backdrop-blur-lg border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl">
                <h3 className="text-white text-2xl font-bold mb-8">Start a conversation</h3>
                
                <form className="flex flex-col gap-5 w-full">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-white text-sm mb-2 font-medium">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      placeholder="John Doe" 
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-green focus:bg-white/10 transition-all font-medium" 
                      required
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-white text-sm mb-2 font-medium">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="john@example.com" 
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-green focus:bg-white/10 transition-all font-medium" 
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-white text-sm mb-2 font-medium">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      id="phone"
                      placeholder="+1 (555) 000-0000" 
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-green focus:bg-white/10 transition-all font-medium" 
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-whitez text-sm mb-2 font-medium">Project Details</label>
                    <textarea 
                      id="message"
                      placeholder="Tell me about your goals, timeline, and what you're looking to build..." 
                      rows={4} 
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-green focus:bg-white/10 transition-all resize-none font-medium"
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="bg-accent-green text-white font-bold rounded-br-[1.5rem] px-8 py-4 w-full hover:bg-accent-green/90 transition-all active:scale-[0.98] uppercase text-sm tracking-widest mt-4"
                    onClick={(e) => e.preventDefault()}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </HeroReveal>
    </section>
  )
}

export default Contact