import { motion } from "framer-motion";
import { BarChart3, Target, FileText, TrendingUp } from "lucide-react";

const differentiators = [
  {
    icon: BarChart3,
    title: "Data-Driven Strategies",
    description: "Every decision is backed by data. No guesswork, just proven results.",
  },
  {
    icon: Target,
    title: "Conversion-Optimized Funnels",
    description: "We build funnels that turn clicks into customers at the lowest cost.",
  },
  {
    icon: FileText,
    title: "Transparent Reporting",
    description: "You'll always know exactly where your money is going and what it's producing.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Optimization",
    description: "We constantly test and improve campaigns to maximize your ROI over time.",
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 sm:py-24 bg-card/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Why Businesses <span className="text-gradient-gold">Choose Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We're not just another marketing agency. Here's what makes us different.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-6 rounded-xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-[0_8px_30px_-8px_hsl(222_30%_5%_/_0.6)]"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
