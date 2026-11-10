"use client";

import { BrainCircuit } from "lucide-react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { PredictionPill } from "./prediction-pill";
import { PredictionScore } from "./prediction-score";
import { PremiumButton } from "@/components/ui/premium-button";

export default function PredictionCard() {
  return (
    <DashboardCard className="space-y-8">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <BrainCircuit className="text-navy-400" />

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-navy-400">
              AI PREDICTION™
            </p>

            <h2 className="text-2xl font-semibold">
              Growth Forecast
            </h2>

          </div>

        </div>

        <PredictionPill
          label="High Confidence"
          variant="success"
        />

      </div>

      <PredictionScore
        title="Confidence"
        score={96}
      />

      <PredictionScore
        title="Growth Probability"
        score={91}
      />

      <PredictionScore
        title="Burnout Risk"
        score={18}
      />

      <div className="rounded-2xl bg-white/[0.03] p-5 border border-white/10">

        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
          AI Insight
        </p>

        <p className="mt-4 leading-8 text-slate-300">

          Based on your Human Twin activity,
          maintaining your current habits is
          expected to improve wellbeing by
          approximately <strong>6%</strong> over the next
          two weeks.

        </p>

      </div>

      <PremiumButton>

        View Full Prediction

      </PremiumButton>

    </DashboardCard>
  );
}