"use client";

import React from 'react'
import Link from 'next/link'
import { useFormModal } from '@/components/landingPage/FormModalContext'

const Footer = () => {
  const { openForm } = useFormModal();

  const socials = [
    { name: 'LinkedIn', url: 'https://linkedin.com/' },
    { name: 'Instagram', url: 'https://instagram.com/' },
    { name: 'Twitter', url: 'https://twitter.com/' },
    { name: 'Github', url: 'https://github.com/' }
  ];

  return (
    <section id="contact" className="bg-foreground text-background overflow-hidden">
      {/* Massive CTA Block */}
      <div className="relative py-16 lg:py-28 border-b border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <h1 className="mb-6 max-w-4xl mx-auto tracking-tight">
            Let&apos;s Discuss Your Project Together
          </h1>
          
          <p className="text-background/70 max-w-xl mx-auto mb-10 lg:mb-12 font-medium text-lg lg:text-xl leading-relaxed">
            Fill the brief form and we&apos;ll contact you shortly with a clear project plan.
          </p>

          <button 
            onClick={() => openForm('lite')}
            className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-background uppercase tracking-widest text-sm font-bold hover:bg-background hover:text-foreground transition-all duration-500 cursor-pointer"
          >
            Fill The Form
          </button>
        </div>
      </div>

      {/* Footer Info / Contact Details */}
      <div className="pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12 lg:mb-20">
            
            {/* Column 1: Location (Left on desktop) */}
            <div className="space-y-6 text-center md:text-left">
              <h3 className="text-background/40 uppercase tracking-widest text-xs font-bold mb-4">Location</h3>
              <div className="space-y-3 flex flex-col items-center md:items-start">
                <p className="text-lg md:text-xl text-background/80 leading-relaxed font-medium">
                  Lagos, Nigeria<br />
                  Available Worldwide
                </p>
              </div>
            </div>

            {/* Column 2: Contact (Center on desktop) */}
            <div className="space-y-6 text-center">
              <h3 className="text-background/40 uppercase tracking-widest text-xs font-bold mb-4">Contact</h3>
              <div className="space-y-3 flex flex-col items-center">
                <Link href="mailto:hello@divulge.digital" className="block text-xl md:text-2xl font-medium hover:text-background/70 transition-colors">
                  hello@divulge.digital
                </Link>
                <p className="text-xl md:text-2xl font-medium">+234 704 580 1111</p>
              </div>
            </div>

            {/* Column 3: Socials (Right on desktop) */}
            <div className="space-y-6 text-center md:text-right">
              <h3 className="text-background/40 uppercase tracking-widest text-xs font-bold mb-4">Socials</h3>
              <div className="flex flex-col items-center md:items-end space-y-3">
                {socials.map((social) => (
                  <Link 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg md:text-xl text-background/80 hover:text-background transition-colors w-fit font-medium"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Metabar */}
          <div className="w-full border-t border-background/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <span className="text-background/60 text-sm font-medium">© {new Date().getFullYear()} Divulge Digital. All rights reserved.</span>
            <span className="text-background/60 text-sm font-medium flex items-center justify-center gap-3">
              Crafted for Growth <span className="w-1.5 h-1.5 rounded-full bg-background/60"></span>
            </span>
          </div>

          {/* Giant Agency Name */}
          <div className="mt-8 lg:mt-12 w-full flex justify-center items-center">
            <h2 className="text-[17vw] leading-[0.8] font-bold tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-background via-background/50 to-transparent select-none text-center">
              Divulge
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;
