import { motion } from "framer-motion";
import { Megaphone, Target, TrendingUp, Globe, Palette, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    description: "Build brand awareness and attract engaged followers that convert into paying customers.",
  },
  {
    icon: Target,
    title: "Paid Advertising",
    description: "High-ROI campaigns on Meta, Google, and TikTok that deliver qualified leads consistently.",
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Data-driven roadmaps and funnel optimization to scale revenue predictably.",
  },
  {
    icon: Globe,
    title: "Web Design & Development",
    description: "Conversion-focused websites that turn visitors into customers seamlessly.",
  },
  {
    icon: Palette,
    title: "Content Creation",
    description: "Scroll-stopping visuals and copy that resonate with your ideal audience.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Crystal-clear dashboards so you always know your ROI and growth metrics.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything your business needs to dominate online.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-gold/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:glow-gold transition-all duration-500">
                  <service.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
