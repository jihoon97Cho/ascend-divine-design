import { motion } from "framer-motion";
import { Phone, Rocket, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "Strategy Call",
    description: "We analyze your business, current marketing, and find your biggest growth opportunities.",
  },
  {
    icon: Rocket,
    step: "02",
    title: "Campaign Setup",
    description: "We build and launch optimized ad campaigns tailored specifically to your business.",
  },
  {
    icon: Target,
    step: "03",
    title: "Lead Generation",
    description: "Your business starts receiving consistent, qualified leads and inquiries every day.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 sm:py-24 bg-card/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            How It <span className="text-gradient-gold">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Getting started is simple. Here's our proven 3-step process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-7 h-7 text-gold" />
              </div>
              <span className="text-xs font-semibold text-gold tracking-widest uppercase mb-2 block">
                Step {step.step}
              </span>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="hero" size="lg" className="text-lg px-10 py-7 rounded-xl">
            Book A Free Strategy Call
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
