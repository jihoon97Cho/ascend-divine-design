import { motion } from "framer-motion";
import { Megaphone, BarChart3, Globe, PenTool, Target, TrendingUp } from "lucide-react";

const services = [
  { icon: Megaphone, title: "Paid Advertising", description: "High-converting ad campaigns across Meta, Google & TikTok that drive real revenue." },
  { icon: PenTool, title: "Content Strategy", description: "Scroll-stopping content that builds authority and turns followers into customers." },
  { icon: Target, title: "Lead Generation", description: "Automated funnels and systems that deliver qualified leads on autopilot." },
  { icon: BarChart3, title: "Analytics & CRO", description: "Data-driven optimization to maximize every dollar of your marketing spend." },
  { icon: Globe, title: "Web & Funnel Design", description: "High-converting websites and funnels designed to capture and convert." },
  { icon: TrendingUp, title: "Growth Systems", description: "End-to-end growth infrastructure that scales predictably with your business." },
];

const Services = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            What We Do & <span className="text-gradient-gold">Why It Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Full-stack growth services designed to scale your business predictably.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl border border-border bg-card hover:border-gold/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                <service.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
