import { PieChartLabels } from "../components/Charts/PieChartLabels";
import { Group, Title } from "@mantine/core";
import BarChartHorizontal from "../components/Charts/BarChartHorizontal";

export default function Charts() {
  return (
    <>
      <Title className="font-bold">Charts</Title>

      {/* First Group: Pie Charts */}
      <Group
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
          <Title order={3}>BEST SELLERS</Title>
          <PieChartLabels />
        </div>
        <div
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
         <Title order={3}>WORST SELLERS</Title>

          <PieChartLabels />
        </div>
        <div
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
           <Title order={3}>BEST CLIENTS</Title>
          <PieChartLabels />
        </div>
      </Group>

      {/* Second Group: Bar Charts */}
      <Group
        className="mt-8"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <div
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
                    <Title order={3}>PRODUCTS WITH MORE STOCK</Title>

          <BarChartHorizontal />
        </div>
        <div
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
                    <Title order={3}>PRODUCTS THAT REQUIRES STOCK</Title>

          <BarChartHorizontal />
        </div>
      </Group>
    </>
  );
}