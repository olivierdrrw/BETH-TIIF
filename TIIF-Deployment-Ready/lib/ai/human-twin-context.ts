import type { HumanTwinScoreSet } from "@/core/human-twin/score-engine";

export function buildTwinContext(twin: Partial<HumanTwinScoreSet>): string {
  return `
Identity: ${twin.identityScore ?? "unknown"}
Growth: ${twin.growthScore ?? "unknown"}
Wellbeing: ${twin.wellbeingScore ?? "unknown"}
Purpose: ${twin.purposeScore ?? "unknown"}
Relationships: ${twin.relationshipScore ?? "unknown"}
Resilience: ${twin.resilienceScore ?? "unknown"}
Impact: ${twin.impactScore ?? "unknown"}
`.trim();
}
