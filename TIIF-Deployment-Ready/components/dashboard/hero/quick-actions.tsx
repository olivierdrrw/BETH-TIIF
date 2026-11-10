"use client";

import {
  Brain,
  BookOpen,
  HeartPulse,
  Target,
} from "lucide-react";

import { PremiumButton } from "@/components/ui/premium-button";

const actions = [
  {
    icon: Brain,
    label: "Open Human Twin",
  },
  {
    icon: BookOpen,
    label: "Journal",
  },
  {
    icon: HeartPulse,
    label: "Meditation",
  },
  {
    icon: Target,
    label: "Today's Goal",
  },
];

export default function QuickActions() {
  return (
    <div>
      <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
        Quick Actions
      </h4>

      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <PremiumButton
              key={action.label}
              variant="secondary"
              className="justify-start gap-3"
            >
              <Icon className="h-5 w-5" />

              {action.label}
            </PremiumButton>
          );
        })}
      </div>
    </div>
  );
}