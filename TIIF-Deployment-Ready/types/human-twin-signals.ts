export interface HumanTwinSignals {
  goalsCompleted: number;
  trustedConnections: number;
  streakDays: number;
  reflections: number;
  assessmentsCompleted: number;
  aiInteractions: number;
  moodEntries: number;
}

export const EMPTY_HUMAN_TWIN_SIGNALS: HumanTwinSignals = {
  goalsCompleted: 0,
  trustedConnections: 0,
  streakDays: 0,
  reflections: 0,
  assessmentsCompleted: 0,
  aiInteractions: 0,
  moodEntries: 0,
};
