import { motion } from "framer-motion";
import { CheckCircle, Users, Clock, Trophy, Lightbulb, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Trophy, title: "Results-Obsessed", description: "Every strategy is built around measurable, bottom-line growth." },
  { icon: Clock, title: "Lightning-Fast Response", description: "Quick communication and dedicated support whenever you need it." },
  { icon: Users, title: "Dedicated Team", description: "A personal growth team that knows your business inside and out." },
  { icon: Lightbulb, title: "Custom Strategies", description: "No cookie-cutter plans—tailored approaches for every business." },
  { icon: CheckCircle, title: "Proven Track Record", description: "Hundreds of businesses scaled with data-driven campaigns." },
  { icon: HeartHandshake, title: "Zero Pressure", description: "Free consultation with no obligations or commitments required." },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 relative">
      <div className="absolute inset-0 bg-card/50" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Why Choose <span className="text-gradient-gold">Ascend</span>
          </h2>
          <p className="text-muted-foreground text-lg">We're not just another agency. We're your growth partner.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border hover:border-gold/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                <reason.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
