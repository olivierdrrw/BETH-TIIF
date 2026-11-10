import type {
  AvatarProvider,
  AvatarCreationInput,
  AvatarCreationResult,
  AvatarPreviewResult,
} from "./avatar-provider";

/**
 * Default provider — no external avatar-generation service required.
 * If the user uploaded a photo, that photo *is* the avatar image. If a
 * real generation provider (Ready Player Me, a custom pipeline, etc.)
 * is added later, implement AvatarProvider and swap it in without
 * touching the creation flow or repository.
 */
export class LocalAvatarProvider implements AvatarProvider {
  async createAvatar(input: AvatarCreationInput): Promise<AvatarCreationResult> {
    return {
      imageUrl: input.photoDataUrl,
    };
  }

  async generatePreview(input: AvatarCreationInput): Promise<AvatarPreviewResult> {
    return {
      previewUrl: input.photoDataUrl ?? "",
    };
  }
}

export const avatarProvider: AvatarProvider = new LocalAvatarProvider();
