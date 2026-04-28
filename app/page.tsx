import Hero from "@/components/landingPage/Hero";
import Intro from "@/components/landingPage/Intro";
import Services from "@/components/landingPage/Services";
import Pricing from "@/components/landingPage/Pricing";
import Process from "@/components/landingPage/Process";
import FAQ from "@/components/landingPage/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Intro />
      <Services />
      <Process />
      <Pricing />
      <FAQ />
    </main>
  );
}
