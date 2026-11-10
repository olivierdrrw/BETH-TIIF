export type InterventionLevel =
  | "awareness"
  | "support"
  | "guidance"
  | "professional"
  | "urgent";

export interface Intervention {
  id: string;
  title: string;
  description: string;
  level: InterventionLevel;
  estimatedImpact?: number;
  category?: string;
  createdAt?: string;
}
