"use client";

import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
  steps: string[];
}

export function WizardProgress({ currentStep, steps }: WizardProgressProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step} className="flex items-center gap-4">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                isComplete
                  ? "border-navy-400 bg-navy-400/20 text-navy-300"
                  : isActive
                  ? "border-navy-400 text-navy-300"
                  : "border-white/10 text-slate-500"
              }`}
            >
              {isComplete ? (
                <Check size={16} />
              ) : (
                <span className="text-xs">{index + 1}</span>
              )}
            </div>

            <p
              className={`text-lg transition-colors duration-500 ${
                isActive
                  ? "text-white"
                  : isComplete
                  ? "text-slate-300"
                  : "text-slate-600"
              }`}
            >
              {step}
            </p>

            {isActive && (
              <span className="h-2 w-2 animate-pulse rounded-full bg-navy-400" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default WizardProgress;
