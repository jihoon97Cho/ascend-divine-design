import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <>
      {/* Final CTA Section */}
      <section className="py-20 sm:py-24 bg-card/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready To Get More Leads{" "}
              <span className="text-gradient-gold">For Your Business?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Book a free strategy call today. We'll show you exactly how we can
              help you grow — no pressure, no obligations.
            </p>
            <Button variant="hero" size="lg" className="text-lg px-10 py-7 rounded-xl" asChild>
              <Link to="/book">
                Book A Free Strategy Call
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Free consultation · No commitment · Results guaranteed
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Ascend Solutions" className="h-7 w-7" />
              <span className="font-display font-semibold text-foreground">Ascend Solutions</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Ascend Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
