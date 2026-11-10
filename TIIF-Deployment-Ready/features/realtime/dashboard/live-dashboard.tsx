"use client";

import { DashboardStat } from "@/components/dashboard/ui/dashboard-stat";
import { useHumanTwinStore } from "@/stores/human-twin-store";

export function LiveDashboard() {
  const twin = useHumanTwinStore((state) => state.twin);
  return (
    <div className="grid gap-6 md:grid-cols-4">
      <DashboardStat title="Identity" value={twin.identityScore} />
      <DashboardStat title="Growth" value={twin.growthScore} />
      <DashboardStat title="Wellbeing" value={twin.wellbeingScore} />
      <DashboardStat title="Purpose" value={twin.purposeScore} />
    </div>
  );
}
