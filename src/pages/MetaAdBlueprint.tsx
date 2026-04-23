import { useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  Target,
  Layers,
  Wrench,
  Activity,
  Zap,
  Scale,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lock,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// -------- Data --------

const heroStats = [
  { value: "Varies", label: "Industry Avg CPL", sub: "By niche · benchmark below" },
  { value: "$25-50", label: "Target CPL", sub: "After Andromeda-era rebuild" },
  { value: "391%", label: "Speed-to-Lead Lift", sub: "Contact in <5 min vs 30 min" },
  { value: "60/30/10", label: "Creative Budget Split", sub: "Winners / Tests / Wild swings" },
  { value: "10-16", label: "Ads Per Month", sub: "Minimum to outpace fatigue" },
  { value: "<0.1%", label: "Hook Rate Floor", sub: "Below this, kill in 48 hrs" },
];

const cplBenchmarks = [
  { niche: "Concrete", industry: 165, target: 45 },
  { niche: "Roofing", industry: 220, target: 65 },
  { niche: "HVAC", industry: 145, target: 38 },
  { niche: "Pool Build", industry: 310, target: 95 },
  { niche: "IV Drip", industry: 85, target: 22 },
  { niche: "Med Spa", industry: 95, target: 28 },
  { niche: "Foundation", industry: 240, target: 70 },
  { niche: "Solar", industry: 195, target: 55 },
];

const fatigueCurve = [
  { day: 1, ctr: 2.4, cpm: 18 },
  { day: 3, ctr: 2.3, cpm: 19 },
  { day: 5, ctr: 2.1, cpm: 21 },
  { day: 7, ctr: 1.8, cpm: 24 },
  { day: 10, ctr: 1.4, cpm: 29 },
  { day: 14, ctr: 0.9, cpm: 36 },
  { day: 18, ctr: 0.6, cpm: 44 },
  { day: 21, ctr: 0.4, cpm: 52 },
];

const funnelSteps = [
  { label: "Ad Impression", value: 100000, pct: "100%" },
  { label: "Click to LP", value: 1800, pct: "1.8% CTR" },
  { label: "Form Start", value: 720, pct: "40% start rate" },
  { label: "Lead Captured", value: 432, pct: "60% completion" },
  { label: "SMS Reply (<5 min)", value: 238, pct: "55% reply" },
  { label: "Call Booked", value: 119, pct: "50% book" },
  { label: "Closed Job", value: 36, pct: "30% close" },
];

const killScale = [
  { metric: "CPL", green: "Below target", yellow: "1-2× target", kill: "2× target ($50+)" },
  { metric: "Hook Rate (3s view)", green: ">25%", yellow: "15-25%", kill: "<15%" },
  { metric: "CTR (Link)", green: ">1.5%", yellow: "0.8-1.5%", kill: "<0.8%" },
  { metric: "Frequency", green: "<2.5", yellow: "2.5-4", kill: ">4 (refresh creative)" },
  { metric: "ROAS / Lead-to-Close", green: ">3×", yellow: "1.5-3×", kill: "<1.5×" },
  { metric: "Spend at Decision", green: "$300+ for 3 days", yellow: "$150-300", kill: "Wait — under $150 = noise" },
];

const creativeCalendar = [
  { week: "Week 1", concept: "Driveway pop-out (UGC walk-around)", format: "Vertical 9:16 video", hook: "Pattern interrupt" },
  { week: "Week 1", concept: "Before/after stamped concrete", format: "Static carousel", hook: "Transformation" },
  { week: "Week 1", concept: "Owner on-camera testimonial", format: "9:16 video, 22 sec", hook: "Social proof" },
  { week: "Week 2", concept: "$X for $Y offer breakdown", format: "Static image + headline", hook: "Specificity" },
  { week: "Week 2", concept: "Top 3 mistakes homeowners make", format: "Voiceover slideshow", hook: "Educational" },
  { week: "Week 3", concept: "Time-lapse pour to finish", format: "Square video, 15 sec", hook: "Curiosity" },
  { week: "Week 3", concept: "Crew at job site, real audio", format: "9:16 raw cut", hook: "Authenticity" },
  { week: "Week 4", concept: "Customer FaceTime reaction", format: "9:16 UGC", hook: "Emotion" },
  { week: "Week 4", concept: "Side-by-side vs cheap competitor", format: "Static comparison", hook: "Contrast" },
  { week: "Week 4", concept: "Limited-slot booking angle", format: "Static + countdown copy", hook: "Scarcity (real)" },
];

const mistakes = [
  {
    title: "Boosting posts from the IG app",
    happens: "Facebook ships the cheapest impressions it can find. Engagement bots, not buyers.",
    instead: "Run from Ads Manager with a Leads or Sales objective. Always.",
  },
  {
    title: "One creative per ad set",
    happens: "Andromeda starves. The algo can't find a winner because it has nothing to compare.",
    instead: "Ship 4-6 creatives per ad set. Let the algo pick the survivor.",
  },
  {
    title: "Pixel only, no CAPI",
    happens: "iOS 14.5+ gutted browser tracking. You're optimizing on 60% of the data.",
    instead: "Install CAPI (GHL native, Zapier, or direct). Aim for 8.0+ EMQ score.",
  },
  {
    title: "$5/day budgets",
    happens: "You never exit learning phase. 50 conversions in 7 days is the bar.",
    instead: "Minimum $30-50/day per ad set in competitive niches. Concentrate spend.",
  },
  {
    title: "25-mile radius around your shop",
    happens: "Wide geos punish this. You're missing 60% of high-intent reach.",
    instead: "City-level targeting (Tampa, Orlando, Jax) or 50-mile radius from job site clusters.",
  },
  {
    title: "Sending ads to your homepage",
    happens: "Homepage = menu of options. Cold traffic needs one decision.",
    instead: "Dedicated landing page. One offer. One CTA. Multi-step form.",
  },
  {
    title: "No SMS in the lead flow",
    happens: "Leads cool in 5 minutes. By tomorrow your email is 7th in their inbox.",
    instead: "SMS auto-fires within 60 seconds. Speed-to-lead is a 391% conversion lever.",
  },
  {
    title: "Killing ads on day 2",
    happens: "Learning phase isn't done. You're killing winners as noise.",
    instead: "Wait until $150+ spend OR 3 days, whichever comes second. Then judge.",
  },
  {
    title: "No AEM 8-event configuration",
    happens: "iOS users can't be optimized against your real events.",
    instead: "Domain verified, 8 events ranked by value, top event = your money action.",
  },
  {
    title: "Looking at last-click attribution only",
    happens: "Meta is under-reporting by 20-40% post-iOS. You're killing winners.",
    instead: "Triangulate: Ads Manager + GA4 + CallRail + your CRM. Trust the blended view.",
  },
];

const caseStudy = {
  niche: "Stamped concrete contractor — Tampa MSA",
  monthlyBudget: "$3,000 ad spend",
  starting: "$185 CPL on $5/day boosted posts (his existing setup)",
  rebuilt: "1 campaign, 2 ad sets, 6 creatives, $50/day each",
  weeks: [
    { week: "Week 1", spend: "$700", leads: 14, cpl: "$50", note: "Learning phase. 1 hook breaking out (UGC time-lapse)." },
    { week: "Week 2", spend: "$700", leads: 22, cpl: "$32", note: "Killed 2 losers. Doubled spend on the time-lapse hook." },
    { week: "Week 3", spend: "$800", leads: 31, cpl: "$26", note: "Added 4 new creatives in the winning concept lane." },
    { week: "Week 4", spend: "$800", leads: 38, cpl: "$21", note: "CBO unlocked. Frequency ticked to 2.8 — refresh queued for Wk 5." },
  ],
  outcome: "From $185 CPL → $21 CPL in 4 weeks. 105 leads at avg $28.57. 22 booked estimates. 8 closed jobs averaging $11k.",
};

const heldBack = [
  {
    icon: Lock,
    title: "The exact account-structure template",
    body: "Naming conventions, ad-set segmentation rules, and the Andromeda-era CBO architecture we use to keep budgets compounding past $10k/mo without retraining the algo.",
  },
  {
    icon: Lock,
    title: "The 50-hook DSL we rotate monthly",
    body: "Our internal hook library — sorted by niche, awareness stage, and emotional driver — that fuels the 10-16 ads/month cadence without burning the team.",
  },
  {
    icon: Lock,
    title: "Our proprietary scaling math beyond $10k/mo",
    body: "The vertical scaling rules, lookalike laddering, and exclusion topology that lets a $10k/mo account climb to $40k/mo without the CPL doubling.",
  },
];

const faqs = [
  {
    question: "Why is this free?",
    answer: "Because the playbook isn't the bottleneck — execution is. Reading this won't make you better at it. It will make you better at hiring someone who is. If you'd rather just hand it off, that's what the call is for.",
  },
  {
    question: "I've tried Meta ads and they didn't work. What's different here?",
    answer: "If your last attempt was a boosted post, $5/day, sent to your homepage, with no CAPI and no SMS follow-up — you didn't run Meta ads. You ran a slot machine. The blueprint above is the actual ground game.",
  },
  {
    question: "How big does my budget need to be?",
    answer: "$1,500/mo ad spend minimum to exit learning phase reliably in most niches. $3,000/mo is where things actually compound. Below $1k you're paying for noise.",
  },
  {
    question: "How fast will I see results?",
    answer: "Leads inside 7-14 days when the build is right. Real CPL clarity by day 21-28. Anyone promising day-1 results is selling you something they can't deliver.",
  },
  {
    question: "Do you guarantee leads?",
    answer: "We guarantee the system gets built right and the cadence gets held. We don't guarantee outcomes, because anyone who does is lying or about to be sued. We do show you exactly how we'd diagnose and fix yours on the call.",
  },
  {
    question: "What if I want to keep my current setup and just have you optimize?",
    answer: "Usually a no. 90% of underperforming accounts have foundational tracking + structure problems that no amount of optimization will fix. We rebuild then run.",
  },
];

// -------- Reusable bits --------

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-xs uppercase tracking-[0.18em] font-semibold text-gold mb-4">
    {children}
  </span>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-[1.15] mb-5">
    {children}
  </h2>
);

