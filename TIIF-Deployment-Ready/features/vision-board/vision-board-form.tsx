"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { VisionBoardRepository } from "@/features/vision-board/repositories/vision-board-repository";

export function VisionBoardForm({
  userId,
  onAdded,
}: {
  userId: string;
  onAdded?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function save() {
    if (!title.trim() || isSaving) return;
    setIsSaving(true);

    await VisionBoardRepository.create({
      userId,
      title: title.trim(),
      imageUrl: imageUrl.trim(),
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setImageUrl("");
    setIsSaving(false);
    onAdded?.();
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          placeholder="What do you want to manifest?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <input
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="input"
        />
      </div>

      <button
        onClick={save}
        disabled={!title.trim() || isSaving}
        className="mt-4 flex items-center gap-2 rounded-xl bg-navy-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:opacity-50"
      >
        {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
        Add to vision board
      </button>
    </div>
  );
}
