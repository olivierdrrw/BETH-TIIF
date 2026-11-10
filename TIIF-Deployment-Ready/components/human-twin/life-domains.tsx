"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Loader2, Save } from "lucide-react";

import { db } from "@/lib/firebase/firestore";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { calculateLifeDomainAverage } from "@/lib/life-domains/calculate-life-domain-score";
import type { LifeDomains as LifeDomainsType } from "@/lib/life-domains/life-domain.type";

const DEFAULT_DOMAINS: LifeDomainsType = {
  mental: 50,
  emotional: 50,
  identity: 50,
  relationships: 50,
  education: 50,
  career: 50,
  purpose: 50,
  physical: 50,
};

const LABELS: Record<keyof LifeDomainsType, string> = {
  mental: "Mental",
  emotional: "Emotional",
  identity: "Identity",
  relationships: "Relationships",
  education: "Education",
  career: "Career",
  purpose: "Purpose",
  physical: "Physical",
};

export function LifeDomains() {
  const user = useAuthStore((state) => state.user);
  const [domains, setDomains] = useState<LifeDomainsType>(DEFAULT_DOMAINS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    getDoc(doc(db, "lifeDomains", user.uid)).then((snap) => {
      if (snap.exists()) setDomains({ ...DEFAULT_DOMAINS, ...snap.data() });
      setIsLoading(false);
    });
  }, [user?.uid]);

  async function handleSave() {
    if (!user?.uid) return;
    setIsSaving(true);
    await setDoc(doc(db, "lifeDomains", user.uid), domains, { merge: true });
    setIsSaving(false);
  }

  const average = calculateLifeDomainAverage(domains);

  if (isLoading) {
    return (
      <div className="flex justify-center rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-slate-500">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Life Domains</h3>
        <span className="text-2xl font-bold text-navy-300">{average}%</span>
      </div>

      <div className="mt-6 space-y-4">
        {(Object.keys(domains) as (keyof LifeDomainsType)[]).map((key) => (
          <div key={key}>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">{LABELS[key]}</span>
              <span className="text-slate-500">{domains[key]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={domains[key]}
              onChange={(e) =>
                setDomains((d) => ({ ...d, [key]: Number(e.target.value) }))
              }
              className="mt-1.5 w-full accent-navy-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="mt-6 flex items-center gap-2 rounded-xl bg-navy-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:opacity-50"
      >
        {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        Save
      </button>
    </div>
  );
}

export default LifeDomains;
