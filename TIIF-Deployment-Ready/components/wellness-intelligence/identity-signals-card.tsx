"use client";

import { useHumanTwin } from "@/hooks/use-human-twin";

export function IdentitySignalsCard() {
  const { identity } = useHumanTwin();

  const signals = [
    identity >= 70 ? "Strong self-awareness trend" : "Self-awareness is still developing",
    identity >= 50 ? "Identity clarity holding steady" : "Identity clarity could use attention",
    "Keep reflecting to sharpen this signal",
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-semibold text-white">Identity Signals</h3>
      <ul className="mt-4 space-y-3 text-sm text-slate-400">
        {signals.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </div>
  );
}
