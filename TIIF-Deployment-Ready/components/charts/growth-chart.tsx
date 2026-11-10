"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function GrowthChart() {

  const data = [

    { day: "Mon", score: 60 },

    { day: "Tue", score: 63 },

    { day: "Wed", score: 66 },

    { day: "Thu", score: 70 },

    { day: "Fri", score: 74 },

  ];

  return (

    <LineChart
      width={600}
      height={300}
      data={data}
    >

      <XAxis dataKey="day" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="score"
      />

    </LineChart>

  );
}