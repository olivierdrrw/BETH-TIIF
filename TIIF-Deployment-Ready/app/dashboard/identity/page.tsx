"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { IdentityRepository } from "@/features/identity/repositories/identity-repository";
import { calculateIdentityScore } from "@/features/identity/services/identity-score-engine";
import { coreValues } from "@/features/identity/data/core-values";
import { strengths } from "@/features/identity/data/strengths";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

interface IdentityData {
  values: string[];
  strengths: string[];
  purpose: string;
  selfAwareness: number;
  valuesClarity: number;
  purposeClarity: number;
  decisionConfidence: number;
}

const DEFAULT_DATA: IdentityData = {
  values: [],
  strengths: [],
  purpose: "",
  selfAwareness: 50,
  valuesClarity: 50,
  purposeClarity: 50,
  decisionConfidence: 50,
};

function toggle(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((v) => v !== item) : [...list, item];
}

export default function IdentityPage() {
  const user = useAuthStore((state) => state.user);
  const [data, setData] = useState<IdentityData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    getDoc(doc(db, "identityProfiles", user.uid)).then((snap) => {
      if (snap.exists()) setData({ ...DEFAULT_DATA, ...snap.data() });
      setIsLoading(false);
    });
  }, [user?.uid]);

  const score = calculateIdentityScore({
    selfAwareness: data.selfAwareness,
    valuesClarity: data.values.length > 0 ? data.valuesClarity : 0,
    purposeClarity: data.purpose.trim() ? data.purposeClarity : 0,
    decisionConfidence: data.decisionConfidence,
  });

  async function handleSave() {
    if (!user?.uid) return;
    setIsSaving(true);
    await IdentityRepository.save(user.uid, { ...data, identityScore: score });
    setIsSaving(false);
    setSaved(true);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-24 text-slate-500">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Identity</h1>
          <p className="mt-1 text-slate-400">Map who you are and what matters to you.</p>
        </div>
        <div className="rounded-2xl border border-navy-400/30 bg-navy-500/5 px-4 py-2 text-center">
          <p className="text-2xl font-bold text-white">{score}</p>
          <p className="text-xs text-slate-400">Identity Score</p>
        </div>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Your core values
        </h2>
        <p className="mt-1 text-xs text-slate-500">Select up to 5.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {coreValues.map((v) => (
            <button
              key={v}
              onClick={() => {
                if (data.values.includes(v) || data.values.length < 5) {
                  setData((d) => ({ ...d, values: toggle(d.values, v) }));
                  setSaved(false);
                }
              }}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                data.values.includes(v)
                  ? "bg-navy-500 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Your strengths
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {strengths.map((s) => (
            <button
              key={s}
              onClick={() => {
                setData((d) => ({ ...d, strengths: toggle(d.strengths, s) }));
                setSaved(false);
              }}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                data.strengths.includes(s)
                  ? "bg-navy-500 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          What gives your life meaning?
        </h2>

        <textarea
          value={data.purpose}
          onChange={(e) => {
            setData((d) => ({ ...d, purpose: e.target.value }));
            setSaved(false);
          }}
          rows={4}
          placeholder="Write freely..."
          className="input mt-3 resize-none"
        />
      </section>

      <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Self-reflection
        </h2>

        {[
          { key: "selfAwareness" as const, label: "How self-aware do you feel?" },
          { key: "valuesClarity" as const, label: "How clear are your values to you?" },
          { key: "purposeClarity" as const, label: "How clear is your sense of purpose?" },
          { key: "decisionConfidence" as const, label: "How confident are you in your decisions?" },
        ].map((q) => (
          <div key={q.key}>
            <div className="flex justify-between text-sm text-slate-300">
              <span>{q.label}</span>
              <span className="text-slate-500">{data[q.key]}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={data[q.key]}
              onChange={(e) => {
                setData((d) => ({ ...d, [q.key]: Number(e.target.value) }));
                setSaved(false);
              }}
              className="mt-2 w-full accent-navy-500"
            />
          </div>
        ))}
      </section>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="flex items-center gap-2 rounded-2xl bg-navy-500 px-6 py-3 font-medium text-white transition hover:bg-navy-400 disabled:opacity-60"
      >
        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
        {saved ? "Saved" : "Save identity profile"}
      </button>
    </div>
  );
}
