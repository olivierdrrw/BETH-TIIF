"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import { useHumanTwin } from "@/hooks/use-human-twin";
import { generateFutureSelf } from "@/features/human-twin/services/future-self-engine";
import type { HumanTwinScoreSet } from "@/core/human-twin/score-engine";

const HORIZONS = [
  { label: "3 months", months: 3 },
  { label: "6 months", months: 6 },
  { label: "1 year", months: 12 },
];

const DOMAINS: { key: keyof ReturnType<typeof generateFutureSelf>; label: string }[] = [
  { key: "confidence", label: "Confidence" },
  { key: "purpose", label: "Purpose" },
  { key: "wellbeing", label: "Wellbeing" },
  { key: "relationships", label: "Relationships" },
  { key: "growth", label: "Growth" },
];

export default function FutureSelfPage() {
  const { identity, growth, wellbeing, resilience } = useHumanTwin();
  const [months, setMonths] = useState(6);

  const scores: HumanTwinScoreSet = {
    identityScore: identity,
    growthScore: growth,
    wellbeingScore: wellbeing,
    resilienceScore: resilience,
    purposeScore: growth,
    relationshipScore: wellbeing,
    impactScore: Math.round((identity + growth + wellbeing + resilience) / 4),
  };

  const current = {
    confidence: Math.round((identity + resilience) / 2),
    purpose: growth,
    wellbeing,
    relationships: wellbeing,
    growth,
  };

  const future = generateFutureSelf(scores, months);

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-500/10 text-navy-400">
          <Sparkles size={18} />
        </div>
        <h1 className="text-2xl font-bold">Future Self™</h1>
      </div>
      <p className="mt-2 max-w-xl text-sm text-slate-400">
        A projection of where you're headed if your current patterns continue — not a
        guarantee, just a mirror of your momentum.
      </p>

      <div className="mt-6 flex gap-2">
        {HORIZONS.map((h) => (
          <button
            key={h.months}
            onClick={() => setMonths(h.months)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              months === h.months
                ? "border-navy-400 bg-navy-500/10 text-navy-300"
                : "border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {h.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOMAINS.map((d) => {
          const from = current[d.key];
          const to = future[d.key];
          const delta = to - from;
          return (
            <div key={d.key} className="rounded-2xl border border-white/10 bg-card p-5">
              <p className="text-sm text-slate-400">{d.label}</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-bold">{to}%</span>
                <span
                  className={`mb-1 text-xs font-semibold ${
                    delta > 0 ? "text-success-400" : delta < 0 ? "text-rose-400" : "text-slate-500"
                  }`}
                >
                  {delta > 0 ? "+" : ""}
                  {delta}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-navy-600 to-navy-400"
                  style={{ width: `${to}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-slate-500">
        This projection updates as your real activity changes — it's a mirror of your
        current momentum, not a fixed prediction.
      </p>
    </div>
  );
}
