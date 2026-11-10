import type { CompanionAvatar } from "../types/companion-avatar.type";

export interface AvatarCreationInput {
  userId: string;
  displayName: string;
  avatarType: CompanionAvatar["avatarType"];
  personalityStyle: CompanionAvatar["personalityStyle"];
  photoDataUrl?: string;
  voiceId?: string;
}

export interface AvatarCreationResult {
  imageUrl?: string;
  modelUrl?: string;
}

export interface AvatarPreviewResult {
  previewUrl: string;
}

/**
 * Abstraction over whatever actually generates/hosts avatar imagery.
 * Swap LocalAvatarProvider for a real provider later without touching
 * any of the UI or repository code that depends on this interface.
 */
export interface AvatarProvider {
  createAvatar(input: AvatarCreationInput): Promise<AvatarCreationResult>;
  generatePreview(input: AvatarCreationInput): Promise<AvatarPreviewResult>;
}
