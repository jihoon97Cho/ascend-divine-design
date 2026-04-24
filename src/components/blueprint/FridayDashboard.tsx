import { useEffect, useRef } from "react";
import rough from "roughjs/bundled/rough.esm";

// Hand-drawn Excalidraw-style "Friday review" dashboard.
// All sketchy drawing is done with roughjs into inline SVGs sized via viewBox.
// Whiteboard-only colors live inline on this file. We do NOT pollute the global theme.

const HAND_FONT = `'Kalam', 'Caveat', 'Comic Sans MS', cursive`;
const INK = "#1f1f1f";
const INK_SOFT = "#3a3a3a";
const RED = "#d94545";
const PAPER = "#FAF8F2";

// Helper — clear and re-render rough drawings into an SVG element via ref.
const useRough = (
  ref: React.RefObject<SVGSVGElement>,
  draw: (rs: ReturnType<typeof rough.svg>, svg: SVGSVGElement) => void,
  deps: unknown[] = []
) => {
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    // Clear previous
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const rs = rough.svg(svg);
    draw(rs, svg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

// ---------- Tile shell (sketchy border + hand-drawn title) ----------

const TileShell = ({
  title,
  children,
  ariaLabel,
}: {
  title: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) => {
  const borderRef = useRef<SVGSVGElement>(null);
  useRough(borderRef, (rs, svg) => {
    const w = 400;
    const h = 280;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");
    const rect = rs.rectangle(6, 6, w - 12, h - 12, {
      stroke: INK,
      strokeWidth: 2,
      roughness: 2,
      bowing: 1.5,
      fill: "rgba(255,255,255,0.4)",
      fillStyle: "solid",
    });
    svg.appendChild(rect);
  });

  return (
    <div
      className="relative p-5 sm:p-6"
      role="figure"
      aria-label={ariaLabel || title}
      style={{ minHeight: 320 }}
    >
      <svg
        ref={borderRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <h3
          className="mb-3 text-2xl"
          style={{ fontFamily: HAND_FONT, color: INK, fontWeight: 700 }}
        >
          {title}
        </h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

// ---------- Tile 1: CPL trend line chart ----------

const Tile1_CPLTrend = () => {
  const ref = useRef<SVGSVGElement>(null);
  useRough(ref, (rs, svg) => {
    const W = 360;
    const H = 200;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    // Axes
    svg.appendChild(rs.line(40, 20, 40, 160, { stroke: INK, strokeWidth: 1.5, roughness: 1.5 }));
    svg.appendChild(rs.line(40, 160, 340, 160, { stroke: INK, strokeWidth: 1.5, roughness: 1.5 }));

    // Y-axis ticks ($0 / $100 / $200)
    const ys = [
      { y: 160, label: "$0" },
      { y: 90, label: "$100" },
      { y: 20, label: "$200" },
    ];
    ys.forEach((t) => {
      svg.appendChild(rs.line(35, t.y, 45, t.y, { stroke: INK, strokeWidth: 1, roughness: 1 }));
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", "8");
      txt.setAttribute("y", String(t.y + 4));
      txt.setAttribute("font-family", HAND_FONT);
      txt.setAttribute("font-size", "12");
      txt.setAttribute("fill", INK_SOFT);
      txt.textContent = t.label;
      svg.appendChild(txt);
    });

    // X-axis labels
    const weeks = ["Wk1", "Wk2", "Wk3", "Wk4"];
    const xs = [80, 160, 240, 320];
    weeks.forEach((w, i) => {
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", String(xs[i] - 12));
      txt.setAttribute("y", "180");
      txt.setAttribute("font-family", HAND_FONT);
      txt.setAttribute("font-size", "13");
      txt.setAttribute("fill", INK_SOFT);
      txt.textContent = w;
      svg.appendChild(txt);
    });

    // Data points: $185 -> $140 -> $115 -> $100 (mapping $0=160, $200=20)
    const map = (v: number) => 160 - (v / 200) * 140;
    const pts: [number, number][] = [
      [xs[0], map(185)],
      [xs[1], map(140)],
      [xs[2], map(115)],
      [xs[3], map(100)],
    ];
    // Sketchy line connecting points
    for (let i = 0; i < pts.length - 1; i++) {
      svg.appendChild(
        rs.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], {
          stroke: INK,
          strokeWidth: 2.5,
          roughness: 1.6,
        })
      );
    }
    // Dots
    pts.forEach(([x, y]) => {
      svg.appendChild(
        rs.circle(x, y, 8, {
          stroke: INK,
          strokeWidth: 1.5,
          fill: INK,
          fillStyle: "solid",
          roughness: 1.2,
        })
      );
    });

    // Red circle around final point
    const last = pts[pts.length - 1];
    svg.appendChild(
      rs.circle(last[0], last[1], 32, {
        stroke: RED,
        strokeWidth: 2.5,
        roughness: 2.2,
      })
    );

    // Arrow from circle to text
    svg.appendChild(
      rs.line(last[0] + 18, last[1] - 14, last[0] - 18, last[1] - 38, {
        stroke: RED,
        strokeWidth: 1.8,
        roughness: 1.5,
      })
    );
    // Arrowhead lines
    svg.appendChild(
      rs.line(last[0] + 18, last[1] - 14, last[0] + 10, last[1] - 14, {
        stroke: RED,
        strokeWidth: 1.8,
        roughness: 1,
      })
    );
    svg.appendChild(
      rs.line(last[0] + 18, last[1] - 14, last[0] + 18, last[1] - 6, {
        stroke: RED,
        strokeWidth: 1.8,
        roughness: 1,
      })
    );

    // "down 46%" label
    const note = document.createElementNS("http://www.w3.org/2000/svg", "text");
    note.setAttribute("x", String(last[0] - 90));
    note.setAttribute("y", String(last[1] - 42));
    note.setAttribute("font-family", HAND_FONT);
    note.setAttribute("font-size", "16");
    note.setAttribute("fill", RED);
    note.setAttribute("font-weight", "700");
    note.textContent = "down 46%!";
    svg.appendChild(note);
  });

  return (
    <TileShell title="CPL Trend — last 4 wks" ariaLabel="CPL trend chart showing decrease from $185 to $100 over 4 weeks">
      <svg ref={ref} className="w-full h-[200px]" aria-hidden="true" />
    </TileShell>
  );
};

// ---------- Tile 2: Hook rate top 3 (horizontal bars) ----------

const Tile2_HookRate = () => {
  const ref = useRef<SVGSVGElement>(null);
  useRough(ref, (rs, svg) => {
    const W = 360;
    const H = 200;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    const bars = [
      { label: "Time-lapse pour", pct: 31, color: INK },
      { label: "Before-after driveway", pct: 24, color: INK },
      { label: "Owner direct-to-camera", pct: 19, color: INK },
    ];

    const maxPct = 35;
    const barH = 22;
    const startY = 30;
    const gap = 50;
    const labelX = 8;
    const barX = 0;
    const barWidthMax = 240;

    bars.forEach((b, i) => {
      const y = startY + i * gap;
      // Label above bar
      const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      lbl.setAttribute("x", String(labelX));
      lbl.setAttribute("y", String(y - 4));
      lbl.setAttribute("font-family", HAND_FONT);
      lbl.setAttribute("font-size", "13");
      lbl.setAttribute("fill", INK);
      lbl.textContent = b.label;
      svg.appendChild(lbl);

      const w = (b.pct / maxPct) * barWidthMax;
      svg.appendChild(
        rs.rectangle(barX, y, w, barH, {
          stroke: INK,
          strokeWidth: 1.8,
          roughness: 1.8,
          fill: i === 0 ? INK : "transparent",
          fillStyle: i === 0 ? "solid" : "hachure",
          hachureGap: 4,
        })
      );

      // pct label
      const pct = document.createElementNS("http://www.w3.org/2000/svg", "text");
      pct.setAttribute("x", String(barX + w + 8));
      pct.setAttribute("y", String(y + barH - 6));
      pct.setAttribute("font-family", HAND_FONT);
      pct.setAttribute("font-size", "14");
      pct.setAttribute("font-weight", "700");
      pct.setAttribute("fill", INK);
      pct.textContent = `${b.pct}%`;
      svg.appendChild(pct);
    });

    // Circle around first bar's pct + scale annotation
    svg.appendChild(
      rs.circle(barWidthMax + 28, startY + barH - 10, 30, {
        stroke: RED,
        strokeWidth: 2,
        roughness: 2,
      })
    );
    const scale = document.createElementNS("http://www.w3.org/2000/svg", "text");
    scale.setAttribute("x", String(barWidthMax - 60));
    scale.setAttribute("y", "12");
    scale.setAttribute("font-family", HAND_FONT);
    scale.setAttribute("font-size", "14");
    scale.setAttribute("fill", RED);
    scale.setAttribute("font-weight", "700");
    scale.textContent = "↑ scale";
    svg.appendChild(scale);
  });

  return (
    <TileShell title="Hook Rate — Top 3" ariaLabel="Top 3 hook rates: time-lapse pour 31%, before-after 24%, owner direct 19%">
      <svg ref={ref} className="w-full h-[200px]" aria-hidden="true" />
    </TileShell>
  );
};

// ---------- Tile 3: Kill list ----------

const Tile3_KillList = () => {
  const ref = useRef<SVGSVGElement>(null);
  useRough(ref, (rs, svg) => {
    const W = 360;
    const H = 220;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    // Header double underline
    svg.appendChild(rs.line(0, 22, 200, 22, { stroke: INK, strokeWidth: 1.5, roughness: 1.5 }));
    svg.appendChild(rs.line(0, 27, 200, 27, { stroke: INK, strokeWidth: 1, roughness: 1.8 }));

    const header = document.createElementNS("http://www.w3.org/2000/svg", "text");
    header.setAttribute("x", "0");
    header.setAttribute("y", "16");
    header.setAttribute("font-family", HAND_FONT);
    header.setAttribute("font-size", "16");
    header.setAttribute("font-weight", "700");
    header.setAttribute("fill", INK);
    header.textContent = "This week's KILL list";
    svg.appendChild(header);

    const rows = [
      { name: "Generic stock photo", note: "$185 CPL" },
      { name: "Boosted post variant", note: "freq 4.2" },
      { name: "Discount headline", note: "hook rate 8%" },
    ];

    rows.forEach((r, i) => {
      const y = 60 + i * 48;
      const name = document.createElementNS("http://www.w3.org/2000/svg", "text");
      name.setAttribute("x", "10");
      name.setAttribute("y", String(y));
      name.setAttribute("font-family", HAND_FONT);
      name.setAttribute("font-size", "15");
      name.setAttribute("fill", INK);
      name.textContent = r.name;
      svg.appendChild(name);

      const note = document.createElementNS("http://www.w3.org/2000/svg", "text");
      note.setAttribute("x", "10");
      note.setAttribute("y", String(y + 16));
      note.setAttribute("font-family", HAND_FONT);
      note.setAttribute("font-size", "12");
      note.setAttribute("fill", INK_SOFT);
      note.textContent = r.note;
      svg.appendChild(note);

      // Sketchy X across the row
      svg.appendChild(
        rs.line(4, y - 14, 340, y + 20, { stroke: RED, strokeWidth: 2, roughness: 2 })
      );
      svg.appendChild(
        rs.line(340, y - 14, 4, y + 20, { stroke: RED, strokeWidth: 2, roughness: 2 })
      );
    });
  });

  return (
    <TileShell title="Kill List" ariaLabel="This week's kill list: generic stock photo, boosted post variant, discount headline">
      <svg ref={ref} className="w-full h-[220px]" aria-hidden="true" />
    </TileShell>
  );
};

// ---------- Tile 4: Scale list ----------

const Tile4_ScaleList = () => {
  const ref = useRef<SVGSVGElement>(null);
  useRough(ref, (rs, svg) => {
    const W = 360;
    const H = 200;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    // Header underline + star
    svg.appendChild(rs.line(0, 22, 180, 22, { stroke: INK, strokeWidth: 1.5, roughness: 1.5 }));
    const header = document.createElementNS("http://www.w3.org/2000/svg", "text");
    header.setAttribute("x", "0");
    header.setAttribute("y", "16");
    header.setAttribute("font-family", HAND_FONT);
    header.setAttribute("font-size", "16");
    header.setAttribute("font-weight", "700");
    header.setAttribute("fill", INK);
    header.textContent = "This week's SCALE list";
    svg.appendChild(header);

    // Sketchy star next to header
    const cx = 200;
    const cy = 14;
    const star: [number, number][] = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 8 : 3.5;
      const a = (Math.PI / 5) * i - Math.PI / 2;
      star.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    svg.appendChild(
      rs.polygon(star, { stroke: RED, strokeWidth: 1.6, roughness: 1.5, fill: RED, fillStyle: "solid" })
    );

    const rows = [
      { name: "Time-lapse v3", note: "+20% budget" },
      { name: "Owner-on-jobsite", note: "+20% budget" },
    ];

    rows.forEach((r, i) => {
      const y = 70 + i * 60;
      // Up arrow
      svg.appendChild(
        rs.line(20, y + 10, 20, y - 18, { stroke: INK, strokeWidth: 2.2, roughness: 1.6 })
      );
      svg.appendChild(
        rs.line(20, y - 18, 12, y - 10, { stroke: INK, strokeWidth: 2.2, roughness: 1.4 })
      );
      svg.appendChild(
        rs.line(20, y - 18, 28, y - 10, { stroke: INK, strokeWidth: 2.2, roughness: 1.4 })
      );

      const name = document.createElementNS("http://www.w3.org/2000/svg", "text");
      name.setAttribute("x", "44");
      name.setAttribute("y", String(y));
      name.setAttribute("font-family", HAND_FONT);
      name.setAttribute("font-size", "16");
      name.setAttribute("font-weight", "700");
      name.setAttribute("fill", INK);
      name.textContent = r.name;
      svg.appendChild(name);

      const note = document.createElementNS("http://www.w3.org/2000/svg", "text");
      note.setAttribute("x", "44");
      note.setAttribute("y", String(y + 18));
      note.setAttribute("font-family", HAND_FONT);
      note.setAttribute("font-size", "13");
      note.setAttribute("fill", INK_SOFT);
      note.textContent = r.note;
      svg.appendChild(note);
    });
  });

  return (
    <TileShell title="Scale List" ariaLabel="Scale list: time-lapse v3 plus 20% budget, owner on jobsite plus 20% budget">
      <svg ref={ref} className="w-full h-[200px]" aria-hidden="true" />
    </TileShell>
  );
};

// ---------- Tile 5: Big number $82 ----------

const Tile5_BigNumber = () => {
  const ref = useRef<SVGSVGElement>(null);
  useRough(ref, (rs, svg) => {
    const W = 360;
    const H = 220;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    // Big $82
    const big = document.createElementNS("http://www.w3.org/2000/svg", "text");
    big.setAttribute("x", String(W / 2));
    big.setAttribute("y", "120");
    big.setAttribute("text-anchor", "middle");
    big.setAttribute("font-family", HAND_FONT);
    big.setAttribute("font-size", "96");
    big.setAttribute("font-weight", "700");
    big.setAttribute("fill", INK);
    big.textContent = "$82";
    svg.appendChild(big);

    // Red ellipse around it
    svg.appendChild(
      rs.ellipse(W / 2, 90, 200, 120, {
        stroke: RED,
        strokeWidth: 3,
        roughness: 2.5,
      })
    );

    // Subtitle
    const sub = document.createElementNS("http://www.w3.org/2000/svg", "text");
    sub.setAttribute("x", String(W / 2));
    sub.setAttribute("y", "175");
    sub.setAttribute("text-anchor", "middle");
    sub.setAttribute("font-family", HAND_FONT);
    sub.setAttribute("font-size", "16");
    sub.setAttribute("fill", INK_SOFT);
    sub.textContent = "weeks blended cpl";
    svg.appendChild(sub);

    // Note
    const note = document.createElementNS("http://www.w3.org/2000/svg", "text");
    note.setAttribute("x", String(W / 2));
    note.setAttribute("y", "200");
    note.setAttribute("text-anchor", "middle");
    note.setAttribute("font-family", HAND_FONT);
    note.setAttribute("font-size", "14");
    note.setAttribute("fill", INK);
    note.textContent = "target was $100  ✓";
    svg.appendChild(note);
  });

  return (
    <TileShell title="Blended CPL" ariaLabel="Blended cost per lead is $82, beating the $100 target">
      <svg ref={ref} className="w-full h-[220px]" aria-hidden="true" />
    </TileShell>
  );
};

// ---------- Tile 6: Next week's queue ----------

const Tile6_NextWeek = () => {
  const ref = useRef<SVGSVGElement>(null);
  useRough(ref, (rs, svg) => {
    const W = 360;
    const H = 220;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    const items = [
      "4 new creatives in winning lane",
      "Test new offer angle",
      "Refresh cooldown audience",
      "Build Adv+ shopping campaign",
    ];

    items.forEach((it, i) => {
      const y = 18 + i * 48;
      // Checkbox
      svg.appendChild(
        rs.rectangle(8, y, 22, 22, {
          stroke: INK,
          strokeWidth: 1.8,
          roughness: 2,
        })
      );
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", "42");
      txt.setAttribute("y", String(y + 17));
      txt.setAttribute("font-family", HAND_FONT);
      txt.setAttribute("font-size", "15");
      txt.setAttribute("fill", INK);
      txt.textContent = it;
      svg.appendChild(txt);
    });
  });

  return (
    <TileShell title="Next Week's Queue" ariaLabel="Next week's queue: 4 new creatives, test new offer angle, refresh cooldown audience, build Advantage+ shopping">
      <svg ref={ref} className="w-full h-[220px]" aria-hidden="true" />
    </TileShell>
  );
};

// ---------- Main dashboard ----------

const FridayDashboard = () => {
  return (
    <>
      {/* Load Kalam font once for the whiteboard tiles only. */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Caveat:wght@400;700&display=swap"
      />
      <div
        className="relative mx-auto max-w-6xl rounded-3xl shadow-2xl overflow-hidden"
        style={{
          background: PAPER,
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.10) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          transform: "rotate(-0.3deg)",
          padding: "32px 24px",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* Whiteboard "title" scrawl */}
        <div
          className="mb-6 text-center"
          style={{ fontFamily: HAND_FONT, color: INK }}
        >
          <div className="text-2xl sm:text-3xl font-bold">Friday Review — Account Dashboard</div>
          <div className="text-base mt-1" style={{ color: INK_SOFT }}>
            (what we walk through, every week, with you)
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Tile1_CPLTrend />
          <Tile2_HookRate />
          <Tile3_KillList />
          <Tile4_ScaleList />
          <Tile5_BigNumber />
          <Tile6_NextWeek />
        </div>
      </div>
    </>
  );
};

export default FridayDashboard;
