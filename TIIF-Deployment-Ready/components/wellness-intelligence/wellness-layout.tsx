import { WellnessHeader } from "./wellness-header";
import { WellnessIndexCard } from "./wellness-index-card";
import { IdentitySignalsCard } from "./identity-signals-card";
import { GrowthSignalsCard } from "./growth-signals-card";
import { RiskSignalsCard } from "./risk-signals-card";
import { AIInsightsCard } from "./ai-insights-card";
import { EarlyWarningCard } from "./early-warning-card";

export function WellnessLayout() {
  return (
    <div className="space-y-8">
      <WellnessHeader />

      <WellnessIndexCard />

      <div className="grid gap-6 lg:grid-cols-2">
        <IdentitySignalsCard />
        <GrowthSignalsCard />
        <RiskSignalsCard />
        <AIInsightsCard />
      </div>

      <EarlyWarningCard />
    </div>
  );
}