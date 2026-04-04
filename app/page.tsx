import Hero from "@/components/landingPage/Hero";
import Intro from "@/components/landingPage/Intro";
import Services from "@/components/landingPage/Services";
import WhyMe from "@/components/landingPage/WhyMe";
import ContactSection from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Intro />
      <Services />
      <WhyMe />
      
    </main>
  );
}
