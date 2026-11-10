"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { saveScreenerResult } from "./screener-repository";

interface ScreenerFlowProps {
  screenerId: "phq9" | "gad7";
  title: string;
  questions: string[];
  options: { label: string; value: number }[];
  score: (answers: number[]) => { total: number; severity: string };
  maxScore: number;
}

const SEVERITY_COLOR: Record<string, string> = {
  minimal: "text-navy-300",
  mild: "text-navy-300",
  moderate: "text-navy-300",
  moderately_severe: "text-navy-300",
  severe: "text-rose-300",
};

export function ScreenerFlow({
  screenerId,
  title,
  questions,
  options,
  score,
  maxScore,
}: ScreenerFlowProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{ total: number; severity: string } | null>(null);

  async function handleAnswer(value: number) {
    const next = [...answers, value];
    setAnswers(next);

    if (step + 1 < questions.length) {
      setStep(step + 1);
      return;
    }

    const scored = score(next);
    setResult(scored);

    if (user?.uid) {
      await saveScreenerResult({
        userId: user.uid,
        screener: screenerId,
        total: scored.total,
        severity: scored.severity,
        createdAt: new Date().toISOString(),
      });
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-xl space-y-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
        <p className="text-sm uppercase tracking-wide text-slate-500">{title} result</p>

        <p className="text-5xl font-bold text-white">
          {result.total}
          <span className="text-lg text-slate-500"> / {maxScore}</span>
        </p>

        <p className={`text-lg font-medium capitalize ${SEVERITY_COLOR[result.severity]}`}>
          {result.severity.replace("_", " ")}
        </p>

        <p className="text-sm leading-6 text-slate-400">
          This screening tool can help you understand your symptoms, but it isn't a
          diagnosis. Consider sharing this result with a doctor or therapist,
          especially if your score is in the moderate-to-severe range.
        </p>

        <button
          onClick={() => router.push("/dashboard/assessment")}
          className="rounded-2xl bg-navy-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-navy-400"
        >
          Back to Assessments
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <p className="text-sm text-slate-400">
        Question {step + 1} of {questions.length}
      </p>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-navy-400 to-navy-400 transition-all duration-500"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
        <p className="text-sm text-slate-500">Over the last 2 weeks, how often have you been bothered by:</p>
        <p className="mt-3 text-lg font-medium text-white">{questions[step]}</p>

        <div className="mt-6 space-y-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-navy-400/50 hover:bg-navy-500/5 hover:text-white"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
