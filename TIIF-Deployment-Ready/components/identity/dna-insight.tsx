"use client";

import { Sparkles } from "lucide-react";

export default function DNAInsight() {
  return (
    <div className="rounded-3xl border border-navy-500/20 bg-navy-500/5 p-6">

      <div className="flex items-center gap-3">

        <Sparkles className="text-navy-400" />

        <h3 className="font-semibold">
          Identity Insight
        </h3>

      </div>

      <p className="mt-4 leading-8 text-slate-300">

        Your Human Twin detected stronger
        alignment between your daily habits,
        emotional wellbeing and long-term purpose.

      </p>

    </div>
  );
}