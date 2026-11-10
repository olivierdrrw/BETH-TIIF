/**
 * Roadmap Engine
 *
 * Implements the Human Twin Evolution ladder:
 * Seed → Explorer → Builder → Creator → Leader → Visionary → Legacy
 *
 * Every user starts at "Seed". As they log goals, journal entries,
 * assessments, and AI conversations, their XP grows and they move up
 * the ladder — this is what makes the Human Twin feel "alive" rather
 * than a static score.
 */

export interface HumanTwinStage {
  level: number;
  name: string;
  description: string;
  xpRequired: number;
}

export const HUMAN_TWIN_STAGES: HumanTwinStage[] = [
  { level: 1, name: "Seed", description: "You're just getting started — every journey begins here.", xpRequired: 0 },
  { level: 2, name: "Explorer", description: "You're discovering patterns in your emotions and identity.", xpRequired: 150 },
  { level: 3, name: "Builder", description: "You're actively building habits and working toward your goals.", xpRequired: 400 },
  { level: 4, name: "Creator", description: "You're shaping your own growth with intention.", xpRequired: 800 },
  { level: 5, name: "Leader", description: "You're modeling resilience and supporting others around you.", xpRequired: 1400 },
  { level: 6, name: "Visionary", description: "You have a clear, purpose-driven vision for your future.", xpRequired: 2200 },
  { level: 7, name: "Legacy", description: "Your growth is now part of the story you leave behind.", xpRequired: 3200 },
];

export interface HumanTwinRoadmap {
  stages: HumanTwinStage[];
  currentStage: HumanTwinStage;
  nextStage: HumanTwinStage | null;
  currentXP: number;
  xpToNextStage: number;
  progressToNextStage: number; // 0-100
}

export function stageForXP(xp: number): HumanTwinStage {
  let current = HUMAN_TWIN_STAGES[0];
  for (const stage of HUMAN_TWIN_STAGES) {
    if (xp >= stage.xpRequired) {
      current = stage;
    }
  }
  return current;
}

export function generateRoadmap(currentXP = 0): HumanTwinRoadmap {
  const currentStage = stageForXP(currentXP);
  const currentIndex = HUMAN_TWIN_STAGES.findIndex(
    (stage) => stage.level === currentStage.level
  );
  const nextStage = HUMAN_TWIN_STAGES[currentIndex + 1] ?? null;

  const xpToNextStage = nextStage
    ? Math.max(0, nextStage.xpRequired - currentXP)
    : 0;

  const progressToNextStage = nextStage
    ? Math.min(
        100,
        Math.round(
          ((currentXP - currentStage.xpRequired) /
            (nextStage.xpRequired - currentStage.xpRequired)) *
            100
        )
      )
    : 100;

  return {
    stages: HUMAN_TWIN_STAGES,
    currentStage,
    nextStage,
    currentXP,
    xpToNextStage,
    progressToNextStage,
  };
}
