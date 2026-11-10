"use client";

import { DashboardMetric } from "@/components/ui/dashboard-metric";
import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";

export default function GrowthScore() {
  const growth = useHumanTwinStore((s) => s.growth);

  return (
    <DashboardMetric
      title="Growth"
      value={growth}
      suffix="%"
      change="+6%"
    />
  );
}
