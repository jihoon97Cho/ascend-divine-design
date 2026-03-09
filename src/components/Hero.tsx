import { motion } from "framer-motion";
import { ArrowRight, Star, Users, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm mb-6"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <span>Trusted by 100+ Businesses</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-[1.1] mb-6">
              We'll Help You Get{" "}
              <span className="text-gradient-gold font-black">1,000+ Qualified Leads</span>{" "}
              In The Next 90 Days
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-foreground max-w-2xl mx-auto lg:mx-0 mb-4 leading-relaxed">
              Even if you've never run ads before. No guessing. No wasted money.
            </p>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              You only pay after we deliver results. Guaranteed lead generation system used by 100+ businesses.
            </p>

            {/* Single CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="text-xl font-bold px-12 py-8 rounded-xl shadow-2xl" asChild>
                <Link to="/book">
                  Get My Lead Generation System
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-8 text-sm font-semibold justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-foreground">
                <Users className="w-5 h-5 text-gold" />
                <span>100+ Businesses Helped</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <TrendingUp className="w-5 h-5 text-gold" />
                <span>$8.5M+ Lead Value Generated</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <BarChart3 className="w-5 h-5 text-gold" />
                <span>90-Day Results Guaranteed</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Analytics visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main dashboard card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Leads Generated</p>
                    <p className="text-3xl font-display font-bold text-gradient-gold">2,847</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    <span>+127%</span>
                  </div>
                </div>
                {/* Simulated chart bars */}
                <div className="flex items-end gap-2 h-32">
                  {[35, 45, 30, 55, 65, 50, 75, 85, 70, 95, 80, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-gold-dark to-gold-light opacity-80"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg ROI</p>
                    <p className="font-display font-bold text-foreground">3.2x</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
