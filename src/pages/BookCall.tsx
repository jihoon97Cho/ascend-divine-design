import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const GHLCalendar = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the GHL embed script
    const script = document.createElement("script");
    script.src = "https://api.leadconnectorhq.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/wtu17F85axGcNlcTUeA2"
        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "700px" }}
        scrolling="no"
        id="wtu17F85axGcNlcTUeA2_booking"
        title="Book a Strategy Call"
      />
    </div>
  );
};

const BookCall = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    industry: "",
    revenue: "",
    adBudget: "",
    challenge: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormSubmitted(true);
    setTimeout(() => {
      calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Ascend Solutions" className="h-8 w-8" />
            <span className="font-display font-bold text-lg text-foreground">
              Ascend Solutions
            </span>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        {/* SECTION 1: Qualification Form */}
        <section className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Book Your{" "}
                <span className="text-gradient-gold">Free Strategy Call</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">
                Please answer a few quick questions so we can better understand
                your business before the call.
              </p>
            </div>

            {formSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-sm text-emerald-300">
                  Great! Now pick a time below that works for you.
                </p>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit}
              className={`space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8 ${
                formSubmitted ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="John Smith"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="bg-secondary border-border"
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="bg-secondary border-border"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="bg-secondary border-border"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Acme Corp"
                  value={form.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <Label htmlFor="industry">What industry is your business in?</Label>
                <Input
                  id="industry"
                  placeholder="e.g. Real Estate, E-commerce, SaaS"
                  value={form.industry}
                  onChange={(e) => updateField("industry", e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>

              {/* Revenue */}
              <div className="space-y-2">
                <Label>What is your current monthly revenue?</Label>
                <Select
                  value={form.revenue}
                  onValueChange={(v) => updateField("revenue", v)}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-10k">Under $10k</SelectItem>
                    <SelectItem value="10k-30k">$10k to $30k</SelectItem>
                    <SelectItem value="30k-100k">$30k to $100k</SelectItem>
                    <SelectItem value="100k-plus">$100k+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ad Budget */}
              <div className="space-y-2">
                <Label>What is your monthly marketing budget for ads?</Label>
                <Select
                  value={form.adBudget}
                  onValueChange={(v) => updateField("adBudget", v)}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1k">Under $1k</SelectItem>
                    <SelectItem value="1k-3k">$1k to $3k</SelectItem>
                    <SelectItem value="3k-10k">$3k to $10k</SelectItem>
                    <SelectItem value="10k-plus">$10k+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Challenge */}
              <div className="space-y-2">
                <Label htmlFor="challenge">
                  What is your biggest challenge with marketing right now?
                </Label>
                <Textarea
                  id="challenge"
                  placeholder="Tell us briefly..."
                  value={form.challenge}
                  onChange={(e) => updateField("challenge", e.target.value)}
                  className="bg-secondary border-border min-h-[80px]"
                  maxLength={500}
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full text-lg py-7 rounded-xl"
              >
                Continue to Schedule
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </form>
          </motion.div>
        </section>

        {/* SECTION 2: Calendar */}
        <section ref={calendarRef} className="container mx-auto px-6 max-w-4xl mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: formSubmitted ? 1 : 0.3, y: 0 }}
            transition={{ duration: 0.5 }}
            className={!formSubmitted ? "pointer-events-none" : ""}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
                Schedule Your{" "}
                <span className="text-gradient-gold">Strategy Call</span>
              </h2>
              <p className="text-muted-foreground">
                Choose a time that works best for you.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <GHLCalendar />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default BookCall;
