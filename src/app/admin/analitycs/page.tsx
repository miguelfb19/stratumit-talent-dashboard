"use client";

import dynamic from "next/dynamic";

// import component without SSR 'cause react-rechart-js uses functions incompatible with it
const NoSSRAreaChart = dynamic(
  () =>
    import("@/components/admin/ui/recharts/AreaChartComponent").then(
      (mod) => mod.AreaChartComponent,
    ),
  { ssr: false },
);
const NoSSRBarChart = dynamic(
  () =>
    import("@/components/admin/ui/recharts/BarChartComponent").then(
      (mod) => mod.BarChartComponent,
    ),
  { ssr: false },
);
const NoSSRLineChart = dynamic(
  () =>
    import("@/components/admin/ui/recharts/LineChartComponent").then(
      (mod) => mod.LineChartComponent,
    ),
  { ssr: false },
);
const NoSSRPieChart = dynamic(
  () =>
    import("@/components/admin/ui/recharts/PieChartComponent").then(
      (mod) => mod.PieChartComponent,
    ),
  { ssr: false },
);

export default function AnalitycsPage() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 p-5 gap-5 justify-items-center items-center">
      <NoSSRAreaChart width={350} />
      <NoSSRBarChart width={350} />
      <NoSSRLineChart width={350} />
      <NoSSRPieChart width={350} />
    </div>
  );
}
