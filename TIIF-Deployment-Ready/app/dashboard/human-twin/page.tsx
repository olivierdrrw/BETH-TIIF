import { HumanTwinHeader } from "@/components/human-twin/human-twin-header";
import { HumanTwinOrb } from "@/components/human-twin/human-twin-orb";
import { IdentityCard } from "@/components/human-twin/identity-card";
import { LifeDomains } from "@/components/human-twin/life-domains";
import { MemoryTimeline } from "@/components/human-twin/memory-timeline";
import { InsightsPanel } from "@/components/human-twin/insights-panel";
import { PredictionsPanel } from "@/components/human-twin/predictions-panel";
import { RecommendationsPanel } from "@/components/human-twin/recommendations-panel";

export default function HumanTwinPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 p-8">

      <HumanTwinHeader />

      <div className="flex justify-center">
        <HumanTwinOrb />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <IdentityCard />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LifeDomains />
        <MemoryTimeline />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <InsightsPanel />
        <PredictionsPanel />
        <RecommendationsPanel />
      </div>

    </div>
  );
}