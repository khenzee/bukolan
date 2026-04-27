import Hero from "@/components/landingPage/Hero";
import Intro from "@/components/landingPage/Intro";
import Services from "@/components/landingPage/Services";
import Pricing from "@/components/landingPage/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Intro />
      <Services />
      <Pricing />
    </main>
  );
}
