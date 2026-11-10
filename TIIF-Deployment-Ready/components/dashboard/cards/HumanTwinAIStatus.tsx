"use client";

import { Sparkles } from "lucide-react";
import { useHumanTwin } from "@/hooks/use-human-twin";

export function HumanTwinAIStatus() {
  const { aiConfidence } = useHumanTwin();

  const statusLabel =
    aiConfidence >= 90
      ? "AI understands you well"
      : aiConfidence >= 70
      ? "AI is learning your patterns"
      : "AI is still getting to know you";

  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-500/10">
          <Sparkles size={18} className="text-navy-300" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            AI Companion
          </p>
          <p className="text-base font-medium text-white">{statusLabel}</p>
        </div>
      </div>

      <span className="text-sm font-semibold text-navy-300">
        {aiConfidence}%
      </span>
    </div>
  );
}

export default HumanTwinAIStatus;
