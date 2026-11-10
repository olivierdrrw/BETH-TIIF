"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { uploadAvatar } from "@/features/avatar/services/upload-avatar";
import { updateUserProfile } from "@/repositories/user-repository";

interface AvatarUploaderProps {
  currentUrl?: string;
  onUploaded?: (url: string) => void;
}

export function AvatarUploader({ currentUrl, onUploaded }: AvatarUploaderProps) {
  const user = useAuthStore((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(currentUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user?.uid) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setError(null);
    setIsUploading(true);
    setPreview(URL.createObjectURL(file));

    try {
      const url = await uploadAvatar(user.uid, file);
      await updateUserProfile(user.uid, { avatarUrl: url });
      onUploaded?.(url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  const initial = (user?.email?.[0] ?? "T").toUpperCase();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="group relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy-500/20 text-2xl font-medium text-navy-300"
      >
        {preview ? (
          <img src={preview} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          initial
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
          {isUploading ? (
            <Loader2 size={18} className="animate-spin text-white" />
          ) : (
            <Camera size={18} className="text-white" />
          )}
        </div>
      </button>

      <div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5"
        >
          Change photo
        </button>
        {error && <p className="mt-1.5 text-xs text-rose-300">{error}</p>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