const SectionLead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{children}</p>
);

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// -------- Pillar Section --------

const pillars = [
  {
    n: "01",
    icon: Target,
    title: "The Andromeda-Era Account Structure",
    lede: "Meta's algorithm changed in 2024. Most agencies are still running 2021 playbooks. Here's the one that actually fits the new system.",
    body: [
      "The old way: 30 ad sets, narrow interest stacks, manual bid caps, dayparting. The algo learned nothing because every signal was fragmented.",
      "The Andromeda-era way: 1 campaign, 2-3 ad sets max, broad targeting (or Advantage+ Audience), 4-6 creatives per ad set. Let the model do what it's built to do — find buyers across signals you can't see.",
      "Net effect on real client accounts: 40-65% drop in CPL inside 30 days, every time we rebuild this layer.",
    ],
    visual: "structure",
  },
  {
    n: "02",
    icon: Layers,
    title: "Offer Architecture",
    lede: "The ad isn't the offer. The offer is the offer. If yours is 'free quote,' you're competing with everyone else in the city saying 'free quote.'",
    body: [
      "Tier 1 — Tripwire: Free estimate, but specific. 'Free same-week stamped concrete estimate (slots are limited because we only book 4 estimates per Saturday).'",
      "Tier 2 — IV-drip add-ons: Pre-pour 3D rendering ($189). Color-match concierge ($249). Saturday/Sunday install premium ($449). These move blended margin without raising the headline price.",
      "Tier 3 — Decoy + premium: Three-tier package menu where the middle option is engineered to look obvious. Anchoring + reduced choice paralysis = higher AOV.",
      "Risk reversal: 'If our estimator can't beat your last quote on either price or scope, I'll PayPal you $50 for the 30 minutes.' Conversion lift on this single line: measurable in every single account.",
    ],
    visual: "offer",
  },
  {
    n: "03",
    icon: Wrench,
    title: "The Creative System",
    lede: "Creative is now 80% of performance. Targeting is mostly the algo's job. So your job is volume + variance.",
    body: [
      "Cadence: 10-16 new creatives per month, minimum. Below that, you're outrun by fatigue every cycle.",
      "Budget split: 60% on proven winners. 30% on tests in adjacent concepts. 10% on wild swings (different format, different angle, different person on camera).",
      "Hook discipline: First 3 seconds decides everything. If hook rate (3s view rate) is under 15%, the ad is dead — kill it inside 48 hours regardless of CPL.",
      "Format mix per month: 50% UGC vertical video (iPhone, raw, 18-25 sec). 30% static image w/ bold headline. 20% testimonial / case-study cuts.",
    ],
    visual: "creative",
  },
  {
    n: "04",
    icon: Activity,
    title: "Tracking Stack",
    lede: "If your data is wrong, every decision after it is wrong. This is the layer most agencies hand-wave.",
    body: [
      "Pixel: Installed correctly, fires on the 6 events that matter (PageView, Lead, ViewContent, InitiateCheckout, Schedule, Purchase).",
      "CAPI: Server-side. Either GHL native, Zapier, or direct CAPI gateway. Aim for an EMQ (Event Match Quality) score of 8.0+ on Lead.",
      "AEM 8-event config: Domain verified in Business Manager. 8 events ranked by value. Your money event sits at #1. Locked.",
      "CallRail: For phone leads. Tracks the source down to the keyword/ad. In two-party-consent states (FL, CA, PA, etc.), recording disclosure is required and pre-built into CallRail's flow.",
      "Blended attribution: Triangulate Ads Manager + GA4 + CallRail + your CRM. Last-click is fiction post-iOS. Stop trusting it alone.",
    ],
    visual: "tracking",
  },
  {
    n: "05",
    icon: Zap,
    title: "Funnel Mechanics",
    lede: "The ad's job is to get the click. The funnel's job is to convert. Most accounts are leaking 50% of leads here without knowing it.",
    body: [
      "Multi-step form: Single-page forms with 5+ fields convert at 6-9%. Multi-step with the same fields convert at 14-22%. Endowed-progress bias is real.",
      "Speed-to-lead: Reach the lead in under 5 minutes and you contact-rate jumps 391% (MIT InsideSales). After 30 minutes, you've lost over half of them.",
      "SMS auto-fire: Within 60 seconds of form submission. 'Hey {{first_name}}, this is Mike from {{company}} — I just got your request for a stamped concrete estimate. You free for a quick 4-min call to lock in your slot?' Personalized. Casual. Not a robot.",
      "Two-shot booking: SMS first. If no reply in 8 minutes, call. If no answer, voicemail + second SMS at the 1-hour mark. Then: 24h, 72h, day-7. Most agencies stop at touch 1.",
    ],
    visual: "funnel",
  },
  {
    n: "06",
    icon: Scale,
    title: "Kill / Scale Math",
    lede: "Indecision is more expensive than wrong decisions. Build the rules before launch, then follow them without ego.",
    body: [
      "Kill rule: 2× target CPL OR hook rate <15% → kill within 48 hours. No exceptions.",
      "Hold rule: Within 1.5× target CPL → leave it alone. Don't tinker. Algo is still learning.",
      "Scale rule: Below target CPL for 5 days running → 20% budget increase. Wait 72 hours. If CPL holds, +20% again. Never more than 20% in 72 hours or you re-trigger learning phase.",
      "Frequency cap: At >4, refresh creative. The audience isn't burnt; the message is.",
      "Vertical scale ceiling: Around $250/day per ad set, broad targeting starts to break. That's where account-structure expansion and lookalike laddering kick in (and that's the layer we don't publish).",
    ],
    visual: "killscale",
  },
  {
    n: "07",
    icon: RotateCw,
    title: "The Compound Loop",
    lede: "Months 1-3 are setup. Months 4-12 are where the money compounds. Most agencies churn before this kicks in.",
    body: [
      "Monthly QBR: 30-min Loom + 30-min live. Last month's lead volume, CPL trend, lead-to-close, what we killed, what we scaled, what's queued for next month.",
      "R/Y/G health model: Red = intervention this week. Yellow = watch. Green = scale. Every account scored every Friday.",
      "Retention triggers: Day 40 surprise (handwritten card or competitive intel). Month 3 personal win-recap video. Month 6 referral ask. Month 12 lifetime-value review.",
      "Compounding effect: Account at month 12 is averaging 38% lower CPL than month 1, because the pixel has fed on 12 months of qualified events and the creative library is deep enough to outpace fatigue indefinitely.",
    ],
    visual: "loop",
  },
];

