import { motion } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  Globe,
  DollarSign,
  BarChart3,
  Target,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const prepItems = [
  { icon: Globe, text: "Your website or social media page" },
  { icon: DollarSign, text: "Your current offer or service pricing" },
  { icon: BarChart3, text: "Any past ad results if you have them" },
  { icon: Target, text: "Your goal for the next 90 days" },
];

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Ascend Solutions" className="h-8 w-8" />
            <span className="font-display font-bold text-lg text-foreground">
              Ascend Solutions
            </span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Confirmation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              You Are <span className="text-gradient-gold">Booked</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Your strategy call is scheduled. Check your email and text for
              confirmation.
            </p>
          </motion.div>

          {/* Calendar reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <Calendar className="w-5 h-5 text-gold" />
              <p className="font-display font-semibold text-foreground">
                Please add this call to your calendar so you do not miss it.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="w-full border-border hover:border-gold/40 hover:text-gold"
                asChild
              >
                <a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Strategy+Call+with+Ascend+Solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Calendar
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-border hover:border-gold/40 hover:text-gold"
                asChild
              >
                <a
                  href="https://outlook.live.com/calendar/0/deeplink/compose?subject=Strategy+Call+with+Ascend+Solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Outlook Calendar
                </a>
              </Button>
              <Button
                variant="outline"
                className="w-full border-border hover:border-gold/40 hover:text-gold"
                asChild
              >
                <a href="#" onClick={() => alert("Download .ics file for Apple Calendar")}>
                  Apple Calendar
                </a>
              </Button>
            </div>
          </motion.div>

          {/* What to Have Ready */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-8"
          >
            <h2 className="font-display font-bold text-xl mb-5">
              What to Have Ready
            </h2>
            <div className="space-y-4">
              {prepItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-gold" />
                  </div>
                  <p className="text-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reminder note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-secondary border border-border text-center sm:text-left"
          >
            <Bell className="w-5 h-5 text-muted-foreground shrink-0" />
            <p className="text-sm text-muted-foreground">
              You will also receive automated email and text reminders before the
              call.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
