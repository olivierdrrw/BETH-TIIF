export type WellnessLogType = "sleep" | "stress" | "water" | "exercise";

export interface WellnessLog {
  id: string;
  userId: string;
  type: WellnessLogType;
  value: number;
  notes?: string;
  createdAt: string;
}
