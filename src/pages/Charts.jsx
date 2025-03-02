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
          border: "2px solid #e5e7eb",
          borderRadius: "10px",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <div style={{ borderRight: "2px solid #e5e7eb", paddingRight: "1rem" }}>
          <PieChartLabels />
        </div>
        <div style={{ borderRight: "2px solid #e5e7eb", paddingRight: "1rem" }}>
          <PieChartLabels />
        </div>
        <div>
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
          border: "2px solid #e5e7eb",
          borderRadius: "10px",
          padding: "1rem",
        }}
      >
        <div style={{ borderRight: "2px solid #e5e7eb", paddingRight: "1rem" }}>
          <BarChartHorizontal />
        </div>
        <div>
          <BarChartHorizontal />
        </div>
      </Group>
    </>
  );
}