import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const reasons = [
  "Results-obsessed — every strategy built around measurable growth",
  "Dedicated team that knows your business inside and out",
  "Custom strategies — no cookie-cutter plans",
  "Proven track record with hundreds of businesses scaled",
  "Lightning-fast response and dedicated support",
  "Free consultation with zero obligations",
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Why Choose <span className="text-gradient-gold">Ascend</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We're not just another agency. We're your growth partner.
          </p>
        </motion.div>

        <div className="space-y-4 text-left max-w-xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 py-3"
            >
              <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <span className="text-foreground">{reason}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
