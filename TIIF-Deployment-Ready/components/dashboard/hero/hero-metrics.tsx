"use client";

import { DashboardMetric } from "@/components/ui/dashboard-metric";

export default function HeroMetrics() {
  return (
    <div className="grid gap-5 md:grid-cols-2">

      <DashboardMetric
        title="Identity"
        value={91}
        suffix="%"
        change="+4%"
      />

      <DashboardMetric
        title="Wellbeing"
        value={88}
        suffix="%"
        change="+2%"
      />

      <DashboardMetric
        title="Growth"
        value={94}
        suffix="%"
        change="+6%"
      />

      <DashboardMetric
        title="AI Confidence"
        value={97}
        suffix="%"
        change="Live"
      />

    </div>
  );
}
