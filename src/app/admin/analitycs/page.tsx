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
    <div className="flex flex-col overflow-scroll max-md:py-10 md:grid md:grid-cols-2 md:grid-rows-2 p-5 gap-5 md:justify-items-center items-center max-md:mt-16">
      <NoSSRAreaChart width={350} />
      <NoSSRBarChart width={350} />
      <NoSSRLineChart width={350} />
      <NoSSRPieChart width={350} />
    </div>
  );
}
