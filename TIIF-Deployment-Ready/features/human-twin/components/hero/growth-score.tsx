"use client";

import { DashboardMetric } from "@/components/ui/dashboard-metric";

export default function GrowthScore() {
  return (
    <DashboardMetric
      title="Growth"
      value={94}
      suffix="%"
      change="+6%"
    />
  );
}
