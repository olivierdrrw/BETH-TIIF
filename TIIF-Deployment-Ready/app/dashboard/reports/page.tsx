"use client";

import { useEffect, useState } from "react";
import { Download, Printer, FileText, Target, Smile, Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { JournalRepository } from "@/features/journal/journal-repository";
import { GoalRepository } from "@/features/goals/repositories/goal-repository";
import { MoodRepository } from "@/features/mood/mood-repository";
import { exportToCSV, exportToPDF } from "@/lib/reports/export-csv";
import type { JournalEntry } from "@/features/journal/types/journal-entry";
import type { Goal } from "@/features/goals/types/goal";
import type { MoodEntry } from "@/features/mood/types/mood-entry";

export default function ReportsPage() {
  const user = useAuthStore((state) => state.user);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    Promise.all([
      JournalRepository.getByUser(user.uid),
      GoalRepository.getUserGoals(user.uid),
      MoodRepository.getByUser(user.uid),
    ]).then(([j, g, m]) => {
      setJournals(j);
      setGoals(g as Goal[]);
      setMoods(m as MoodEntry[]);
      setIsLoading(false);
    });
  }, [user?.uid]);

  const reports = [
    {
      icon: FileText,
      title: "Journal Entries",
      count: journals.length,
      onExport: () =>
        exportToCSV(
          "journal-entries",
          journals.map((j) => ({
            date: j.createdAt,
            title: j.title,
            mood: j.mood,
            content: j.content,
          }))
        ),
    },
    {
      icon: Target,
      title: "Goals",
      count: goals.length,
      onExport: () =>
        exportToCSV(
          "goals",
          goals.map((g) => ({
            title: g.title,
            category: g.category,
            status: g.status,
            progress: g.progress,
            createdAt: g.createdAt,
          }))
        ),
    },
    {
      icon: Smile,
      title: "Mood Check-ins",
      count: moods.length,
      onExport: () =>
        exportToCSV(
          "mood-checkins",
          moods.map((m) => ({
            date: m.createdAt,
            mood: m.mood,
            energy: m.energy,
            stress: m.stress,
          }))
        ),
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="no-print flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="mt-1 text-slate-400">Export your data as CSV, or print a full PDF summary.</p>
        </div>

        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
        >
          <Printer size={14} /> Print / PDF
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12 text-slate-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="no-print space-y-3">
          {reports.map((r) => (
            <div
              key={r.title}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="flex items-center gap-3">
                <r.icon size={18} className="text-navy-300" />
                <div>
                  <p className="font-medium text-white">{r.title}</p>
                  <p className="text-xs text-slate-500">{r.count} records</p>
                </div>
              </div>

              <button
                onClick={r.onExport}
                disabled={r.count === 0}
                className="flex items-center gap-2 rounded-xl bg-navy-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download size={14} /> CSV
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Printable summary — only visible when printing */}
      <div className="print-only space-y-6 text-black">
        <h1 className="text-2xl font-bold">TIIF — Personal Report</h1>
        <p>Generated {new Date().toLocaleDateString()}</p>

        <h2 className="text-lg font-semibold">Goals ({goals.length})</h2>
        <ul>
          {goals.map((g) => (
            <li key={g.id}>
              {g.title} — {g.status} ({g.progress}%)
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold">Journal Entries ({journals.length})</h2>
        <ul>
          {journals.map((j) => (
            <li key={j.id}>
              {new Date(j.createdAt).toLocaleDateString()} — {j.title} ({j.mood})
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold">Mood Check-ins ({moods.length})</h2>
        <ul>
          {moods.map((m) => (
            <li key={m.id}>
              {new Date(m.createdAt).toLocaleDateString()} — {m.mood}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
