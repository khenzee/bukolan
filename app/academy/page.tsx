import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: "Academy | Bukola",
  description: "Learn to Build Real-World Web Applications — Not Just Tutorials.",
};

const Academy = () => {
  return (
    <main className="min-h-screen bg-white pt-24 lg:pt-32">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 pt-8">
        <div className="max-w-6xl">
          <h1 className="text-foreground mb-8">
            Learn to Build Real-World Web Applications Not Just Tutorials
          </h1>
          <p className="text-foreground font-medium mb-12 max-w-3xl ">
            A structured, full-stack program focused on modern development, systems thinking, and using AI to build faster and smarter.
          </p>
          
          {/* Quick Info Strip */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 mb-12 bg-gray-50 p-6 sm:p-8 rounded-3xl w-fit">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-1">Duration</span>
              <span className="font-bold text-lg text-foreground">2 Months</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-1">Format</span>
              <span className="font-bold text-lg text-foreground">Online</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-1">Focus</span>
              <span className="font-bold text-lg text-foreground">Full-Stack + AI</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-200 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest mb-1">Price</span>
              <span className="font-bold text-accent-green text-lg">₦350,000</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block rounded-br-3xl bg-accent-green text-white px-10 py-5 font-bold hover:bg-accent-green/90 transition-all active:scale-95 text-sm uppercase tracking-widest"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* 2. What You'll Learn Grid */}
      <section className="bg-gray-50 py-16 lg:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:text-center max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-accent-green uppercase tracking-widest mb-4">Curriculum</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              What You’ll Learn
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-12">
            {[
              {
                title: "Frontend Foundations",
                desc: "HTML, CSS, JavaScript — built properly, not rushed.",
                num: "01"
              },
              {
                title: "Modern React & Next.js",
                desc: "Build scalable frontend applications using industry-relevant tools.",
                num: "02"
              },
              {
                title: "Backend Development",
                desc: "APIs, server logic, and application structure using Node.js & Express.",
                num: "03"
              },
              {
                title: "Databases",
                desc: "Work with both PostgreSQL and MongoDB based on real use cases.",
                num: "04"
              },
              {
                title: "AI-Assisted Development",
                desc: "Learn how to use AI tools to speed up development and improve workflow.",
                num: "05"
              },
              {
                title: "Deployment & Workflow",
                desc: "From local development to production-ready applications.",
                num: "06"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-4xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-accent-green mb-6 border-b border-gray-100 pb-4">
                  <span className="text-sm font-bold tracking-widest uppercase">{item.num}</span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{item.title}</h4>
                <p className="text-foreground font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Outcomes & Target Audience (Split Layout) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Outcome */}
            <div className="bg-gray-50 p-10 sm:p-14 rounded-4xl">
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                What You’ll Be Able to Build
              </h3>
              <p className="text-foreground font-medium mb-10 leading-relaxed text-lg">
                By the end of the program, you won’t just understand concepts—you’ll build real projects like:
              </p>
              <ul className="space-y-6">
                {[
                  "Full-stack web applications",
                  "MVPs ready for launch",
                  "Business websites with real structure",
                  "Internal tools and dashboards"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-foreground font-medium text-lg">
                    <div className="w-3 h-3 rounded-sm bg-accent-green mt-2 shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who This Is For */}
            <div className="p-4 sm:p-8">
              <h3 className="text-foreground mb-8">
                Who This Program Is For
              </h3>
              <ul className="space-y-8 mt-12">
                {[
                  "People serious about learning development properly",
                  "Beginners who want a structured path",
                  "Developers who feel stuck and want real clarity",
                  "Anyone looking to build real-world projects—not just follow tutorials"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-5 text-foreground font-medium text-lg border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-accent-green text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {i+1}
                    </div>
                    <span className="pt-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Program Structure & Pricing (Dark Section) */}
      <section className="bg-foreground text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Structure */}
            <div>
              <h2 className="text-accent-green mb-4">Structure</h2>
              <h3 className="mb-8">
                How It Works
              </h3>
              <p className="font-medium mb-12  text-white max-w-lg">
                The program is designed to be highly focused and inherently practical.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                   "Duration: 2 Months",
                   "Live / Guided Sessions",
                   "Project-Based Learning",
                   "Small Cohort (focused attention)",
                 ].map((item, i) => (
                    <div key={i} className="bg-white/10 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-accent-green shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                      <span className="font-bold">{item}</span>
                    </div>
                 ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white border border-white/10 p-10 md:p-14 rounded-[2.5rem] shadow-2xl">
              <h2 className="text-foreground mb-4">Investment</h2>
              <p className="text-5xl text-accent-green mb-8">
                ₦350,000
              </p>
              <p className="text-foreground leading-relaxed mb-10">
                This is a focused, high-value program designed to give you real, applicable skills — not surface-level knowledge.
              </p>
              <Link
                href="/contact"
                className="block text-center rounded-br-3xl bg-foreground text-white px-10 py-5 font-bold hover:bg-black transition-all active:scale-95 text-sm uppercase tracking-widest w-full"
              >
                Join Next Cohort
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-foreground mb-6">
            Ready to Learn It the Right Way?
          </h2>
          <p className="text-foreground mb-12 max-w-2xl mx-auto">
            If you’re serious about building real skills and working on meaningful projects, this program is for you.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-br-3xl bg-accent-green text-white px-12 py-5 font-bold hover:bg-accent-green/90 transition-all active:scale-[0.98] text-sm uppercase tracking-widest"
          >
            Apply Now
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Academy