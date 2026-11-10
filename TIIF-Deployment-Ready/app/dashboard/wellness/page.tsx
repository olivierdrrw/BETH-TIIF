"use client";

import { useState } from "react";
import { Smile, Moon, Droplet, Dumbbell, Wind, HeartPulse } from "lucide-react";

import { SleepTracker } from "@/features/wellness/components/sleep-tracker";
import { WaterTracker } from "@/features/wellness/components/water-tracker";
import { ExerciseTracker } from "@/features/wellness/components/exercise-tracker";
import { BreathingExercise } from "@/features/wellness/components/breathing-exercise";
import { MoodForm } from "@/features/mood/mood-form";
import { MeditationCard } from "@/features/meditation/components/meditation-card";

const TABS = [
  { id: "mood", label: "Mood & Stress", icon: Smile },
  { id: "sleep", label: "Sleep", icon: Moon },
  { id: "water", label: "Water", icon: Droplet },
  { id: "exercise", label: "Exercise", icon: Dumbbell },
  { id: "breathing", label: "Breathing", icon: Wind },
  { id: "meditation", label: "Meditation", icon: HeartPulse },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function WellnessPage() {
  const [tab, setTab] = useState<TabId>("mood");

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Wellness Hub</h1>
        <p className="mt-1 text-slate-400">Everything to support your day-to-day wellbeing.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition ${
                tab === t.id
                  ? "bg-navy-500 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div>
        {tab === "mood" && <MoodForm />}
        {tab === "sleep" && <SleepTracker />}
        {tab === "water" && <WaterTracker />}
        {tab === "exercise" && <ExerciseTracker />}
        {tab === "breathing" && <BreathingExercise />}
        {tab === "meditation" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <MeditationCard title="Calm Mind" duration={10} />
            <MeditationCard title="Deep Focus" duration={15} />
            <MeditationCard title="Evening Wind Down" duration={12} />
            <MeditationCard title="Morning Clarity" duration={8} />
          </div>
        )}
      </div>
    </div>
  );
}
