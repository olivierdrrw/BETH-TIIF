"use client";

import { cn } from "@/lib/utils";
import type { CalendarEvent } from "../types/calendar-event";

interface MonthGridProps {
  year: number;
  month: number; // 0-11
  events: CalendarEvent[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const TYPE_DOT: Record<CalendarEvent["type"], string> = {
  event: "bg-navy-400",
  goal: "bg-navy-400",
  journal: "bg-navy-400",
  session: "bg-navy-400",
};

function toISODate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function MonthGrid({ year, month, events, selectedDate, onSelectDate }: MonthGridProps) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayISO = new Date().toISOString().slice(0, 10);

  const eventsByDate = events.reduce<Record<string, CalendarEvent[]>>((acc, e) => {
    (acc[e.date] ??= []).push(e);
    return acc;
  }, {});

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="pb-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;

          const iso = toISODate(year, month, day);
          const dayEvents = eventsByDate[iso] ?? [];
          const isToday = iso === todayISO;
          const isSelected = iso === selectedDate;

          return (
            <button
              key={iso}
              onClick={() => onSelectDate(iso)}
              className={cn(
                "flex h-16 flex-col items-center gap-1 rounded-xl border p-1.5 transition",
                isSelected
                  ? "border-navy-400/50 bg-navy-500/10"
                  : "border-white/5 hover:border-white/15",
                isToday && !isSelected && "border-white/20"
              )}
            >
              <span className={cn("text-sm", isToday ? "font-semibold text-navy-300" : "text-slate-300")}>
                {day}
              </span>
              <div className="flex gap-0.5">
                {dayEvents.slice(0, 3).map((e) => (
                  <span key={e.id} className={cn("h-1.5 w-1.5 rounded-full", TYPE_DOT[e.type])} />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
