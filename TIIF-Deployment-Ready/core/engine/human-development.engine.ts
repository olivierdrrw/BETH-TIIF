import { HumanTwinEngine } from "@/engine/intelligence/human-twin.engine";
import { PredictionEngine } from "@/engine/intelligence/prediction.engine";
import { IdentityEngine } from "@/engine/intelligence/identity.engine";
import { AnalyticsEngine } from "@/engine/intelligence/analytics.engine";

/**
 * Coordinates the existing deterministic engines.
 * The class deliberately does not make clinical decisions or persist user data.
 */
export class HumanDevelopmentEngine {
  constructor(
    private readonly humanTwin: typeof HumanTwinEngine = HumanTwinEngine,
    private readonly prediction: typeof PredictionEngine = PredictionEngine,
    private readonly identity: typeof IdentityEngine = IdentityEngine,
    private readonly analytics: typeof AnalyticsEngine = AnalyticsEngine,
  ) {}

  run(input: {
    identityScore: number;
    growthScore: number;
    resilienceScore: number;
    previousGrowthScore: number;
    valuesScore: number;
    purposeScore: number;
    habitsScore: number;
    wellnessHistory: number[];
  }) {
    const wellbeingScore = this.humanTwin.wellbeing({
      identityScore: input.identityScore,
      growthScore: input.growthScore,
      resilienceScore: input.resilienceScore,
      wellbeingScore: 0,
      purposeScore: input.purposeScore,
    });

    return {
      wellbeingScore,
      growthChange: this.humanTwin.growthRate(
        input.previousGrowthScore,
        input.growthScore,
      ),
      identityAlignment: this.identity.calculateAlignment(
        input.valuesScore,
        input.purposeScore,
        input.habitsScore,
      ),
      predictions: {
        burnoutEstimate: this.prediction.burnout(wellbeingScore),
        wellbeingEstimate: this.prediction.wellbeing(wellbeingScore),
        resilienceEstimate: this.prediction.resilience(input.resilienceScore),
      },
      wellbeingTrend: this.analytics.trend(input.wellnessHistory),
    };
  }
}
