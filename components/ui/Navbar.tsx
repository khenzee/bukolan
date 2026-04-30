"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { useFormModal } from '@/components/landingPage/FormModalContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { openForm } = useFormModal();
  const lenis = useLenis();

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleScrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(id, { 
        offset: -80,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      setIsOpen(false);
    }
  }

  const handleCtaClick = () => {
    openForm('lite');
    setIsOpen(false);
  }

  return (
    <nav className="fixed bg-foreground rounded-br-[3rem] left-0 top-0 z-50 w-full md:w-auto transition-all duration-300 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between gap-12 items-center">
          {/* Text Logo */}
          <Link href="/" className="shrink-0 flex flex-col items-start leading-[0.8] group">
            <span className="text-xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-linear-to-b from-white to-white/60">
              Divulge
            </span>
            <span className="text-[10px] font-bold tracking-[0.6em] uppercase ml-1 text-transparent bg-clip-text bg-linear-to-b from-background to-background/60">
              Digital
            </span>
          </Link>

          {/* Links for Desktop */}
          <div className="hidden md:flex items-center text-background space-x-8">
            <button 
              onClick={() => handleScrollTo('#projects')}
              className="text-caption hover:text-accent-green transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button 
              onClick={() => handleScrollTo('#process')}
              className="text-caption hover:text-accent-green transition-colors cursor-pointer"
            >
              Process
            </button>
            <button 
              onClick={() => handleScrollTo('#pricing')}
              className="text-caption hover:text-accent-green transition-colors cursor-pointer"
            >
              Pricing
            </button>
            
            {/* CTA */}
            <button 
              onClick={() => openForm('lite')}
              className="bg-accent-green rounded-br-full text-background px-8 py-2.5 hover:opacity-90 transition-opacity text-caption ml-4 cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-white hover:text-accent-green transition-colors focus:outline-none p-2 rounded-md"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-foreground rounded-br-[3rem] transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100 py-8 border-t border-white/5' : 'max-h-0 opacity-0 py-0 border-t-0'
        }`}
      >
        <div className="flex flex-col text-center space-y-8 px-8">
          <button 
            onClick={() => handleScrollTo('#projects')}
            className="text-white text-caption hover:text-accent-green transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button 
            onClick={() => handleScrollTo('#process')}
            className="text-white text-caption hover:text-accent-green transition-colors cursor-pointer"
          >
            Process
          </button>
          <button 
            onClick={() => handleScrollTo('#pricing')}
            className="text-white text-caption hover:text-accent-green transition-colors cursor-pointer"
          >
            Pricing
          </button>
          
          {/* CTA */}
          <button 
            onClick={handleCtaClick}
            className="bg-accent-green rounded-br-[2rem] text-white px-8 py-5 hover:opacity-90 transition-opacity text-caption text-center w-full mt-4 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
