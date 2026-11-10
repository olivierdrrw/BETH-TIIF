"use client";

import { useEffect, useState } from "react";
import { Wind, Pause, Play } from "lucide-react";

type Phase = "inhale" | "hold" | "exhale";

const PHASE_DURATION: Record<Phase, number> = {
  inhale: 4000,
  hold: 4000,
  exhale: 6000,
};

const PHASE_LABEL: Record<Phase, string> = {
  inhale: "Breathe in",
  hold: "Hold",
  exhale: "Breathe out",
};

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setTimeout(() => {
      setPhase((prev) => {
        if (prev === "inhale") return "hold";
        if (prev === "hold") return "exhale";
        setCycles((c) => c + 1);
        return "inhale";
      });
    }, PHASE_DURATION[phase]);

    return () => clearTimeout(timer);
  }, [isActive, phase]);

  const scale = phase === "inhale" ? 1.4 : phase === "exhale" ? 1 : 1.4;
  const duration = PHASE_DURATION[phase] / 1000;

  return (
    <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.02] p-10">
      <div className="relative flex h-56 w-56 items-center justify-center">
        <div
          style={{
            transform: `scale(${scale})`,
            transitionDuration: `${duration}s`,
          }}
          className="absolute h-40 w-40 rounded-full bg-gradient-to-br from-navy-400/30 to-navy-400/30 transition-transform ease-in-out"
        />
        <div
          style={{
            transform: `scale(${scale})`,
            transitionDuration: `${duration}s`,
          }}
          className="absolute h-28 w-28 rounded-full bg-gradient-to-br from-navy-400/50 to-navy-400/50 transition-transform ease-in-out"
        />

        <div className="relative z-10 text-center">
          <p className="text-lg font-medium text-white">
            {isActive ? PHASE_LABEL[phase] : "Ready?"}
          </p>
          {isActive && <p className="text-xs text-slate-400">Cycle {cycles + 1}</p>}
        </div>
      </div>

      <button
        onClick={() => {
          setIsActive((v) => !v);
          setPhase("inhale");
        }}
        className="mt-8 flex items-center gap-2 rounded-xl bg-navy-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-navy-400"
      >
        {isActive ? <Pause size={14} /> : <Play size={14} />}
        {isActive ? "Stop" : "Start breathing exercise"}
      </button>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
        <Wind size={12} /> 4-4-6 breathing — inhale, hold, exhale
      </p>
    </div>
  );
}
