import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm mb-8"
          >
            <Zap className="w-4 h-4" />
            <span>Marketing That Actually Converts</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6">
            Scale Your Business with{" "}
            <span className="text-gradient-gold">Proven Growth</span>{" "}
            Strategies
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We help businesses generate more leads, more customers, and more revenue
            using cutting-edge ads, content, and data-driven growth systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button variant="hero" size="lg" className="text-base px-10 py-6">
              Book a Free Call
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-10 py-6">
              How It Works
            </Button>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>→ No obligations</span>
            <span>→ Free strategy session</span>
            <span>→ Results guaranteed</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
