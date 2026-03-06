import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Calendar = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.leadconnectorhq.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Ascend Solutions" className="h-8 w-8" />
            <span className="font-display font-bold text-lg text-foreground">
              Ascend Solutions
            </span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <section className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Schedule Your{" "}
                <span className="text-gradient-gold">Strategy Call</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">
                Choose a time that works best for you.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/wtu17F85axGcNlcTUeA2"
                style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "700px" }}
                scrolling="no"
                id="wtu17F85axGcNlcTUeA2_booking"
                title="Book a Strategy Call"
              />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Calendar;
