import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Simple password protection - check query param
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  const ADMIN_KEY = Deno.env.get("ANALYTICS_ADMIN_KEY") || "ascend-admin-2024";

  if (key !== ADMIN_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const type = url.searchParams.get("type") || "funnel";
  const days = parseInt(url.searchParams.get("days") || "7");
  const since = new Date(Date.now() - days * 86400000).toISOString();

  try {
    if (type === "funnel") {
      // Get section view counts for drop-off analysis
      const { data, error } = await supabase
        .from("page_views")
        .select("section, session_id")
        .eq("page", "/")
        .not("section", "is", null)
        .gte("created_at", since);

      if (error) throw error;

      // Count unique sessions per section
      const sectionSessions: Record<string, Set<string>> = {};
      (data || []).forEach((row: any) => {
        if (!sectionSessions[row.section]) {
          sectionSessions[row.section] = new Set();
        }
        sectionSessions[row.section].add(row.session_id);
      });

      const funnel = Object.entries(sectionSessions).map(([section, sessions]) => ({
        section,
        visitors: sessions.size,
      }));

      // Sort by the expected page order
      const order = ["hero", "stats", "pain-points", "services", "how-it-works", "testimonials", "why-us", "faq", "footer"];
      funnel.sort((a, b) => order.indexOf(a.section) - order.indexOf(b.section));

      return new Response(JSON.stringify({ funnel }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (type === "heatmap") {
      // Get visitor counts grouped by hour and day of week
      const { data, error } = await supabase
        .from("page_views")
        .select("created_at")
        .is("section", null)
        .gte("created_at", since);

      if (error) throw error;

      // Build heatmap: day_of_week x hour
      const heatmap: Record<string, number> = {};
      (data || []).forEach((row: any) => {
        const d = new Date(row.created_at);
        const day = d.getUTCDay(); // 0=Sun
        const hour = d.getUTCHours();
        const key = `${day}-${hour}`;
        heatmap[key] = (heatmap[key] || 0) + 1;
      });

      // Convert to array
      const cells = [];
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
          cells.push({
            day,
            hour,
            count: heatmap[`${day}-${hour}`] || 0,
          });
        }
      }

      return new Response(JSON.stringify({ heatmap: cells }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Overview stats
    const { count: totalViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since);

    const { data: sessions } = await supabase
      .from("page_views")
      .select("session_id")
      .gte("created_at", since);

    const uniqueSessions = new Set((sessions || []).map((s: any) => s.session_id)).size;

    return new Response(
      JSON.stringify({ totalViews, uniqueSessions, days }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
