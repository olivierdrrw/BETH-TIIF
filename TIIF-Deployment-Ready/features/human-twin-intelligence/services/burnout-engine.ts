import type { HumanTwin } from "@/types/human-twin";

/**
 * A lightweight, non-clinical workload/wellbeing signal based only on
 * user-provided domain scores. Missing domains are not treated as low scores.
 */
export function calculateBurnoutRisk(twin: HumanTwin): number {
  let risk = 0;
  const domains = twin.lifeDomains;

  if (typeof domains?.career === "number" && domains.career < 50) risk += 25;
  if (typeof domains?.physical === "number" && domains.physical < 50) risk += 25;
  if (typeof domains?.emotional === "number" && domains.emotional < 50) risk += 25;
  if (twin.wellbeingScore < 50) risk += 25;

  return Math.min(risk, 100);
}
