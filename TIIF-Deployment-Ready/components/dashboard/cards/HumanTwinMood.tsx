"use client";

import { Smile, Meh, CloudRain, Sun, Wind } from "lucide-react";
import { useHumanTwin } from "@/hooks/use-human-twin";

const MOOD_STYLES: Record<
  string,
  { icon: typeof Smile; color: string; bg: string }
> = {
  Calm: { icon: Wind, color: "text-navy-300", bg: "bg-navy-500/10" },
  Happy: { icon: Sun, color: "text-navy-300", bg: "bg-navy-500/10" },
  Content: { icon: Smile, color: "text-navy-300", bg: "bg-navy-500/10" },
  Neutral: { icon: Meh, color: "text-slate-300", bg: "bg-slate-500/10" },
  Stressed: { icon: CloudRain, color: "text-rose-300", bg: "bg-rose-500/10" },
};

export function HumanTwinMood() {
  const { emotionalState } = useHumanTwin();
  const style = MOOD_STYLES[emotionalState] ?? MOOD_STYLES.Neutral;
  const Icon = style.icon;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${style.bg}`}>
        <Icon size={18} className={style.color} />
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Current Mood
        </p>
        <p className="text-base font-medium text-white">{emotionalState}</p>
      </div>
    </div>
  );
}

export default HumanTwinMood;
