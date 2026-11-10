"use client";

import { DashboardMetric } from "@/components/ui/dashboard-metric";
import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";

export default function ResilienceScore() {
  const resilience = useHumanTwinStore((s) => s.resilience);

  return (
    <DashboardMetric
      title="Resilience"
      value={resilience}
      suffix="%"
      change="+3%"
    />
  );
}
