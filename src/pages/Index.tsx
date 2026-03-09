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
import { usePageTracking, useSectionTracking } from "@/hooks/useVisitorTracking";

const Index = () => {
  const [introDone, setIntroDone] = useState(false);
  const handleComplete = useCallback(() => setIntroDone(true), []);

  usePageTracking("/");
  useSectionTracking("/");

  return (
    <div className="min-h-screen bg-background">
      <IntroAnimation onComplete={handleComplete} />
      <MouseGlow />
      <Navbar />
      <div data-section="hero"><Hero /></div>
      <div data-section="stats"><Stats /></div>
      <div data-section="pain-points"><PainPoints /></div>
      <div data-section="services"><Services /></div>
      <div data-section="how-it-works"><HowItWorks /></div>
      <div data-section="testimonials"><Testimonials /></div>
      <div data-section="why-us"><WhyUs /></div>
      <div data-section="faq"><FAQ /></div>
      <div data-section="footer"><Footer /></div>
    </div>
  );
};

export default Index;
