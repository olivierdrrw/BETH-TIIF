"use client";

import { useEffect, useState } from "react";
import { Landmark, MapPin } from "lucide-react";

import { getNationalDashboard } from "@/services/dashboard/get-national-dashboard";
import type { Region } from "@/types/region";

export default function NationalDashboardPage() {
  const [data, setData] = useState<{
    regions: Region[];
    nationalWellness: number;
    nationalRisk: number;
    totalRegions: number;
  } | null>(null);

  useEffect(() => {
    getNationalDashboard().then(setData);
  }, []);

  const regions = data?.regions ?? [];

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-500/10 text-navy-400">
          <Landmark size={18} />
        </div>
        <h1 className="text-2xl font-bold">National Dashboard</h1>
      </div>
      <p className="mt-2 max-w-xl text-sm text-slate-400">
        A regional view of aggregate wellbeing, for policy and public-health planning.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Regions reporting</p>
          <p className="mt-2 text-3xl font-bold">{data?.totalRegions ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">National wellness index</p>
          <p className="mt-2 text-3xl font-bold text-navy-400">
            {data?.nationalWellness ?? 0}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">National risk index</p>
          <p className="mt-2 text-3xl font-bold">{data?.nationalRisk ?? 0}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-card p-5">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          By region
        </p>

        {regions.length === 0 ? (
          <p className="text-sm text-slate-500">
            No regional data reported yet.
          </p>
        ) : (
          <div className="space-y-3">
            {regions.map((region) => (
              <div
                key={region.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-500/10 text-navy-400">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{region.name}</p>
                    <p className="text-xs text-slate-500">
                      {region.province} · {region.population.toLocaleString()} people
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="text-navy-300">{region.wellnessScore} wellness</p>
                  <p className="text-xs text-slate-500">{region.riskScore} risk</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Figures shown are regional aggregates only — TIIF never exposes an identifiable
        individual's data at this level, and no single person can be singled out from
        these numbers.
      </p>
    </div>
  );
}
