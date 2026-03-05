import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MouseGlow />
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Testimonials />
      <WhyUs />
      <Footer />
    </div>
  );
};

export default Index;
