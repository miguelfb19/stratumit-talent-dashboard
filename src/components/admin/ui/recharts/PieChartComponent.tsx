"use client";

import { PieChart, Pie } from "recharts";

const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];
const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export const PieChartComponent = ({
  className,
  width = 400,
  height = 250,
}: Props) => {
  return (
    <div suppressHydrationWarning>
      <PieChart className={className} height={height} width={width}>
        <Pie
          cx="50%"
          cy="50%"
          data={data01}
          dataKey="value"
          fill="#2563eb"
          nameKey="name"
          outerRadius={50}
        />
        <Pie
          label
          cx="50%"
          cy="50%"
          data={data02}
          dataKey="value"
          fill="#0f172a"
          innerRadius={60}
          nameKey="name"
          outerRadius={80}
        />
      </PieChart>
    </div>
  );
};
