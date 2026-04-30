"use client";

import React from 'react'
import Link from 'next/link'
import { useFormModal } from '@/components/landingPage/FormModalContext'

import Image from 'next/image'

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
          <h2 className="mb-6 max-w-4xl mx-auto">
            Let&apos;s Discuss Your Project Together
          </h2>
          
          <p className="text-background/70 max-w-xl mx-auto mb-10 lg:mb-12 font-medium">
            Fill the brief form and we&apos;ll contact you shortly with a clear project plan.
          </p>

          <button 
            onClick={() => openForm('lite')}
            className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-background text-caption font-bold hover:bg-background hover:text-foreground transition-all duration-500 cursor-pointer"
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
              <h4 className="text-background/40 mb-4">Location</h4>
              <div className="space-y-3 flex flex-col items-center md:items-start">
                <p className="text-background/80 font-medium">
                  Lagos, Nigeria<br />
                  Available Worldwide
                </p>
              </div>
            </div>

            {/* Column 2: Contact (Center on desktop) */}
            <div className="space-y-6 text-center">
              <h4 className="text-background/40 mb-4">Contact</h4>
              <div className="space-y-3 flex flex-col items-center">
                <Link href="mailto:hello@divulge.digital" className="block font-medium hover:text-background/70 transition-colors">
                  hello@divulge.digital
                </Link>
                <p className="font-medium">+234 704 580 1111</p>
              </div>
            </div>

            {/* Column 3: Socials (Right on desktop) */}
            <div className="space-y-6 text-center md:text-right">
              <h4 className="text-background/40 mb-4">Socials</h4>
              <div className="flex flex-col items-center md:items-end space-y-3">
                {socials.map((social) => (
                  <Link 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-background/80 hover:text-background transition-colors w-fit font-medium"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Metabar */}
          <div className="w-full border-t border-background/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start group">
              <Image 
                src="/images/divulge-text-white-logo.svg" 
                alt="Divulge Digital" 
                width={120} 
                height={40} 
                className="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-background/60 text-caption font-medium">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          {/* Giant Agency Name */}
          <div className="mt-12 lg:mt-20 w-full flex flex-col justify-center items-center select-none text-center">
            <h2 className="text-[18vw] leading-[0.75] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-linear-to-b from-background via-background/40 to-transparent">
              Divulge
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;
