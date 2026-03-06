import { motion } from "framer-motion";
import { DollarSign, TrendingDown, Users, HelpCircle } from "lucide-react";

const painPoints = [
  {
    icon: DollarSign,
    title: "Spending money on ads with no results",
    description: "You've tried running ads but leads are too expensive or don't convert.",
  },
  {
    icon: TrendingDown,
    title: "Inconsistent lead flow",
    description: "Some months are great, others are dead. You never know what's coming.",
  },
  {
    icon: Users,
    title: "Relying too much on referrals",
    description: "Referrals are great but you can't scale or predict your growth with them.",
  },
  {
    icon: HelpCircle,
    title: "Not knowing how to scale marketing",
    description: "You know you need to grow but don't know where to start or what works.",
  },
];

const PainPoints = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Struggling To Get <span className="text-gradient-gold">Consistent Leads</span> For Your Business?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            If any of these sound familiar, you're not alone. Most businesses face these exact problems.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 p-6 rounded-xl border border-border bg-card/50 transition-all duration-300 hover:scale-105 hover:border-gold/20 hover:shadow-[0_8px_30px_-8px_hsl(222_30%_5%_/_0.6)]"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                <point.icon className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
