"use client";

import { DashboardMetric } from "@/components/ui/dashboard-metric";

export default function ResilienceScore() {
  return (
    <DashboardMetric
      title="Resilience"
      value={92}
      suffix="%"
      change="+3%"
    />
  );
}
