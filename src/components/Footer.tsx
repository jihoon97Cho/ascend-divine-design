import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <>
      {/* CTA Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-card rounded-3xl p-12 md:p-16 text-center border border-border overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/3" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
                Ready to <span className="text-gradient-gold">Ascend</span>?
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
                Book your free strategy call today and discover how we can accelerate your growth.
              </p>
              <Button variant="hero" size="lg" className="text-base px-10 py-6">
                Book a Free Call
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Ascend Solutions" className="h-8 w-8" />
              <span className="font-display font-bold text-lg">Ascend Solutions</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#services" className="hover:text-foreground transition-colors">Services</a>
              <a href="#why-us" className="hover:text-foreground transition-colors">Why Us</a>
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
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
