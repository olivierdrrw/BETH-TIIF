"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AdminRoute } from "@/features/auth/components/admin-route";
import { auth } from "@/lib/firebase/auth";

interface EvidenceMetrics {
  users: number;
  journalEntries: number;
  assessments: number;
  recommendCount: number;
  feedbackCount: number;
}

export default function EvidencePage() {
  return <AdminRoute><EvidenceContent /></AdminRoute>;
}

function EvidenceContent() {
  const [stats, setStats] = useState<EvidenceMetrics>({
    users: 0, journalEntries: 0, assessments: 0, recommendCount: 0, feedbackCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Please sign in again.");
        const token = await user.getIdToken();
        const response = await fetch("/api/admin/evidence", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Unable to load evidence metrics.");
        const data = await response.json() as EvidenceMetrics;
        if (!cancelled) setStats(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load evidence metrics.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void load();
    return () => { cancelled = true; };
  }, []);

  const recommendRate = stats.feedbackCount > 0
    ? Math.round((stats.recommendCount / stats.feedbackCount) * 100)
    : null;
  const metrics = [
    { label: "People using TIIF", value: stats.users },
    { label: "Journal entries", value: stats.journalEntries },
    { label: "Assessments completed", value: stats.assessments },
    { label: "Would recommend", value: recommendRate === null ? "—" : `${recommendRate}%` },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Evidence &amp; Impact</h1>
        <p className="mt-1 text-slate-400">Aggregated platform metrics. Individual journal and assessment content is not exposed.</p>
      </div>
      {error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</p>}
      {isLoading ? (
        <div className="flex justify-center py-12 text-slate-500"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-3xl font-bold text-white">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
