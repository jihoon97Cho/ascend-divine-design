import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Johnson",
    role: "CEO, JDR Properties",
    text: "Ascend completely transformed our online presence. Our lead pipeline grew by 340% and cost per acquisition dropped by half.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Founder, Bloom Beauty Co.",
    text: "We went from 50 daily visitors to over 2,000 organic visitors in 6 months. The ROI paid for the engagement 5x over.",
    rating: 5,
  },
  {
    name: "David Okafor",
    role: "COO, Nexus Logistics",
    text: "Their paid ads team generated $180K in revenue from a $12K ad spend in Q4 alone. They genuinely care about your bottom line.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-card/50">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Real Results. <span className="text-gradient-gold">Real Growth.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't take our word for it — hear from our clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border bg-background"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-display font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
