"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AdminRoute } from "@/features/auth/components/admin-route";
import { auth } from "@/lib/firebase/auth";

interface RetentionMetrics {
  d1: number;
  d7: number;
  d30: number;
  totalUsers: number;
  sampleLimited: boolean;
}

export default function RetentionPage() {
  return <AdminRoute><RetentionContent /></AdminRoute>;
}

function RetentionContent() {
  const [metrics, setMetrics] = useState<RetentionMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Please sign in again.");
        const token = await user.getIdToken();
        const response = await fetch("/api/admin/retention", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Unable to calculate retention metrics.");
        const data = await response.json() as RetentionMetrics;
        if (!cancelled) setMetrics(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to calculate retention metrics.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Retention</h1>
        <p className="mt-1 text-slate-400">Return activity in the 24-hour window after each signup milestone. {metrics ? `${metrics.totalUsers} profiles included.` : ""}</p>
      </div>
      {error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</p>}
      {isLoading ? (
        <div className="flex justify-center py-12 text-slate-500"><Loader2 className="animate-spin" /></div>
      ) : metrics ? (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Day 1", value: metrics.d1 },
              { label: "Day 7", value: metrics.d7 },
              { label: "Day 30", value: metrics.d30 },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 text-center">
                <p className="text-3xl font-bold text-white">{item.value}%</p>
                <p className="mt-1 text-sm text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
          {metrics.sampleLimited && <p className="text-xs text-amber-300">The report reached its configured sample limit. Treat these figures as a sample until a scheduled, scalable aggregation pipeline is deployed.</p>}
        </>
      ) : null}
      <p className="text-xs text-slate-500">Retention is calculated from journal and mood activity in the exact 24-hour window following each milestone, not from later activity.</p>
    </div>
  );
}
