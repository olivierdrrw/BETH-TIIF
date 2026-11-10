import { HumanTwinState } from "@/features/human-twin/store/use-human-twin-store";
import { AIInsight } from "../types/ai-insight";

export class PredictionEngine {

  static generate(
    twin: HumanTwinState
  ): AIInsight {

    const burnoutRisk =
      Math.max(
        5,
        100 - twin.wellbeing
      );

    return {

      burnoutRisk,

      wellbeingForecast:
        Math.min(100, twin.wellbeing + 5),

      growthForecast:
        Math.min(100, twin.growth + 3),

      confidence:
        twin.aiConfidence,

      recommendation:
        burnoutRisk > 35
          ? "Reduce workload and complete today's journal."
          : "Maintain today's routine and complete your goals."

    };

  }

}