// -------- Page --------

const MetaAdBlueprint = () => {
  useEffect(() => {
    document.title = "The Meta Ad Blueprint — Ascend Solutions";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MouseGlow />
      <Navbar minimal />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>The Free Blueprint — Updated for the Andromeda-era Algorithm</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black leading-[1.05] mb-6">
              The Meta Ad Blueprint We Use to Take Service Businesses From{" "}
              <span className="text-gradient-gold">$165 CPLs to $25</span> in 30 Days.
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Built for any business owner running Meta ads with bad ROI — or thinking about starting and
              refusing to set fire to $3,000 figuring it out. Read the whole thing. We hold nothing back
              except the templates we deploy in client accounts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="hero" size="lg" className="text-lg font-bold px-10 py-7 rounded-xl" asChild>
                <Link to="/book">
                  Book a Free Audit Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg font-semibold px-10 py-7 rounded-xl border-gold/30 hover:bg-gold/5"
                asChild
              >
                <a href="#blueprint">
                  Read the Blueprint
                  <ArrowDown className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              Built from real campaigns across concrete, roofing, HVAC, pool, IV-drip, med-spa, and other service-business accounts.
            </div>
          </motion.div>
        </div>
      </section>

      {/* BIG STAT ROW */}
      <section className="py-16 border-y border-border bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {heroStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="text-center lg:text-left">
                  <div className="text-3xl sm:text-4xl font-display font-black text-gradient-gold mb-2">
                    {s.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* THE 7 PILLARS */}
      <section id="blueprint" className="py-24">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <SectionLabel>The 7-Pillar Blueprint</SectionLabel>
              <SectionHeading>
                Seven layers. Get them all right or none of them matter.
              </SectionHeading>
              <p className="text-lg text-muted-foreground leading-relaxed">
                There are no individual hacks here. Each pillar compounds the next. Skip one and the rest
                leak. This is the entire ground game.
              </p>
            </div>
          </Reveal>

          <div className="space-y-20 max-w-6xl mx-auto">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.n}>
                  <div className="grid lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-4 mb-5">
                        <span className="text-5xl font-display font-black text-gold/30">{p.n}</span>
                        <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-gold" />
                        </div>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{p.lede}</p>
                    </div>
                    <div className="lg:col-span-7">
                      <div className="rounded-2xl border border-border bg-card p-7 shadow-lg space-y-4">
                        {p.body.map((line, j) => (
                          <div key={j} className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                            <p className="text-foreground leading-relaxed">{line}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CPL BENCHMARKS — TABLE + CHART */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <SectionLabel>CPL Benchmarks (Vary By Niche)</SectionLabel>
              <SectionHeading>
                What you should be paying per lead — by niche.
              </SectionHeading>
              <SectionLead>
                CPL varies by niche, market, season, and offer — these are blended ranges from real
                accounts. Industry average is what most agencies normalize. Target is what's possible
                when the seven pillars are running. Treat them as goalposts, not guarantees.
              </SectionLead>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <Reveal>
              <div className="rounded-2xl border border-border bg-background p-6 shadow-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Niche</TableHead>
                      <TableHead className="text-right">Industry Avg</TableHead>
                      <TableHead className="text-right">Target CPL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cplBenchmarks.map((row) => (
                      <TableRow key={row.niche}>
                        <TableCell className="font-semibold">{row.niche}</TableCell>
                        <TableCell className="text-right text-muted-foreground">${row.industry}</TableCell>
                        <TableCell className="text-right font-bold text-gold">${row.target}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-background p-6 shadow-lg h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cplBenchmarks} margin={{ top: 16, right: 8, bottom: 8, left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="niche" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="industry" name="Industry Avg" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" name="Target (Ours)" fill="hsl(var(--gold))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AD FATIGUE CURVE */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <SectionLabel>The Fatigue Curve</SectionLabel>
              <SectionHeading>Every Meta ad dies. The question is how soon.</SectionHeading>
              <SectionLead>
                Real account data, blended across home-service campaigns: by day 14 your CTR has halved
                and your CPM has doubled. The 60-30-10 cadence exists because of this curve.
              </SectionLead>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-5xl mx-auto rounded-2xl border border-border bg-card p-6 shadow-lg h-[440px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fatigueCurve} margin={{ top: 16, right: 24, bottom: 8, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} label={{ value: "Days running", position: "insideBottom", offset: -4, fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis yAxisId="left" stroke="hsl(var(--gold))" fontSize={12} label={{ value: "CTR %", angle: -90, position: "insideLeft", fill: "hsl(var(--gold))", fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} label={{ value: "CPM $", angle: 90, position: "insideRight", fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line yAxisId="left" type="monotone" dataKey="ctr" name="CTR (link)" stroke="hsl(var(--gold))" strokeWidth={3} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="cpm" name="CPM" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FUNNEL DIAGRAM */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <SectionLabel>The Funnel — Real Math</SectionLabel>
              <SectionHeading>What 100,000 impressions actually turns into.</SectionHeading>
              <SectionLead>
                Blended numbers from healthy accounts running the full blueprint. Notice where the leak is —
                and why each step is non-negotiable.
              </SectionLead>
            </div>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl mx-auto space-y-5">
              {funnelSteps.map((step, i) => {
                // Index-based taper so each step is visibly narrower (raw values clamp to ~0).
                // Step 1 = 100%, last step ~ 38%. Min width keeps content legible on mobile.
                const taper = 100 - i * ((100 - 38) / (funnelSteps.length - 1));
                const widthPct = Math.max(38, taper);
                return (
                  <div key={step.label} className="relative">
                    <div
                      className="rounded-xl border border-gold/20 bg-gradient-to-r from-gold/15 to-gold/5 p-5 shadow-md mx-auto transition-all hover:scale-[1.01]"
                      style={{ width: `${widthPct}%` }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs sm:text-sm uppercase tracking-wider text-gold font-semibold">
                            Step {i + 1}
                          </div>
                          <div className="font-display font-bold text-foreground text-sm sm:text-lg leading-tight">
                            {step.label}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-lg sm:text-2xl font-display font-black text-foreground leading-none">
                            {step.value.toLocaleString()}
                          </div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{step.pct}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* KILL / SCALE MATRIX */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <SectionLabel>Kill / Scale Decisions</SectionLabel>
              <SectionHeading>The matrix we judge every ad against — every Friday.</SectionHeading>
              <SectionLead>
                If you can't tell yourself in 30 seconds whether to kill, hold, or scale an ad, you don't
                have rules. You have hope. Hope is expensive.
              </SectionLead>
            </div>
          </Reveal>

          <Reveal>
            <div className="max-w-5xl mx-auto rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-emerald-500">Green (Scale)</TableHead>
                    <TableHead className="text-amber-400">Yellow (Hold)</TableHead>
                    <TableHead className="text-rose-500">Kill</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {killScale.map((row) => (
                    <TableRow key={row.metric}>
                      <TableCell className="font-semibold">{row.metric}</TableCell>
                      <TableCell className="text-emerald-400">{row.green}</TableCell>
                      <TableCell className="text-amber-300">{row.yellow}</TableCell>
                      <TableCell className="text-rose-400">{row.kill}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CREATIVE CALENDAR */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <SectionLabel>Sample Monthly Creative Calendar</SectionLabel>
              <SectionHeading>What a real 10-concept month actually looks like.</SectionHeading>
              <SectionLead>
                One concrete contractor. Four weeks. Ten concepts. Mix of UGC, static, and testimonial
                across hook archetypes. This is the cadence that holds.
              </SectionLead>
            </div>
          </Reveal>

          <Reveal>
            <div className="max-w-5xl mx-auto rounded-2xl border border-border bg-background overflow-hidden shadow-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Week</TableHead>
                    <TableHead>Concept</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Hook Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {creativeCalendar.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-gold font-semibold">{row.week}</TableCell>
                      <TableCell>{row.concept}</TableCell>
                      <TableCell className="text-muted-foreground">{row.format}</TableCell>
                      <TableCell className="text-muted-foreground">{row.hook}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <SectionLabel>Real Campaign Anatomy</SectionLabel>
              <SectionHeading>$185 CPL → $21 CPL in 28 days.</SectionHeading>
              <SectionLead>
                One stamped-concrete contractor in the Tampa MSA. Anonymized. The full 4-week walk.
              </SectionLead>
            </div>
          </Reveal>

          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-8 shadow-lg mb-6">
                <div className="grid sm:grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Niche</div>
                    <div className="font-semibold">{caseStudy.niche}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Budget</div>
                    <div className="font-semibold">{caseStudy.monthlyBudget}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Starting State</div>
                    <div className="font-semibold">{caseStudy.starting}</div>
                  </div>
                </div>
                <div className="border-t border-border pt-5">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Rebuild</div>
                  <div className="text-foreground">{caseStudy.rebuilt}</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Week</TableHead>
                      <TableHead className="text-right">Spend</TableHead>
                      <TableHead className="text-right">Leads</TableHead>
                      <TableHead className="text-right">CPL</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {caseStudy.weeks.map((w) => (
                      <TableRow key={w.week}>
                        <TableCell className="font-semibold text-gold">{w.week}</TableCell>
                        <TableCell className="text-right">{w.spend}</TableCell>
                        <TableCell className="text-right">{w.leads}</TableCell>
                        <TableCell className="text-right font-bold">{w.cpl}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{w.note}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6 shadow-lg">
                <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">Outcome</div>
                <p className="text-lg font-semibold text-foreground leading-relaxed">{caseStudy.outcome}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <SectionLabel>Mistakes That Kill 90% of Meta Ad Budgets</SectionLabel>
              <SectionHeading>If you're doing any of these, stop today.</SectionHeading>
              <SectionLead>
                None of these are theoretical. We've seen every one of them inside the first audit of
                accounts that came to us bleeding.
              </SectionLead>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {mistakes.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.04}>
                <div className="rounded-2xl border border-border bg-background p-6 shadow-md h-full hover:border-gold/30 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-5 h-5 text-rose-500" />
                    </div>
                    <h3 className="font-display font-bold text-lg leading-tight">{m.title}</h3>
                  </div>
                  <div className="space-y-2 pl-14">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold">What happens: </span>
                      <span className="text-muted-foreground text-sm">{m.happens}</span>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Do this instead: </span>
                      <span className="text-foreground text-sm">{m.instead}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HELD BACK */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <SectionLabel>What's Not in This Guide</SectionLabel>
              <SectionHeading>The 20% we keep behind the door.</SectionHeading>
              <SectionLead>
                Everything above is the playbook. What's below is the proprietary execution layer — the
                pieces that turn a working account into a compounding one. Deployed in client accounts
                only.
              </SectionLead>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {heldBack.map((h, i) => {
              const Icon = h.icon;
              return (
                <Reveal key={h.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/5 to-transparent p-7 shadow-lg h-full">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3 leading-tight">{h.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-5 text-sm">{h.body}</p>
                    <div className="text-sm text-gold font-semibold border-t border-gold/20 pt-4">
                      Deployed in your account when we run your media buying.
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <div className="text-center mb-14">
              <SectionLabel>FAQ</SectionLabel>
              <SectionHeading>The questions we get every audit call.</SectionHeading>
            </div>
          </Reveal>
          <Reveal>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-border rounded-xl px-6 bg-background"
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
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center rounded-3xl border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent p-10 sm:p-16 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm mb-8">
                <AlertTriangle className="w-4 h-4" />
                <span>3 audit slots open this week</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black leading-[1.1] mb-6">
                Book a free audit. I'll review your Meta ads and give you the{" "}
                <span className="text-gradient-gold">3 things to fix this week</span>.
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                30 minutes, free, no pitch unless you ask for one. You'll leave with a written diagnosis of
                where your account is leaking and what we'd do about it. Whether you hire us or not.
              </p>
              <Button variant="hero" size="lg" className="text-lg font-bold px-12 py-8 rounded-xl" asChild>
                <Link to="/book">
                  Book My Free Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <div className="mt-6 text-sm text-muted-foreground">
                Operators spending $1,500/mo+ on Meta — or seriously planning to.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MetaAdBlueprint;
