export type InstitutionType =
  | "school"
  | "ngo"
  | "therapy"
  | "company"
  | "university"
  | "government";

/** Minimal shared institution model. Scores are optional until an institution has validated data. */
export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  memberCount: number;
  /** Number of currently active users, when measured by the institution. */
  activeUsers?: number;
  wellnessScore?: number;
  riskScore?: number;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}
