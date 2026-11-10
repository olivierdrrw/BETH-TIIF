import type { EmotionTag } from "@/types/memory";
import type { LifeDomains } from "@/features/life-domains/types/life-domain";

/** Canonical, longitudinal summary of a user's development context. */
export interface HumanTwin {
  id?: string;
  userId?: string;
  version?: string;
  identityScore: number;
  growthScore: number;
  wellbeingScore: number;
  resilienceScore: number;
  purposeScore: number;
  impactScore?: number;
  relationshipScore?: number;
  connectionScore?: number;
  wellnessScore?: number;
  dominantEmotion?: EmotionTag;
  lifeDomains?: Partial<LifeDomains>;
  currentLevel?: number;
  currentXP?: number;
  avatarLevel?: string;
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  risks?: string[];
  primaryPurpose?: string;
  currentStage?: string;
  futureVision?: string;
  nextMilestone?: string;
  traumaScore?: number;
  currentMood?: string;
  xp?: number;
  level?: number;
  aiConfidence?: number;
  /** Legacy display aliases retained while older screens are migrated. */
  identity?: number;
  growth?: number;
  wellbeing?: number;
  resilience?: number;
  createdAt?: Date | string;
  generatedAt?: string;
  updatedAt?: string;
  lastUpdated?: string;
}
