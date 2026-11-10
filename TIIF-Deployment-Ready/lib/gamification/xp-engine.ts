import { stageForXP, type HumanTwinStage } from "@/features/human-twin/services/roadmap-engine";

export interface ActivityCounts {
  journalEntries: number;
  goalsCompleted: number;
  habitStreakDays: number;
  moodCheckIns: number;
  assessmentsCompleted: number;
}

const XP_VALUES = {
  journalEntry: 10,
  goalCompleted: 40,
  habitStreakDay: 5,
  moodCheckIn: 5,
  assessmentCompleted: 30,
};

export function calculateTotalXP(counts: ActivityCounts): number {
  return (
    counts.journalEntries * XP_VALUES.journalEntry +
    counts.goalsCompleted * XP_VALUES.goalCompleted +
    counts.habitStreakDays * XP_VALUES.habitStreakDay +
    counts.moodCheckIns * XP_VALUES.moodCheckIn +
    counts.assessmentsCompleted * XP_VALUES.assessmentCompleted
  );
}

export function levelForXP(xp: number): HumanTwinStage {
  return stageForXP(xp);
}
