import { PageHeader } from "@/components/dashboard/page-header";
import { CheckoutSuccessHandler } from "@/features/billing/components/checkout-success-handler";
import { HumanTwinSection } from "@/components/dashboard/human-twin-section";
import { TodaysStory } from "@/components/dashboard/todays-story";
import { AICompanionCard } from "@/features/components/ai-companion-card";
import { GrowthJourneySection } from "@/components/dashboard/growth-journey-section";
import { DailyMissionsCard } from "@/features/missions/components/daily-missions-card";
import { WellnessScoreCard } from "@/components/dashboard/wellness-score-card";
import { NotificationsCenter } from "@/components/dashboard/notifications-center";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <CheckoutSuccessHandler />
      <PageHeader
        title="Overview"
        description="Uko wifashe uyu munsi n'aho ugeze mu rugendo rwawe."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <TodaysStory />
          <DailyMissionsCard />
          <AICompanionCard />
          <GrowthJourneySection />
        </div>

        <div className="space-y-6">
          <HumanTwinSection />
          <WellnessScoreCard />
          <NotificationsCenter />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
