"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", value: 81 },
  { day: "Tue", value: 82 },
  { day: "Wed", value: 84 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 87 },
  { day: "Sat", value: 88 },
  { day: "Sun", value: 89 },
];

export default function WellbeingChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#5D85D1"
            fill="url(#wellbeing)"
            strokeWidth={3}
          />

          <defs>
            <linearGradient id="wellbeing">
              <stop offset="0%" stopColor="#5D85D1" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#5D85D1" stopOpacity={0} />
            </linearGradient>
          </defs>

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}