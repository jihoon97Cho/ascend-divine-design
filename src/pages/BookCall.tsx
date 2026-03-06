import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const BookCall = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
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
        <section className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Book Your{" "}
                <span className="text-gradient-gold">Free Strategy Call</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">
                Answer a few quick questions so we can prepare for your call.
              </p>
            </div>

            <iframe
              src="https://api.leadconnectorhq.com/widget/survey/osLiQSua3d7h5WtthTt4"
              style={{ border: "none", width: "100%", minHeight: "500px" }}
              scrolling="no"
              id="osLiQSua3d7h5WtthTt4"
              title="Survey"
            />
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default BookCall;
