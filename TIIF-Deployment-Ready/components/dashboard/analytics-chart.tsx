"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", score: 58 },
  { month: "Feb", score: 62 },
  { month: "Mar", score: 67 },
  { month: "Apr", score: 70 },
  { month: "May", score: 76 },
  { month: "Jun", score: 84 },
];

export function AnalyticsChart() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          Wellness Trend
        </h3>

        <p className="text-sm text-muted-foreground">
          National wellness growth over time
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="currentColor"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}