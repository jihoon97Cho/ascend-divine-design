import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long before I see results?",
    answer: "Most clients start seeing leads within the first 7–14 days of launching their campaigns. Results improve over time as we optimize and scale what's working.",
  },
  {
    question: "What businesses do you work with?",
    answer: "We work with service-based businesses, local businesses, e-commerce brands, and B2B companies who want to generate more leads and customers through paid advertising.",
  },
  {
    question: "Do I need a large ad budget?",
    answer: "No. We work with businesses of all sizes. We'll recommend a budget that makes sense for your goals and market. Many of our clients start with as little as $1,000/month in ad spend.",
  },
  {
    question: "How much does your service cost?",
    answer: "Our pricing depends on the scope of work and your growth goals. The best way to find out is to book a free strategy call where we can assess your situation and give you a custom plan.",
  },
  {
    question: "What if I've tried ads before and they didn't work?",
    answer: "That's actually very common. Most ad campaigns fail because of poor targeting, weak offers, or no follow-up system. We fix all of that. Our strategies are proven to work across hundreds of businesses.",
  },
  {
    question: "Is there a contract or commitment?",
    answer: "We don't lock you into long-term contracts. We earn your business every month by delivering results. Most clients stay because the ROI speaks for itself.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border rounded-xl px-6 bg-card/50"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Button variant="hero" size="lg" className="text-lg px-10 py-7 rounded-xl">
            Book A Free Strategy Call
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
