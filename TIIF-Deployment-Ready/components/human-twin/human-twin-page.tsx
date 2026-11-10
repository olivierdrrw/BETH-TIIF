import {
  HumanTwinHeader,
} from "@/components/human-twin/human-twin-header";

import {
  HumanTwinCore,
} from "@/components/human-twin/human-twin-core";

import {
  HumanTwinMetrics,
} from "@/components/human-twin/human-twin-metrics";

import {
  GrowthSignals,
} from "@/components/human-twin/growth-signals";

import {
  HumanTwinInsights,
} from "@/components/human-twin/human-twin-insights";

import {
  HumanTwinTimeline,
} from "@/components/human-twin/human-twin-timeline";

import {
  NextStepCard,
} from "@/components/human-twin/next-step-card";

export default function Page() {
  return (
    <div className="space-y-8">
      <HumanTwinHeader />

      <HumanTwinCore />

      <HumanTwinMetrics />

      <div className="grid gap-6 lg:grid-cols-2">
        <GrowthSignals />
        <HumanTwinInsights />
        <HumanTwinTimeline />
        <NextStepCard />
      </div>
    </div>
  );
}