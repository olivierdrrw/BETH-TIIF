"use client";

import { useEffect, useState } from "react";
import { ImageOff, Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { VisionBoardForm } from "@/features/vision-board/vision-board-form";
import { VisionBoardRepository } from "@/features/vision-board/repositories/vision-board-repository";

interface VisionItem {
  id: string;
  title: string;
  imageUrl?: string;
  createdAt: string;
}

export default function VisionBoardPage() {
  const user = useAuthStore((state) => state.user);
  const [items, setItems] = useState<VisionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    if (!user?.uid) return;
    setIsLoading(true);
    const data = await VisionBoardRepository.getUserItems(user.uid);
    setItems(data as VisionItem[]);
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, [user?.uid]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Vision Board</h1>
        <p className="mt-1 text-slate-400">Picture the future you're building toward.</p>
      </div>

      {user?.uid && <VisionBoardForm userId={user.uid} onAdded={load} />}

      {isLoading ? (
        <div className="flex justify-center py-12 text-slate-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-slate-500">
          Your vision board is empty — add your first dream above.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-32 w-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <div className="flex h-32 w-full items-center justify-center bg-white/[0.02] text-slate-600">
                  <ImageOff size={20} />
                </div>
              )}
              <p className="p-3 text-sm text-slate-200">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
