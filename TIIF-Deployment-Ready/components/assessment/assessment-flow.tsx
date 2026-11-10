"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "./question-card";
import { AssessmentCard } from "./assessment-card";
import { calculateTraumaScore } from "@/lib/intelligence/assessment-engine";
import type { AssessmentResult } from "@/types/assessment-result";

interface Dimension {
  key: keyof Pick<
    AssessmentResult,
    | "emotionalRegulation"
    | "identityClarity"
    | "resilience"
    | "belonging"
    | "purpose"
    | "traumaImpact"
  >;
  question: string;
}

// Six dimensions of the Trauma-Informed Identity Framework baseline.
// Each is answered on a 1-5 scale and converted to a 0-100 score.
const DIMENSIONS: Dimension[] = [
  {
    key: "emotionalRegulation",
    question: "How well are you able to stay steady when emotions run high?",
  },
  {
    key: "identityClarity",
    question: "How clearly do you understand who you are and what you value?",
  },
  {
    key: "resilience",
    question: "How well do you bounce back after a difficult day?",
  },
  {
    key: "belonging",
    question: "How connected do you feel to the people around you?",
  },
  {
    key: "purpose",
    question: "How clear is your sense of purpose right now?",
  },
  {
    key: "traumaImpact",
    question: "How much do past difficult experiences affect your day-to-day life?",
  },
];

function toScore(answer: number): number {
  // 1-5 scale -> 0-100 scale
  return Math.round(((answer - 1) / 4) * 100);
}

export function AssessmentFlow() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const currentDimension = DIMENSIONS[stepIndex];
  const isLastStep = stepIndex === DIMENSIONS.length - 1;

  function handleSelect(value: number) {
    const nextAnswers = {
      ...answers,
      [currentDimension.key]: value,
    };
    setAnswers(nextAnswers);

    if (!isLastStep) {
      setStepIndex((i) => i + 1);
      return;
    }

    // Final question answered — compute the result.
    const rawAnswers = DIMENSIONS.map((d) => nextAnswers[d.key] ?? 1);
    const { riskLevel } = calculateTraumaScore(rawAnswers);

    const finalResult: AssessmentResult = {
      emotionalRegulation: toScore(nextAnswers.emotionalRegulation ?? 1),
      identityClarity: toScore(nextAnswers.identityClarity ?? 1),
      resilience: toScore(nextAnswers.resilience ?? 1),
      belonging: toScore(nextAnswers.belonging ?? 1),
      purpose: toScore(nextAnswers.purpose ?? 1),
      traumaImpact: toScore(nextAnswers.traumaImpact ?? 1),
      riskLevel,
      completedAt: new Date().toISOString(),
    };

    setResult(finalResult);
  }

  if (result) {
    const overall = Math.round(
      (result.emotionalRegulation +
        result.identityClarity +
        result.resilience +
        result.belonging +
        result.purpose) /
        5
    );

    return (
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <AssessmentCard score={overall} />

        <div className="grid grid-cols-2 gap-4">
          {DIMENSIONS.filter((d) => d.key !== "traumaImpact").map((d) => (
            <div
              key={d.key}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {d.key.replace(/([A-Z])/g, " $1")}
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {result[d.key as keyof AssessmentResult]}%
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/dashboard/human-twin")}
          className="w-full rounded-2xl bg-navy-500 px-6 py-3 font-medium text-white transition hover:bg-navy-400"
        >
          Continue to your Human Twin
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <p className="text-sm text-slate-400">
        Question {stepIndex + 1} of {DIMENSIONS.length}
      </p>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-navy-400 to-navy-400 transition-all duration-500"
          style={{
            width: `${((stepIndex + 1) / DIMENSIONS.length) * 100}%`,
          }}
        />
      </div>

      <QuestionCard
        question={currentDimension.question}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default AssessmentFlow;
