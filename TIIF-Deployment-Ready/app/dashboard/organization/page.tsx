"use client";

const DEPARTMENTS = [
  { name: "Engineering", status: "Healthy" },
  { name: "Sales", status: "Monitor" },
];

export default function OrganizationDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Organization Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">
        Aggregate, anonymized wellbeing signals across your teams.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Employees</p>
          <p className="mt-2 text-3xl font-bold">340</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Team wellbeing</p>
          <p className="mt-2 text-3xl font-bold text-navy-400">71%</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Burnout risk flagged</p>
          <p className="mt-2 text-3xl font-bold">12%</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-card p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Departments
        </p>
        <div className="mt-4 space-y-3">
          {DEPARTMENTS.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-sm">
              <span className="text-slate-300">{d.name}</span>
              <span className={d.status === "Healthy" ? "text-success-400" : "text-navy-300"}>
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        All figures are aggregated and anonymized — no individual employee's data is
        ever visible to an organization admin.
      </p>
    </div>
  );
}
