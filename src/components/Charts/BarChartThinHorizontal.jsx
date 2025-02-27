import React from "react";
import { scaleBand, scaleLinear, max } from "d3";
import { ClientTooltip, TooltipContent, TooltipTrigger } from "./ClientTooltip"; // Ensure this path is correct
import { useProducts } from "../../hooks/useProducts";


const data = [
  { key: "Luz led c6 9006", value: 10 },
  { key: "lupitas h4", value: 20 },
  { key: "Tercer stop", value: 30 },
  { key: "Led Auxiliar 18w", value: 40 },
  { key: "Luz led c6 90", value: 80 },
  { key: "lupitas h2", value: 14 },
 
].sort((a, b) => b.value - a.value);

export function BarChartThinHorizontal() {


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
    .padding(0.6);

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
          translate-y-[var(--marginTop)]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          overflow-visible
        "
      >
        {/* Tooltip for each data point */}
        {data.map((d, index) => {
          const barWidth = xScale(d.value);
          const barHeight = yScale.bandwidth();
          const hoverColor =
            barWidth > 50
            ? "hover:bg-pink-200/40"
            : barWidth > 25
            ? "hover:bg-purple-200/40"
            : barWidth > 10
            ? "hover:bg-indigo-200/40"
              : "hover:bg-sky-200/40";
          return (
            <ClientTooltip key={index}>
              <TooltipTrigger>
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: "0",
                    top: `${yScale(d.key)}%`,
                    width: "100%",
                    height: `calc(${barHeight}% + 8px)`,
                    transform: "translateY(-4px)",
                  }}
                  className={`${hoverColor} rounded-md hover:bg-gray-200/50 relative z-10`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div>{d.key}</div>
                <div className="text-gray-500 text-sm">{d.value}</div>
              </TooltipContent>
            </ClientTooltip>
          );
        })}

        {/* Bars with Rounded Right Corners */}
        {data.map((d, index) => {
          const barWidth = xScale(d.value);
          const barHeight = yScale.bandwidth();
          const colorMap = {
            top: "#0098da",
            mid: "#3698ff",
            bottom: "#36c2ff",
            sky: "#0271d8",
          };

          const barColor =
            barWidth > 50 ? colorMap.top
            : barWidth > 25 ? colorMap.bottom
            : barWidth > 10 ? colorMap.bottom
            : colorMap.sky;
          return (
            <React.Fragment key={index}>
               <svg
                style={{
                  position: "absolute",
                  left: "0",
                  top: `${yScale(d.key)}%`,
                  width: `${barWidth}%`,
                  height: `${barHeight}%`,
                }}
              >
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="8"
                  ry="8"
                  fill={
                    barColor
                  }
                />
              </svg>
            </React.Fragment>
              );
            })}
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
              left: "0",
              top: `${yScale(entry.key) + yScale.bandwidth() / 2}%`,
            }}
            className="absolute text-xs text-black -translate-y-1/2 w-full text-right pr-2"
          >
            {entry.key}
          </span>
        ))}
      </div>
    </div>
  );
}
