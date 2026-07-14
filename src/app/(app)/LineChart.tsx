"use client";

export default function LineChart({
  points,
  height = 140,
}: {
  points: { label: string; value: number }[];
  height?: number;
}) {
  if (points.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-sm text-[var(--text-faint)]"
        style={{ height }}
      >
        Noch keine Daten
      </div>
    );
  }

  const width = 600;
  const padding = 12;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = points.length === 1 ? width / 2 : (i / (points.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((p.value - min) / range) * (height - padding * 2);
    return { x, y, ...p };
  });

  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${path} L${coords[coords.length - 1].x.toFixed(1)},${height} L${coords[0].x.toFixed(1)},${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#lineChartFill)" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={i === coords.length - 1 ? 4 : 2.5} fill="var(--accent)" />
      ))}
    </svg>
  );
}
