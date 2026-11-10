"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
} from "firebase/firestore";
import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useHumanTwin } from "@/hooks/use-human-twin";
import { calculateImpactScore } from "@/lib/impact/calculate-impact-score";

interface ImpactSnapshot {
  userId: string;
  identity: number;
  growth: number;
  wellbeing: number;
  resilience: number;
  createdAt: string;
}

export default function ImpactPage() {
  const user = useAuthStore((state) => state.user);
  const twin = useHumanTwin();
  const [previous, setPrevious] = useState<ImpactSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    async function run() {
      const snapshot = await getDocs(
        query(
          collection(db, COLLECTIONS.IMPACT_SNAPSHOTS),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(1)
        )
      );

      if (!snapshot.empty) {
        setPrevious(snapshot.docs[0].data() as ImpactSnapshot);
      }

      // Record today's snapshot for next time's comparison.
      await addDoc(collection(db, COLLECTIONS.IMPACT_SNAPSHOTS), {
        userId: user.uid,
        identity: twin.identity,
        growth: twin.growth,
        wellbeing: twin.wellbeing,
        resilience: twin.resilience,
        createdAt: new Date().toISOString(),
      });

      setIsLoading(false);
    }

    run();
  }, [user?.uid]);

  const impactScore = previous
    ? calculateImpactScore({
        wellbeingChange: twin.wellbeing - previous.wellbeing,
        identityChange: twin.identity - previous.identity,
        purposeChange: twin.growth - previous.growth,
        resilienceChange: twin.resilience - previous.resilience,
        relationshipChange: 0,
        growthChange: twin.growth - previous.growth,
      })
    : null;

  const TrendIcon =
    impactScore === null ? Minus : impactScore > 0 ? TrendingUp : impactScore < 0 ? TrendingDown : Minus;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Impact</h1>
        <p className="mt-1 text-slate-400">How much you've grown since your last visit.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24 text-slate-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <TrendIcon
            size={32}
            className={`mx-auto ${
              impactScore === null
                ? "text-slate-500"
                : impactScore > 0
                ? "text-navy-400"
                : impactScore < 0
                ? "text-rose-400"
                : "text-slate-400"
            }`}
          />

          <p className="mt-4 text-5xl font-bold text-white">
            {impactScore === null ? "—" : `${impactScore > 0 ? "+" : ""}${impactScore}`}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            {impactScore === null
              ? "This is your first visit — check back after your next session for a comparison."
              : "Impact Score since your last check-in"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Identity", value: twin.identity },
          { label: "Growth", value: twin.growth },
          { label: "Wellbeing", value: twin.wellbeing },
          { label: "Resilience", value: twin.resilience },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
            <p className="text-xl font-semibold text-white">{m.value}</p>
            <p className="text-xs text-slate-500">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
