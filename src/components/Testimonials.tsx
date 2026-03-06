import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Marcus Johnson",
    role: "CEO, JDR Properties",
    text: "We went from struggling to get leads to receiving 40+ qualified inquiries per week. Our revenue jumped by 340% in just 4 months.",
    result: "340% Revenue Growth",
    avatar: "MJ",
  },
  {
    name: "Sarah Chen",
    role: "Founder, Bloom Beauty Co.",
    text: "Before Ascend, we were spending $3,000/month on ads with nothing to show for it. Now we get consistent leads at $11 each.",
    result: "$11 Cost Per Lead",
    avatar: "SC",
  },
  {
    name: "David Okafor",
    role: "COO, Nexus Logistics",
    text: "Their team generated $180K in revenue from a $12K ad spend in one quarter. The ROI is unreal. Best investment we've made.",
    result: "15x Return on Ad Spend",
    avatar: "DO",
  },
];

const Testimonials = () => {
  return (
    <section id="results" className="py-20 sm:py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Real Results From <span className="text-gradient-gold">Real Businesses</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Don't take our word for it. See what our clients have to say.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card flex flex-col transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-gold/20 hover:shadow-[0_8px_30px_-8px_hsl(222_30%_5%_/_0.6)]"
            >
              {/* Result badge */}
              <div className="inline-flex self-start items-center px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-4">
                {t.result}
              </div>

              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-6 flex-1">"{t.text}"</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-sm font-bold text-gold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
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
            See If We Can Help Your Business
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
