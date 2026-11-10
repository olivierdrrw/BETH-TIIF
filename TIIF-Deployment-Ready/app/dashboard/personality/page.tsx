"use client";

import { useEffect, useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { PersonalityRepository } from "@/features/personality/repositories/personality-repository";
import { PERSONALITY_QUESTIONS } from "@/features/personality/data/personality-questions";
import {
  calculatePersonalityProfile,
  TRAIT_LABELS,
  TRAIT_DESCRIPTIONS,
} from "@/lib/personality/personality-engine";
import type { PersonalityProfile, PersonalityTrait } from "@/features/personality/types/personality";

const LIKERT = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" },
];

export default function PersonalityPage() {
  const user = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState<PersonalityProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user?.uid) return;
    PersonalityRepository.get(user.uid).then((data) => {
      setProfile(data);
      setIsLoading(false);
    });
  }, [user?.uid]);

  async function handleAnswer(value: number) {
    const question = PERSONALITY_QUESTIONS[step];
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);

    if (step + 1 < PERSONALITY_QUESTIONS.length) {
      setStep(step + 1);
      return;
    }

    const result = calculatePersonalityProfile(nextAnswers);
    if (user?.uid) await PersonalityRepository.save(user.uid, result);
    setProfile(result);
  }

  function retake() {
    setAnswers({});
    setStep(0);
    setProfile(null);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-24 text-slate-500">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (profile) {
    const traits = Object.keys(TRAIT_LABELS) as PersonalityTrait[];

    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Personality</h1>
            <p className="mt-1 text-slate-400">Your Big Five personality profile.</p>
          </div>
          <button
            onClick={retake}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5"
          >
            <RotateCcw size={14} /> Retake
          </button>
        </div>

        <div className="space-y-5">
          {traits.map((trait) => (
            <div key={trait} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">{TRAIT_LABELS[trait]}</h3>
                <span className="text-xl font-bold text-navy-300">{profile[trait]}%</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{TRAIT_DESCRIPTIONS[trait]}</p>
              <div className="mt-3 h-2 rounded-full bg-white/5">
                <div
                  style={{ width: `${profile[trait]}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-navy-400 to-navy-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const question = PERSONALITY_QUESTIONS[step];

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Personality</h1>
        <p className="mt-1 text-slate-400">A quick Big Five self-assessment.</p>
      </div>

      <p className="text-sm text-slate-400">
        Statement {step + 1} of {PERSONALITY_QUESTIONS.length}
      </p>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-navy-400 to-navy-400 transition-all duration-500"
          style={{ width: `${((step + 1) / PERSONALITY_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
        <p className="text-lg font-medium text-white">{question.statement}</p>

        <div className="mt-6 space-y-2">
          {LIKERT.map((opt) => (
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
