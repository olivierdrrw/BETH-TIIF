export type AvatarType = "basic" | "digital" | "3d" | "live";

export type PersonalityStyle =
  | "calm"
  | "supportive"
  | "motivational"
  | "reflective"
  | "balanced";

export type AvatarExpression =
  | "neutral"
  | "happy"
  | "calm"
  | "thinking"
  | "supportive"
  | "concerned";

export interface CompanionAvatar {
  id: string;
  userId: string;

  displayName: string;
  avatarType: AvatarType;

  imageUrl?: string;
  modelUrl?: string;
  voiceId?: string;

  personalityStyle: PersonalityStyle;

  createdAt: string;
  updatedAt: string;
}
