"use client";

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export const LineChartComponent = ({
  className,
  width = 400,
  height = 250,
}: Props) => {
  return (
    <div suppressHydrationWarning>
      <LineChart
        className={className}
        data={data}
        height={height}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        width={width}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="pv" stroke="#0f172a" type="monotone" />
        <Line dataKey="uv" stroke="#2563eb" type="monotone" />
      </LineChart>
    </div>
  );
};
