import { scaleBand, scaleLinear, max } from "d3";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./ClientTooltip"; // Ensure this path is correct
import { useProducts } from "../../hooks/useProducts";

const data = [
  { key: "Technology", value: 76},
  { key: "Financials", value: 25.3 },
  { key: "Energy", value: 23.1 },
  { key: "Cyclical", value: 19.5 },
  { key: "Defensive", value: 14.7 },
  { key: "Utilities", value: 5.8 },
  { key: "Healthcare", value: 5.3 },
  { key: "Industrials", value: 4.7 },
  { key: "Materials", value: 4.4 },
  { key: "Industrial Goods", value: 1.1 },
  { key: "Energy Sector", value: 1.0 },
  { key: "Technology Sector", value: 0.9 },
  { key: "Healthcare Sector", value: 0.8 },
  { key: "Consumer Goods", value: 0.7 },
  { key: "Financial Sector", value: 0.6 },
].sort((a, b) => b.value - a.value);

export function BarChartHorizontal() {

  //  We have to create a specific query from supabase to get the data we need for the chart - exmaple: the most saled products, then we will create a custom hook and utilize it here

  //   const {
  //       data: products,
  //     } = useProducts();
  //   console.log(products);
  //   const data = (products || [])
  // .map((product) => ({
  //   key: product.name,
  //   value: product.products ? product.products.length : 0,
  // }))
  // .sort((a, b) => b.value - a.value);

  // Scales
  const yScale = scaleBand()
    .domain(data.map((d) => d.key))
    .range([0, 100])
    .padding(0.175);

  const xScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) || 0])
    .range([0, 100]);

  const longestWord = max(data.map((d) => d.key.length)) || 1;

  return (
    <div
      className="relative w-full h-72"
      style={{
        "--marginTop": "0px",
        "--marginRight": "0px",
        "--marginBottom": "16px",
        "--marginLeft": `${longestWord * 7}px`,
      }}
    >
      {/* Chart Area */}
      <div
        className="absolute inset-0
          z-10
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
           " // border border-gray-200 dark:border-gray-500 Added border to the chart area
      >
        {data.map((d, index) => {
          const barWidth = xScale(d.value);
          const barHeight = yScale.bandwidth();

          return (
            <ClientTooltip key={index}>
              <TooltipTrigger>
                <div
                  key={index}
                  style={{
                    left: "0",
                    top: `${yScale(d.key)}%`,
                    width: `${barWidth}%`,
                    height: `${barHeight}%`,
                    borderRadius: "0 4px 4px 0",
                  }}
                  className="absolute bg-purple-300 dark:bg-purple-400"
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex gap-2.5 items-center">
                  <div className="w-1 h-8 bg-purple-300 dark:bg-purple-400 rounded-full"></div>
                  <div>
                    <div className="text-white">{d.key}</div>
                    <div className="text-white text-sm/5">{d.value}%</div>
                  </div>
                </div>
              </TooltipContent>
            </ClientTooltip>
          );
        })}

        {/* Grid lines - Less dark */}
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {xScale
            .ticks(8)
            .map(xScale.tickFormat(8, "d"))
            .map((active, i) => (
              <g
                transform={`translate(${xScale(+active)},0)`}
                className="text-gray-300/50 dark:text-gray-800/30" // opacity for lighter grid lines
                key={i}
              >
                <line
                  y1={0}
                  y2={100}
                  stroke="currentColor"
                  strokeDasharray="6,5"
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
        </svg>

        {/* X Axis (Values) */}
        {xScale.ticks(4).map((value, i) => (
          <div
            key={i}
            style={{
              left: `${xScale(value)}%`,
              top: "100%",
            }}
            className="absolute text-xs -translate-x-1/2 tabular-nums text-gray-400"
          >
            {value}
          </div>
        ))}
      </div>

      {/* Y Axis (Letters) */}
      <div
        className="
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible"
      >
        {data.map((entry, i) => (
          <span
            key={i}
            style={{
              left: "-8px",
              top: `${yScale(entry.key) + yScale.bandwidth() / 2}%`,
            }}
            className="absolute text-xs text-black -translate-y-1/2 w-full text-right"
          >
            {entry.key}
          </span>
        ))}
      </div>
    </div>
  );
}