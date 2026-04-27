import React from 'react';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="relative py-32 lg:py-48 bg-foreground text-background overflow-hidden border-t border-background/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <h1 className="mb-8 max-w-6xl">
          Let&apos;s Discuss Your Project Together
        </h1>
        
        <p className="text-background/70 max-w-xl mx-auto text-xs sm:text-sm uppercase tracking-[0.2em] leading-relaxed mb-8 font-semibold">
          Or fill the brief form and we&apos;ll contact you shortly with a clear project plan
        </p>

        <Link 
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-2 rounded-full border-2 border-background hover:bg-background hover:text-foreground transition-all duration-500"
        >
          Fill The Form
        </Link>
      </div>
    </section>
  );
};

export default CTA;
