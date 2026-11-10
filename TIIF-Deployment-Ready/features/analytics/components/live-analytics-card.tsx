"use client";

import ChartCard from "@/components/charts/chart-card";
import ChartHeader from "@/components/charts/chart-header";
import ChartMetric from "@/components/charts/chart-metric";
import LiveDot from "@/components/charts/live-dot";

import WellbeingChart from "./wellbeing-chart";

export default function LiveAnalyticsCard() {
  return (
    <ChartCard>

      <div className="flex items-center justify-between">

        <ChartHeader
          title="Live Wellbeing"
          subtitle="Analytics™"
        />

        <div className="flex items-center gap-2">

          <LiveDot />

          <span className="text-sm text-navy-300">
            Live
          </span>

        </div>

      </div>

      <ChartMetric
        value="88%"
        trend="+5%"
      />

      <div className="mt-8">
        <WellbeingChart />
      </div>

      <div className="mt-8 rounded-2xl border border-navy-500/15 bg-navy-500/5 p-5">

        <p className="text-sm leading-7 text-slate-300">
          AI Analysis: Wellbeing increased steadily during the
          last 7 days. If this trend continues, the projected
          wellbeing score is <strong>92%</strong> next week.
        </p>

      </div>

    </ChartCard>
  );
}