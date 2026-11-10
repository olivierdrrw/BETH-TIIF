"use client";

import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { getUserProfile } from "@/repositories/user-repository";
import { JournalRepository } from "@/features/journal/journal-repository";
import { GoalRepository } from "@/features/goals/repositories/goal-repository";
import { HabitRepository } from "@/features/habits/repositories/habit-repository";
import { MoodRepository } from "@/features/mood/mood-repository";
import { calculateTotalXP, levelForXP } from "@/lib/gamification/xp-engine";

export function useUserXP() {
  const user = useAuthStore((state) => state.user);
  const [xp, setXP] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    Promise.all([
      JournalRepository.getByUser(user.uid),
      GoalRepository.getUserGoals(user.uid),
      HabitRepository.getByUser(user.uid),
      MoodRepository.getByUser(user.uid),
      getUserProfile(user.uid),
    ]).then(([journals, goals, habits, moods, profile]) => {
      const total = calculateTotalXP({
        journalEntries: journals.length,
        goalsCompleted: (goals as any[]).filter((g) => g.status === "completed").length,
        habitStreakDays: habits.reduce((sum, h) => sum + h.streak, 0),
        moodCheckIns: moods.length,
        assessmentsCompleted: 0,
      });
      setXP(total);
      setIsLoading(false);

      if (profile?.showOnLeaderboard) {
        const displayName =
          [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "Anonymous";

        setDoc(doc(db, COLLECTIONS.LEADERBOARD, user.uid), {
          displayName,
          xp: total,
          level: levelForXP(total).name,
          updatedAt: new Date().toISOString(),
        }).catch(() => {});
      }
    });
  }, [user?.uid]);

  return { xp, level: levelForXP(xp), isLoading };
}
