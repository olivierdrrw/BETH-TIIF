import Link from "next/link";
import { HeartCrack, Brain, Wind, ArrowRight } from "lucide-react";

const SCREENERS = [
  {
    href: "/dashboard/assessment/trauma",
    icon: HeartCrack,
    title: "Trauma-Informed Assessment",
    description: "A baseline across identity, resilience, belonging, and purpose.",
    time: "6 questions · 3 min",
  },
  {
    href: "/dashboard/assessment/phq9",
    icon: Brain,
    title: "PHQ-9 Depression Screening",
    description: "A standard clinical screener for depressive symptoms.",
    time: "9 questions · 4 min",
  },
  {
    href: "/dashboard/assessment/gad7",
    icon: Wind,
    title: "GAD-7 Anxiety Screening",
    description: "A standard clinical screener for anxiety symptoms.",
    time: "7 questions · 3 min",
  },
];

export default function AssessmentHubPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Assessments</h1>
        <p className="mt-1 text-slate-400">
          Choose an assessment to check in with yourself.
        </p>
      </div>

      <div className="space-y-4">
        {SCREENERS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-navy-400/30 hover:bg-navy-500/5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-500/10">
              <s.icon size={20} className="text-navy-300" />
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{s.description}</p>
              <p className="mt-2 text-xs text-slate-500">{s.time}</p>
            </div>

            <ArrowRight size={18} className="shrink-0 text-slate-600" />
          </Link>
        ))}
      </div>
    </div>
  );
}
