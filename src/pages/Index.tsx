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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
