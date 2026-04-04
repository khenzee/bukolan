"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="fixed bg-foreground rounded-br-full left-0 top-0 z-50 w-full md:w-auto transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between gap-8 items-center">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Image 
              src="/images/logo.svg" 
              alt="Logo" 
              width={120} 
              height={40} 
              className="h-8 mix-blend-screen w-auto"
            />
          </div>

          {/* Links for Desktop */}
          <div className="hidden md:flex items-center text-white space-x-6">
            <Link href="#about" className="text-sm font-medium hover:text-accent-green transition-colors uppercase">
              About Me
            </Link>
            <Link href="#works" className="text-sm font-medium hover:text-accent-green transition-colors uppercase">
              Works
            </Link>
            <Link href="#academy" className="text-sm font-medium hover:text-accent-green transition-colors uppercase">
              Academy
            </Link>
            
            {/* CTA */}
            <Link 
              href="#contact" 
              className="bg-accent-green rounded-br-full text-white px-8 py-3 font-bold hover:opacity-90 transition-opacity uppercase text-sm ml-4"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-white hover:text-accent-green transition-colors focus:outline-none p-2 rounded-md"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" strokeWidth={2.5} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-foreground rounded-tr-[4rem] transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[400px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0 border-t-0'
        }`}
      >
        <div className="flex flex-col text-center space-y-6 px-8">
          <Link 
            href="#about" 
            onClick={() => setIsOpen(false)}
            className="text-white text-lg font-medium hover:text-accent-green transition-colors uppercase"
          >
            About Me
          </Link>
          <Link 
            href="#works" 
            onClick={() => setIsOpen(false)}
            className="text-white text-lg font-medium hover:text-accent-green transition-colors uppercase"
          >
            Works
          </Link>
          <Link 
            href="#academy" 
            onClick={() => setIsOpen(false)}
            className="text-white text-lg font-medium hover:text-accent-green transition-colors uppercase"
          >
            Academy
          </Link>
          
          {/* CTA */}
          <Link 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="bg-accent-green rounded-br-full text-white px-8 py-4 font-bold hover:opacity-90 transition-opacity uppercase text-center w-full mt-4"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
