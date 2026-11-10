"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { GoalRepository } from "../repositories/goal-repository";
import type { Goal } from "../types/goal";

const CATEGORIES: Goal["category"][] = [
  "health",
  "career",
  "finance",
  "relationship",
  "spirituality",
  "growth",
];

export function CreateGoalForm({ onCreated }: { onCreated?: () => void }) {
  const user = useAuthStore((state) => state.user);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Goal["category"]>("growth");
  const [isSaving, setIsSaving] = useState(false);

  async function handleCreate() {
    if (!title.trim() || !user?.uid || isSaving) return;

    setIsSaving(true);
    await GoalRepository.create({
      userId: user.uid,
      title: title.trim(),
      description: "",
      category,
      targetDate: "",
      progress: 0,
      status: "active",
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setIsSaving(false);
    onCreated?.();
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        placeholder="What do you want to work toward?"
        className="input"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-3 py-1.5 text-xs capitalize transition ${
                category === c
                  ? "bg-navy-500 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <button
          onClick={handleCreate}
          disabled={!title.trim() || isSaving}
          className="flex items-center gap-2 rounded-xl bg-navy-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          Add Goal
        </button>
      </div>
    </div>
  );
}
