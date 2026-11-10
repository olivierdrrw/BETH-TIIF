"use client";

import { Briefcase } from "lucide-react";

import { useExecutiveIntelligence } from "@/hooks/use-executive-intelligence";

export default function ExecutiveDashboardPage() {
  const { data, isLoading } = useExecutiveIntelligence();

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-500/10 text-navy-400">
          <Briefcase size={18} />
        </div>
        <h1 className="text-2xl font-bold">Executive Dashboard</h1>
      </div>
      <p className="mt-2 max-w-xl text-sm text-slate-400">
        A platform-wide snapshot for leadership — usage, scale, and where things are headed.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Total users</p>
          <p className="mt-2 text-3xl font-bold">
            {isLoading ? "…" : (data?.totalUsers ?? 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">AI sessions</p>
          <p className="mt-2 text-3xl font-bold text-navy-400">
            {isLoading ? "…" : (data?.aiSessions ?? 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Human Twins created</p>
          <p className="mt-2 text-3xl font-bold">
            {isLoading ? "…" : (data?.totalHumanTwins ?? 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Schools onboard</p>
          <p className="mt-2 text-3xl font-bold">{isLoading ? "…" : data?.totalSchools ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Institutions onboard</p>
          <p className="mt-2 text-3xl font-bold">
            {isLoading ? "…" : data?.totalInstitutions ?? 0}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Dominant emotion, platform-wide</p>
          <p className="mt-2 text-3xl font-bold capitalize text-navy-400">
            {isLoading ? "…" : data?.dominantEmotion ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Average wellness score</p>
          <p className="mt-2 text-3xl font-bold text-success-400">
            {isLoading ? "…" : data?.averageWellnessScore ?? 0}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Users needing attention</p>
          <p className="mt-2 text-3xl font-bold">{isLoading ? "…" : data?.highRiskUsers ?? 0}</p>
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Platform-wide aggregates only — never an individual user's private data.
      </p>
    </div>
  );
}
