import { GrowthJourneyHeader } from "./growth-journey-header";
import { GrowthProgress } from "./growth-progress";
import { GrowthTimeline } from "./growth-timeline";
import { MilestonesCard } from "./milestones-card";
import { GoalsCard } from "./goals-card";
import { ReflectionInsights } from "./reflection-insights";

export function GrowthJourneyLayout() {
  return (
    <div className="space-y-8">
      <GrowthJourneyHeader />

      <GrowthProgress />

      <div className="grid gap-6 lg:grid-cols-2">
        <GrowthTimeline />
        <MilestonesCard />
        <GoalsCard />
        <ReflectionInsights />
      </div>
    </div>
  );
}