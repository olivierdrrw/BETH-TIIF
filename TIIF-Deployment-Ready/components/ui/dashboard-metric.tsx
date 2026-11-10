"use client";

import CountUp from "react-countup";
import { TrendingUp } from "lucide-react";

interface DashboardMetricProps {
  title: string;
  value: number;
  suffix?: string;
  change?: string;
}

export function DashboardMetric({
  title,
  value,
  suffix = "%",
  change = "+4%",
}: DashboardMetricProps) {
  return (
    <div
      className="
      rounded-2xl

      border
      border-white/5

      bg-white/[0.02]

      p-4

      transition-all
      duration-300

      hover:bg-white/[0.05]
    "
    >
      <p
        className="
        text-sm
        text-slate-400
      "
      >
        {title}
      </p>

      <div className="mt-2 flex items-end justify-between">
        <h3
          className="
          text-3xl
          font-bold
          text-white
        "
        >
          <CountUp
            end={value}
            duration={2}
            suffix={suffix}
          />
        </h3>

        <div
          className="
          flex
          items-center
          gap-1

          rounded-full

          bg-navy-500/10

          px-2
          py-1

          text-xs

          text-navy-400
        "
        >
          <TrendingUp size={14} />

          {change}
        </div>
      </div>
    </div>
  );
}