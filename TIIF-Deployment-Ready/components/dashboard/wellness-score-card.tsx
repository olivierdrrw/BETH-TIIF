"use client";

import { useEffect, useState } from "react";

export function WellnessScoreCard({ score = 84 }: { score?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1100;

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(score * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 text-center">
      <h3 className="text-lg font-semibold">National Wellness Score</h3>

      <div className="relative mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(var(--navy-400) ${display}%, transparent ${display}% 100%)`,
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 8px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 8px))",
          }}
        />
        <div className="absolute inset-0 rounded-full border-8 border-white/5" />
        <span className="relative text-4xl font-bold">{display}%</span>
      </div>
    </div>
  );
}
