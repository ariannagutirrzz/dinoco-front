import React from "react";
import { pie, arc } from "d3";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./ClientTooltip"; // Adjust the import path as needed

const data = [
  {
    name: "Technology",
    value: 731,
    colorFrom: "text-pink-800",
    colorTo: "text-pink-400",
  },
  { name: "Industrials", value: 631, colorFrom: "text-purple-800", colorTo: "text-purple-400" },
  { name: "Cyclical", value: 331, colorFrom: "text-indigo-800", colorTo: "text-indigo-400" },
  { name: "Energy", value: 232, colorFrom: "text-sky-800", colorTo: "text-sky-400" },
  { name: "Defensive", value: 101, colorFrom: "text-lime-800", colorTo: "text-lime-400" },
//   { name: "Financials", value: 42, colorFrom: "text-amber-800", colorTo: "text-amber-400" },
];

export function PieChartLabels() {
  // Chart dimensions
  const radius = Math.PI * 100;
  const gap = 0.02; // Gap between slices

  // Pie layout and arc generator
  const pieLayout = pie()
    .sort(null)
    .value((d) => d.value)
    .padAngle(gap); // Creates a gap between slices

  const arcGenerator = arc()
    .innerRadius(20)
    .outerRadius(radius)
    .cornerRadius(8);

  const labelRadius = radius * 0.8;
  const arcLabel = arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const arcs = pieLayout(data);

  // Calculate the angle for each slice
  const computeAngle = (d) => {
    return ((d.endAngle - d.startAngle) * 180) / Math.PI;
  };

  // Minimum angle to display text
  const MIN_ANGLE = 20;

  return (
    <div className="p-4">
      <div className="relative max-w-[16rem] mx-auto">
        <svg
          viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
          className="overflow-visible"
        >
          {/* Slices */}
          {arcs.map((d, i) => {
            const midAngle = (d.startAngle + d.endAngle) / 2;

            return (
              <ClientTooltip key={i}>
                <TooltipTrigger>
                  <g>
                    <path fill={`url(#pieColors-${i})`} d={arcGenerator(d)} />
                    <linearGradient
                      id={`pieColors-${i}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                      gradientTransform={`rotate(${(midAngle * 180) / Math.PI - 90}, 0.5, 0.5)`}
                    >
                      <stop offset="0%" stopColor="currentColor" className={d.data.colorFrom} />
                      <stop offset="100%" stopColor="currentColor" className={d.data.colorTo} />
                    </linearGradient>
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-white">{d.data.name}</div>
                  <div className="text-white text-sm">
                    {d.data.value}
                  </div>
                </TooltipContent>
              </ClientTooltip>
            );
          })}
        </svg>

        {/* Labels as absolutely positioned divs */}
        <div className="absolute inset-0 pointer-events-none">
          {arcs.map((d, i) => {
            const angle = computeAngle(d);
            if (angle <= MIN_ANGLE) return null;

            // Get pie center position
            const [x, y] = arcLabel.centroid(d);
            const CENTER_PCT = 50;

            // Convert to percentage positions
            const nameLeft = `${CENTER_PCT + (x / radius) * 40}%`;
            const nameTop = `${CENTER_PCT + (y / radius) * 40}%`;

            const valueLeft = `${CENTER_PCT + (x / radius) * 72}%`;
            const valueTop = `${CENTER_PCT + (y / radius) * 70}%`;

            return (
              <React.Fragment key={i}>
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: valueLeft, top: valueTop }}
                >
                  {d.data.value}
                </div>
                <div
                  className="absolute max-w-[80px] text-white truncate text-center text-sm font-medium"
                  style={{
                    left: nameLeft,
                    top: nameTop,
                    transform: "translate(-50%, -50%)",
                    marginLeft: x > 0 ? "2px" : "-2px",
                    marginTop: y > 0 ? "2px" : "-2px",
                  }}
                >
                  {d.data.name}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}