"use client";

export default function ParentDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Parent Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">
        A gentle window into your child's wellbeing journey.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Your child
          </p>
          <h3 className="mt-2 text-lg font-semibold">Olivier — Senior 5</h3>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-navy-600 to-navy-400" />
          </div>
          <p className="mt-2 text-xs text-slate-500">Wellness trending steady this month.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Recommended
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Family check-in this week</li>
            <li>Review sleep habits together</li>
          </ul>
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        TIIF shares general wellbeing trends only — never private journal entries or
        conversations. Your child's privacy stays protected.
      </p>
    </div>
  );
}
