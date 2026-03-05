import { motion } from "framer-motion";
import { ArrowRight, Zap, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Scale Your Business with{" "}
              <span className="text-gradient-gold">Proven Growth</span>{" "}
              Strategies
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              We help businesses generate more leads, more customers, and more revenue
              using cutting-edge ads, content, and data-driven growth systems.
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold" />
                <span>Results Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gold" />
                <span>Free Consultation</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-base px-8 py-6">
                Book a Free Call
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
              <Button variant="heroOutline" size="lg" className="text-base px-8 py-6">
                View Our Work
              </Button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-lg shadow-background/50"
          >
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full ${step === 1 ? "bg-gradient-gold" : "bg-muted"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-1">Step 1 of 3</p>
            <h3 className="text-xl font-display font-semibold mb-6">Get Your Free Strategy</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              />
              <input
                type="text"
                placeholder="Business Name"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              />
              <Button variant="hero" className="w-full py-6 text-base">
                Get My Free Strategy
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
