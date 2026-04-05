import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const socials = [
    { name: 'LinkedIn', url: 'https://linkedin.com/' },
    { name: 'Instagram', url: 'https://instagram.com/' },
    { name: 'Facebook', url: 'https://facebook.com/' },
    { name: 'Twitter', url: 'https://twitter.com/' },
    { name: 'Github', url: 'https://github.com/' }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Call to Action */}
          <div>
            <h2 className="mb-6 lg:mb-12 text-4xl sm:text-5xl lg:text-5xl pr-4">
              Let Us Turn Your Vision Into Reality
            </h2>
          </div>

          {/* Right: Contact Form / Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-accent-green mb-3 lg:mb-4 text-2xl sm:text-3xl">Get in Touch</h3>
              <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed">
                Whenever you&apos;re ready, reach out. We can help take you to the next level.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Link href="mailto:hello@bukolan.com" className="block text-lg sm:text-xl hover:text-accent-green transition-colors">
                hello@bukolan.com
              </Link>
              <p className="text-white/80 text-lg sm:text-xl">+234-704-580-1111</p>
              
              <Link href="/contact" className="flex items-center space-x-3 group pt-4 w-fit">
                <span className="border-b border-accent-green pb-1 text-sm sm:text-base group-hover:text-accent-green transition-colors uppercase font-bold tracking-wide">
                  Schedule A Meeting
                </span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Socials */}
        <div className="mt-16 lg:mt-24 pt-8 lg:pt-10 border-t border-white/20 flex flex-wrap gap-x-6 gap-y-4 justify-start">
          {socials.map((social) => (
            <Link 
              key={social.name} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-accent-green uppercase transition-colors text-sm sm:text-base tracking-wider font-medium"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Footer;
