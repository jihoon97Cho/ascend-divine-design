import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Users, Eye, TrendingDown } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  stats: "Stats",
  "pain-points": "Pain Points",
  services: "Services",
  "how-it-works": "How It Works",
  testimonials: "Testimonials",
  "why-us": "Why Us",
  faq: "FAQ",
  footer: "Footer",
};

type FunnelItem = { section: string; visitors: number };
type HeatmapCell = { day: number; hour: number; count: number };

const Admin = () => {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [funnel, setFunnel] = useState<FunnelItem[]>([]);
  const [heatmap, setHeatmap] = useState<HeatmapCell[]>([]);
  const [stats, setStats] = useState<{ totalViews: number; uniqueSessions: number } | null>(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const base = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics`;
    const params = `key=${encodeURIComponent(key)}&days=${days}`;

    try {
      const [funnelRes, heatmapRes, statsRes] = await Promise.all([
        fetch(`${base}?${params}&type=funnel`),
        fetch(`${base}?${params}&type=heatmap`),
        fetch(`${base}?${params}&type=overview`),
      ]);

      if (!funnelRes.ok) throw new Error("Unauthorized");

      const [funnelData, heatmapData, statsData] = await Promise.all([
        funnelRes.json(),
        heatmapRes.json(),
        statsRes.json(),
      ]);

      setFunnel(funnelData.funnel || []);
      setHeatmap(heatmapData.heatmap || []);
      setStats(statsData);
      setAuthed(true);
    } catch {
      setAuthed(false);
      alert("Invalid admin key");
    } finally {
      setLoading(false);
    }
  }, [key, days]);

  const maxHeat = Math.max(...heatmap.map((c) => c.count), 1);

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-gold" />
            <h1 className="text-2xl font-display font-bold">Admin Analytics</h1>
          </div>
          <p className="text-muted-foreground text-sm">Enter your admin key to access analytics.</p>
          <Input
            type="password"
            placeholder="Admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchData()}
          />
          <Button onClick={fetchData} disabled={loading} className="w-full">
            {loading ? "Loading..." : "Access Dashboard"}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold">Analytics Dashboard</h1>
          <div className="flex items-center gap-3">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="bg-card border border-border rounded-lg px-3 py-2 text-sm"
            >
              <option value={1}>Last 24h</option>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <Button onClick={fetchData} size="sm" variant="outline">
              Refresh
            </Button>
          </div>
        </div>

        {/* Stat cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Page Views</p>
                <p className="text-2xl font-display font-bold">{stats.totalViews?.toLocaleString()}</p>
              </div>
            </Card>
            <Card className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unique Visitors</p>
                <p className="text-2xl font-display font-bold">{stats.uniqueSessions?.toLocaleString()}</p>
              </div>
            </Card>
            <Card className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Drop-off</p>
                <p className="text-2xl font-display font-bold">
                  {funnel.length >= 2
                    ? `${Math.round(((funnel[0].visitors - funnel[funnel.length - 1].visitors) / Math.max(funnel[0].visitors, 1)) * 100)}%`
                    : "—"}
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Funnel */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-display font-bold mb-4">Section Drop-off Funnel</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Shows how many unique visitors reached each section of the homepage.
          </p>
          {funnel.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={funnel.map((f) => ({ ...f, label: SECTION_LABELS[f.section] || f.section }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="visitors" fill="hsl(43 52% 54%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">No data yet. Visitors will be tracked automatically.</p>
          )}
        </Card>

        {/* Heatmap */}
        <Card className="p-6">
          <h2 className="text-xl font-display font-bold mb-4">Visitor Heatmap</h2>
          <p className="text-sm text-muted-foreground mb-6">
            When visitors arrive — by day of week and hour (UTC).
          </p>
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Hour labels */}
              <div className="flex ml-12 mb-1">
                {Array.from({ length: 24 }, (_, h) => (
                  <div key={h} className="flex-1 text-center text-[10px] text-muted-foreground">
                    {h % 3 === 0 ? `${h}:00` : ""}
                  </div>
                ))}
              </div>
              {/* Rows */}
              {DAYS.map((dayLabel, dayIdx) => (
                <div key={dayIdx} className="flex items-center gap-1 mb-1">
                  <div className="w-10 text-xs text-muted-foreground text-right pr-2">{dayLabel}</div>
                  {Array.from({ length: 24 }, (_, h) => {
                    const cell = heatmap.find((c) => c.day === dayIdx && c.hour === h);
                    const count = cell?.count || 0;
                    const intensity = count / maxHeat;
                    return (
                      <div
                        key={h}
                        className="flex-1 aspect-square rounded-sm transition-colors"
                        style={{
                          backgroundColor:
                            count === 0
                              ? "hsl(var(--muted) / 0.3)"
                              : `hsl(43 52% 54% / ${0.15 + intensity * 0.85})`,
                        }}
                        title={`${dayLabel} ${h}:00 — ${count} visits`}
                      />
                    );
                  })}
                </div>
              ))}
              {/* Legend */}
              <div className="flex items-center gap-2 mt-4 ml-12">
                <span className="text-xs text-muted-foreground">Less</span>
                {[0.15, 0.35, 0.55, 0.75, 1].map((opacity, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: `hsl(43 52% 54% / ${opacity})` }}
                  />
                ))}
                <span className="text-xs text-muted-foreground">More</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
