"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { MonthGrid } from "@/features/calendar/components/month-grid";
import { CalendarRepository } from "@/features/calendar/repositories/calendar-repository";
import { GoalRepository } from "@/features/goals/repositories/goal-repository";
import { JournalRepository } from "@/features/journal/journal-repository";
import type { CalendarEvent } from "@/features/calendar/types/calendar-event";
import type { Goal } from "@/features/goals/types/goal";

export default function CalendarPage() {
  const user = useAuthStore((state) => state.user);
  const today = new Date();

  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [customEvents, setCustomEvents] = useState<CalendarEvent[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [journalDates, setJournalDates] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(
    today.toISOString().slice(0, 10)
  );
  const [newTitle, setNewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    if (!user?.uid) return;
    setIsLoading(true);

    const [events, userGoals, journals] = await Promise.all([
      CalendarRepository.getByUser(user.uid),
      GoalRepository.getUserGoals(user.uid),
      JournalRepository.getByUser(user.uid),
    ]);

    setCustomEvents(events);
    setGoals((userGoals as Goal[]).filter((g) => g.targetDate));
    setJournalDates(
      journals.map((j) => ({
        id: `journal-${j.id}`,
        userId: user.uid,
        title: j.title,
        date: j.createdAt.slice(0, 10),
        type: "journal" as const,
      }))
    );
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, [user?.uid]);

  const goalEvents: CalendarEvent[] = goals.map((g) => ({
    id: `goal-${g.id}`,
    userId: user?.uid ?? "",
    title: g.title,
    date: g.targetDate,
    type: "goal",
  }));

  const allEvents = useMemo(
    () => [...customEvents, ...goalEvents, ...journalDates],
    [customEvents, goalEvents, journalDates]
  );

  const selectedEvents = allEvents.filter((e) => e.date === selectedDate);

  async function handleAddEvent() {
    if (!newTitle.trim() || !selectedDate || !user?.uid) return;
    await CalendarRepository.create({
      userId: user.uid,
      title: newTitle.trim(),
      date: selectedDate,
      type: "event",
    });
    setNewTitle("");
    load();
  }

  async function handleDelete(id: string) {
    setCustomEvents((prev) => prev.filter((e) => e.id !== id));
    await CalendarRepository.remove(id);
  }

  function changeMonth(delta: number) {
    setCursor((c) => {
      const d = new Date(c.year, c.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  const monthLabel = new Date(cursor.year, cursor.month).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Calendar</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => changeMonth(-1)} className="rounded-lg border border-white/10 p-2 text-slate-400 hover:bg-white/5">
              <ChevronLeft size={16} />
            </button>
            <span className="w-36 text-center text-sm text-slate-300">{monthLabel}</span>
            <button onClick={() => changeMonth(1)} className="rounded-lg border border-white/10 p-2 text-slate-400 hover:bg-white/5">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12 text-slate-500">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <MonthGrid
            year={cursor.year}
            month={cursor.month}
            events={allEvents}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        )}

        <div className="mt-4 flex gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-navy-400" /> Events</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-navy-400" /> Goal deadlines</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-navy-400" /> Journal entries</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          {selectedDate}
        </h3>

        <div className="flex gap-2">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddEvent()}
            placeholder="Add an event..."
            className="input"
          />
          <button
            onClick={handleAddEvent}
            className="shrink-0 rounded-xl bg-navy-500 p-2.5 text-white transition hover:bg-navy-400"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="space-y-2">
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-slate-500">Nothing scheduled.</p>
          ) : (
            selectedEvents.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm"
              >
                <div>
                  <p className="text-slate-200">{e.title}</p>
                  <p className="text-xs capitalize text-slate-500">{e.type}</p>
                </div>
                {e.type === "event" && (
                  <button onClick={() => handleDelete(e.id)} className="text-slate-600 hover:text-rose-400">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
