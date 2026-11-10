"use client";

import { useEffect, useState } from "react";
import { Download, Plus, FlaskConical } from "lucide-react";

import { getResearchDashboard } from "@/services/research/get-research-dashboard";
import { exportResearchData } from "@/services/research/export-research";
import {
  getResearchStudies,
  createResearchStudy,
} from "@/repositories/research-repository";
import type { ResearchStudy } from "@/types/research";

const CATEGORIES: ResearchStudy["category"][] = [
  "wellness",
  "risk",
  "education",
  "population",
];

export default function ResearchDashboardPage() {
  const [summary, setSummary] = useState<{
    totalStudies: number;
    activeStudies: number;
    completedStudies: number;
  } | null>(null);
  const [studies, setStudies] = useState<ResearchStudy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ResearchStudy["category"]>("wellness");
  const [isSaving, setIsSaving] = useState(false);

  async function load() {
    const [dashboard, allStudies] = await Promise.all([
      getResearchDashboard(),
      getResearchStudies(),
    ]);
    setSummary(dashboard);
    setStudies(allStudies);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate() {
    if (!title.trim()) return;
    setIsSaving(true);

    const now = new Date().toISOString();
    await createResearchStudy({
      title: title.trim(),
      description: description.trim(),
      category,
      participants: 0,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    });

    setTitle("");
    setDescription("");
    setShowForm(false);
    setIsSaving(false);
    await load();
  }

  function handleExport() {
    const json = exportResearchData(studies);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tiif-research-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Research Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Anonymous, aggregate studies on wellbeing patterns.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
          >
            <Download size={14} /> Export
          </button>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 rounded-xl bg-navy-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-400"
          >
            <Plus size={14} /> New Study
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Total studies</p>
          <p className="mt-2 text-3xl font-bold">{summary?.totalStudies ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Active</p>
          <p className="mt-2 text-3xl font-bold text-navy-400">
            {summary?.activeStudies ?? 0}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Completed</p>
          <p className="mt-2 text-3xl font-bold text-success-400">
            {summary?.completedStudies ?? 0}
          </p>
        </div>
      </div>

      {showForm && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-card p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Study title"
              className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-slate-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ResearchStudy["category"])}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this study looking at?"
            rows={2}
            className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-slate-500"
          />
          <button
            onClick={handleCreate}
            disabled={isSaving}
            className="mt-3 rounded-xl bg-navy-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-400 disabled:opacity-60"
          >
            {isSaving ? "Creating…" : "Create study"}
          </button>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-white/10 bg-card p-5">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Studies
        </p>

        {studies.length === 0 ? (
          <p className="text-sm text-slate-500">No studies yet.</p>
        ) : (
          <div className="space-y-3">
            {studies.map((study) => (
              <div
                key={study.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-500/10 text-navy-400">
                    <FlaskConical size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{study.title}</p>
                    <p className="text-xs text-slate-500">
                      {study.category} · {study.participants} participants
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    study.status === "completed"
                      ? "bg-success-500/10 text-success-400"
                      : study.status === "active"
                        ? "bg-navy-500/10 text-navy-300"
                        : "bg-white/5 text-slate-400"
                  }`}
                >
                  {study.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-slate-500">
        All research data is aggregated and anonymized — individual journal entries and
        conversations are never included.
      </p>
    </div>
  );
}
