"use client";

import { DashboardMetric } from "@/components/ui/dashboard-metric";
import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";

export default function IdentityScore() {
  const identity = useHumanTwinStore((s) => s.identity);

  return (
    <DashboardMetric
      title="Identity"
      value={identity}
      suffix="%"
      change="+4%"
    />
  );
}
