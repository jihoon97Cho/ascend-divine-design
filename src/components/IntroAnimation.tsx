import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chevronLogo from "@/assets/logo-chevron.png";

const INTRO_SESSION_KEY = "ascend_intro_shown";

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Skip if already shown this session
    if (sessionStorage.getItem(INTRO_SESSION_KEY)) {
      setVisible(false);
      onComplete();
      return;
    }

    sessionStorage.setItem(INTRO_SESSION_KEY, "1");

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 450);
    }, 1750);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Skip if already shown
  if (sessionStorage.getItem(INTRO_SESSION_KEY) && !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Background overlay matching hero - vertical wipe from bottom */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "hsl(var(--background))",
            }}
            initial={{ clipPath: "inset(0 0 0 0)" }}
            animate={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 1.9, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
          />

          {/* Blur overlay for premium feel */}
          <motion.div
            className="absolute inset-0 backdrop-blur-md"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          />

          {/* Chevron logo sliding upward */}
          <motion.img
            src={chevronLogo}
            alt=""
            className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 object-contain"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: "-85vh", opacity: 0 }}
            transition={{
              y: { duration: 1.9, ease: [0.65, 0, 0.35, 1], delay: 0.1 },
              opacity: { duration: 0.4, ease: "easeOut", delay: 1.5 },
            }}
            style={{ marginBottom: "15vh" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
