"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { useHumanTwin } from "@/hooks/use-human-twin";
import { useUserXP } from "@/hooks/use-user-xp";
import { AchievementCard } from "@/features/achievements/components/achievement-card";
import { generateAchievements } from "@/features/achievements/services/achievement-engine";
import { JournalRepository } from "@/features/journal/journal-repository";
import { GoalRepository } from "@/features/goals/repositories/goal-repository";

export default function AchievementsPage() {
  const user = useAuthStore((state) => state.user);
  const twin = useHumanTwin();
  const { xp, level } = useUserXP();

  const [journalCount, setJournalCount] = useState(0);
  const [goalCount, setGoalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    Promise.all([
      JournalRepository.getByUser(user.uid),
      GoalRepository.getUserGoals(user.uid),
    ]).then(([journals, goals]) => {
      setJournalCount(journals.length);
      setGoalCount(goals.length);
      setIsLoading(false);
    });
  }, [user?.uid]);

  const impactScore = Math.round(
    (twin.identity + twin.growth + twin.wellbeing + twin.resilience) / 4
  );

  const achievements = generateAchievements(journalCount, goalCount, impactScore);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Achievements</h1>
          <p className="mt-1 text-slate-400">
            {unlockedCount} of {achievements.length} unlocked
          </p>
        </div>
        <div className="rounded-2xl border border-navy-400/30 bg-navy-500/5 px-4 py-2 text-center">
          <p className="text-xl font-bold text-white">{xp} XP</p>
          <p className="text-xs text-slate-400">{level.name}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12 text-slate-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      )}
    </div>
  );
}
