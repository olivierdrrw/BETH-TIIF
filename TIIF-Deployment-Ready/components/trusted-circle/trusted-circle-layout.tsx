import { TrustedCircleHeader } from "./trusted-circle-header";
import { CircleOverview } from "./circle-overview";
import { SupportNetwork } from "./support-network";
import { RecentCheckins } from "./recent-checkins";
import { GrowthSupportCard } from "./growth-support-card";
import { InviteMemberCard } from "./invite-member-card";

export function TrustedCircleLayout() {
  return (
    <div className="space-y-8">
      <TrustedCircleHeader />

      <div className="grid gap-6 lg:grid-cols-2">
        <CircleOverview />
        <SupportNetwork />
        <RecentCheckins />
        <GrowthSupportCard />
      </div>

      <InviteMemberCard />
    </div>
  );
}