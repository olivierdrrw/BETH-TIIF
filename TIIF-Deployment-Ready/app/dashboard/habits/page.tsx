"use client";

import { useEffect, useState } from "react";
import { Flame, Check, Plus, Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { HabitRepository } from "@/features/habits/repositories/habit-repository";
import type { Habit } from "@/features/habits/types/habit";

function isCheckedToday(habit: Habit) {
  if (!habit.lastCheckedAt) return false;
  return new Date(habit.lastCheckedAt).toDateString() === new Date().toDateString();
}

export default function HabitsPage() {
  const user = useAuthStore((state) => state.user);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  async function load() {
    if (!user?.uid) return;
    setIsLoading(true);
    const data = await HabitRepository.getByUser(user.uid);
    setHabits(data);
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, [user?.uid]);

  async function handleCreate() {
    if (!newTitle.trim() || !user?.uid || isCreating) return;
    setIsCreating(true);
    await HabitRepository.create(user.uid, newTitle.trim());
    setNewTitle("");
    setIsCreating(false);
    load();
  }

  async function handleCheckIn(habit: Habit) {
    const { streak } = await HabitRepository.checkIn(habit);
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habit.id ? { ...h, streak, lastCheckedAt: new Date().toISOString() } : h
      )
    );
  }

  const totalXP = habits.reduce((sum, h) => sum + h.streak * 10, 0);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Habits</h1>
          <p className="mt-1 text-slate-400">Small, repeated actions compound.</p>
        </div>
        <div className="rounded-2xl border border-navy-400/30 bg-navy-500/5 px-4 py-2 text-center">
          <p className="text-xl font-bold text-white">{totalXP}</p>
          <p className="text-xs text-slate-400">XP</p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          placeholder="Add a habit, e.g. Drink water"
          className="input"
        />
        <button
          onClick={handleCreate}
          disabled={isCreating}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-navy-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:opacity-50"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12 text-slate-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : habits.length === 0 ? (
        <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-slate-500">
          No habits yet — add your first one above.
        </p>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => {
            const done = isCheckedToday(habit);
            return (
              <div
                key={habit.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div>
                  <p className="text-white">{habit.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-navy-300">
                    <Flame size={12} /> {habit.streak} day streak
                  </p>
                </div>

                <button
                  onClick={() => handleCheckIn(habit)}
                  disabled={done}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                    done
                      ? "bg-navy-500/20 text-navy-300"
                      : "bg-white/5 text-slate-400 hover:bg-navy-500 hover:text-white"
                  }`}
                >
                  <Check size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
