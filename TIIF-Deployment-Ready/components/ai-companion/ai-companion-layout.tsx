import { AICompanionHeader } from "./ai-companion-header";
import { ConversationPanel } from "./conversation-panel";
import { HumanContextCard } from "./human-context-card";
import { EmotionSignalsCard } from "./emotion-signals-card";
import { GrowthInsightsCard } from "./growth-insights-card";
import { CompanionActionsCard } from "./companion-actions-card";

export function AICompanionLayout() {
  return (
    <div className="space-y-8">
      <AICompanionHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ConversationPanel />
        </div>

        <div className="space-y-6">
          <HumanContextCard />
          <EmotionSignalsCard />
          <GrowthInsightsCard />
          <CompanionActionsCard />
        </div>
      </div>
    </div>
  );
}