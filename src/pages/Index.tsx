import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import PainPoints from "@/components/PainPoints";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import IntroAnimation from "@/components/IntroAnimation";

const Index = () => {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroDone(true), []);

  return (
    <div className="min-h-screen bg-background">
      <IntroAnimation onComplete={handleIntroComplete} />
      <MouseGlow />
      <Navbar />
      <Hero />
      <Stats />
      <PainPoints />
      <Services />
      <HowItWorks />
      <Testimonials />
      <WhyUs />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
