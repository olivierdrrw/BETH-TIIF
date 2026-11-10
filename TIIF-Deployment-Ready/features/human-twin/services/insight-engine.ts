import type { HumanTwinScoreSet } from "@/core/human-twin/score-engine";

/**
 * Insight Engine
 *
 * Turns a raw Human Twin score set into short, human-readable insight
 * statements — the sentences the AI Companion and the dashboard show
 * under "Recommendation" / "Insights".
 */

export interface HumanTwinInsight {
  id: string;
  domain: keyof HumanTwinScoreSet;
  tone: "positive" | "neutral" | "attention";
  message: string;
}

const DOMAIN_LABEL: Record<keyof HumanTwinScoreSet, string> = {
  identityScore: "Identity",
  growthScore: "Growth",
  wellbeingScore: "Wellbeing",
  impactScore: "Impact",
  purposeScore: "Purpose",
  relationshipScore: "Relationships",
  resilienceScore: "Resilience",
};

function toneFor(value: number): HumanTwinInsight["tone"] {
  if (value >= 70) return "positive";
  if (value >= 45) return "neutral";
  return "attention";
}

function messageFor(domain: keyof HumanTwinScoreSet, value: number): string {
  const label = DOMAIN_LABEL[domain];

  if (value >= 70) {
    return `${label} is strong and stable right now.`;
  }
  if (value >= 45) {
    return `${label} is steady, with room to grow.`;
  }
  return `${label} needs attention — consider focusing here next.`;
}

export function generateInsights(scores: HumanTwinScoreSet): HumanTwinInsight[] {
  const entries = Object.entries(scores) as [keyof HumanTwinScoreSet, number][];

  return entries.map(([domain, value]) => ({
    id: `${domain}-insight`,
    domain,
    tone: toneFor(value),
    message: messageFor(domain, value),
  }));
}

/**
 * Returns only the single most useful insight — the lowest-scoring domain,
 * since that's the one most worth surfacing as "what to focus on next".
 */
export function generateTopInsight(scores: HumanTwinScoreSet): HumanTwinInsight {
  const insights = generateInsights(scores);
  return insights.reduce((lowest, current) =>
    scores[current.domain] < scores[lowest.domain] ? current : lowest
  );
}
