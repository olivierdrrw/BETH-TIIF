import {
  HumanTwinOverview,
} from "./human-twin-overview";

import {
  GrowthSignal,
} from "./growth-signal";

import {
  AIInsight,
} from "./ai-insight";

import {
  TrustedCircleOverview,
} from "./trusted-circle-overview";

import {
  RecommendedActions,
} from "./recommended-actions";

export function
DashboardHome() {
  return (
    <div
      className="
      space-y-8
      "
    >
      <section>
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Good Morning,
          Olivier
        </h1>

        <p
          className="
          mt-2
          text-muted-foreground
          "
        >
          Continue your
          growth journey.
        </p>
      </section>

      <HumanTwinOverview />

      <div
        className="
        grid
        gap-6
        lg:grid-cols-2
        "
      >
        <GrowthSignal />

        <AIInsight />

        <TrustedCircleOverview />

        <RecommendedActions />
      </div>
    </div>
  );
}