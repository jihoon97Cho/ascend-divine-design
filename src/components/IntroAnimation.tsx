import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"logo" | "transition" | "done">("logo");

  useEffect(() => {
    // After logo shows, begin transition
    const t1 = setTimeout(() => setPhase("transition"), 600);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.img
            src={logo}
            alt="Ascend Solutions"
            className="w-16 h-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              phase === "logo"
                ? { opacity: 1, scale: 1.04 }
                : {
                    opacity: 1,
                    scale: 0.55,
                    x: typeof window !== "undefined" ? -(window.innerWidth / 2 - 56) : -200,
                    y: typeof window !== "undefined" ? -(window.innerHeight / 2 - 28) : -300,
                  }
            }
            transition={{
              duration: phase === "logo" ? 0.5 : 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
