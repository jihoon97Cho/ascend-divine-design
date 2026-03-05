import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <>
      {/* CTA Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
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
