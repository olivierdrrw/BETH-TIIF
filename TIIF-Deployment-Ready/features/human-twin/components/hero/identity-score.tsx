"use client";

import { DashboardMetric } from "@/components/ui/dashboard-metric";

export default function IdentityScore() {
  return (
    <DashboardMetric
      title="Identity"
      value={91}
      suffix="%"
      change="+4%"
    />
  );
}
