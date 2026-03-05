import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Marcus Johnson",
    role: "CEO, JDR Properties",
    avatar: "MJ",
    rating: 5,
    text: "Ascend Solutions completely transformed our online presence. Within 3 months, our lead pipeline grew by 340% and our cost per acquisition dropped by half. These guys don't just talk strategy — they execute.",
    platform: "Google",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Sarah Chen",
    role: "Founder, Bloom Beauty Co.",
    avatar: "SC",
    rating: 5,
    text: "We went from struggling to get 50 website visitors a day to over 2,000 organic visitors within 6 months. The ROI on their content strategy alone paid for the entire engagement 5x over. Absolutely worth every penny.",
    platform: "Google",
    timeAgo: "1 month ago",
  },
  {
    name: "David Okafor",
    role: "COO, Nexus Logistics",
    avatar: "DO",
    rating: 5,
    text: "We've worked with 4 agencies before Ascend. None of them came close. Their paid ads team generated $180K in revenue from a $12K ad spend in Q4 alone. They genuinely care about your bottom line.",
    platform: "Google",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Emily Torres",
    role: "Director, Pinnacle Fitness",
    avatar: "ET",
    rating: 5,
    text: "From our website redesign to our full social media overhaul, Ascend delivered on every single promise. Our membership sign-ups are up 215% and our brand has never looked this strong. Incredible team.",
    platform: "Google",
    timeAgo: "1 month ago",
  },
  {
    name: "James Liu",
    role: "Founder, Atlas SaaS",
    avatar: "JL",
    rating: 5,
    text: "Ascend built us a lead gen funnel that consistently delivers 80+ qualified demos per month. Their data-driven approach and weekly reporting make them feel like an extension of our team, not a vendor.",
    platform: "Google",
    timeAgo: "2 months ago",
  },
  {
    name: "Rachel Adebayo",
    role: "CMO, VerdeFoods",
    avatar: "RA",
    rating: 5,
    text: "Their content creation is on another level. Every piece they produce is scroll-stopping. Our Instagram engagement went from 1.2% to 8.7% and we've been featured in 3 major publications since working with them.",
    platform: "Google",
    timeAgo: "3 weeks ago",
  },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          {/* Google review badge */}
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-6">
            <GoogleIcon />
            <span className="text-sm text-muted-foreground">Rated</span>
            <span className="text-sm font-semibold text-foreground">5.0</span>
            <StarRating rating={5} />
            <span className="text-sm text-muted-foreground">on Google</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            What Our <span className="text-gradient-gold">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't take our word for it — hear from the businesses we've helped scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-card rounded-2xl p-7 border border-border hover:border-gold/30 transition-all duration-500 flex flex-col"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header: avatar, name, Google badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 border-2 border-gold/20">
                      <AvatarFallback className="bg-gold/10 text-gold font-semibold text-sm">
                        {t.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-muted-foreground text-xs">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <GoogleIcon />
                  </div>
                </div>

                {/* Stars + time */}
                <div className="flex items-center gap-3 mb-4">
                  <StarRating rating={t.rating} />
                  <span className="text-xs text-muted-foreground">{t.timeAgo}</span>
                </div>

                {/* Quote */}
                <div className="flex-1">
                  <Quote className="w-5 h-5 text-gold/30 mb-2" />
                  <p className="text-secondary-foreground leading-relaxed text-sm">
                    {t.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.google.com/search?q=Ascend+Solutions+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            <GoogleIcon />
            See all reviews on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
