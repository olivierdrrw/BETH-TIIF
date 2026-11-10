"use client";

import { TrendingUp } from "lucide-react";

interface Props {
  value: string;
  trend: string;
}

export default function ChartMetric({
  value,
  trend,
}: Props) {
  return (
    <div className="mt-8 flex items-center justify-between">

      <h3 className="text-5xl font-bold">
        {value}
      </h3>

      <div className="flex items-center gap-2 rounded-full border border-navy-500/20 bg-navy-500/10 px-4 py-2">

        <TrendingUp className="h-4 w-4 text-navy-400" />

        <span className="text-sm text-navy-400">
          {trend}
        </span>

      </div>

    </div>
  );
}