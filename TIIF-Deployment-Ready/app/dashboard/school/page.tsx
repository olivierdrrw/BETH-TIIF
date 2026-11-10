"use client";

const COHORTS = [
  { name: "Senior 6 — Science", score: 82 },
  { name: "Senior 5 — Arts", score: 69 },
  { name: "Senior 4 — General", score: 74 },
];

export default function SchoolDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">School Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">
        An aggregate view of student wellbeing across your school.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Students enrolled</p>
          <p className="mt-2 text-3xl font-bold">1,240</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Avg. wellness score</p>
          <p className="mt-2 text-3xl font-bold text-navy-400">78%</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Cohorts needing support</p>
          <p className="mt-2 text-3xl font-bold">14</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-card p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Cohort wellbeing
        </p>
        <div className="mt-4 space-y-3">
          {COHORTS.map((c) => (
            <div key={c.name} className="flex items-center justify-between text-sm">
              <span className="text-slate-300">{c.name}</span>
              <span className={c.score >= 75 ? "text-success-400" : "text-navy-300"}>
                {c.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
