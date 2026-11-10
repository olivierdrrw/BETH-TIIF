"use client";

import { Lightbulb, ArrowRight } from "lucide-react";
import { DashboardCard } from "@/components/ui/dashboard-card";

const RECOMMENDATIONS = [
  "Schedule a 10 minute reflection session before bedtime.",
  "Reach out to one person in your Trusted Circle this week.",
  "Revisit your Growth goals and mark today's progress.",
];

export function AIRecommendations() {
  return (
    <DashboardCard className="space-y-4">
      <div className="flex items-center gap-3">
        <Lightbulb className="text-navy-400" size={18} />
        <h3 className="font-semibold text-white">Recommendations</h3>
      </div>

      <div className="space-y-3">
        {RECOMMENDATIONS.map((item) => (
          <div
            key={item}
            className="flex items-start gap-2 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-sm text-slate-300"
          >
            <ArrowRight size={14} className="mt-0.5 shrink-0 text-navy-400" />
            {item}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

export default AIRecommendations;
