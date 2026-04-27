import Hero from "@/components/landingPage/Hero";
import Intro from "@/components/landingPage/Intro";
import Services from "@/components/landingPage/Services";
import Pricing from "@/components/landingPage/Pricing";
import Process from "@/components/landingPage/Process";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Intro />
      <Services />
      <Process />
      <Pricing />
    </main>
  );
}
