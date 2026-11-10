import { Tag } from "lucide-react";
import type { JournalEntry } from "../types/journal-entry";

const MOOD_COLOR: Record<JournalEntry["mood"], string> = {
  great: "text-navy-300 bg-navy-500/10",
  good: "text-navy-300 bg-navy-500/10",
  neutral: "text-slate-300 bg-slate-500/10",
  low: "text-navy-300 bg-navy-500/10",
  difficult: "text-rose-300 bg-rose-500/10",
};

export function JournalCard({ entry }: { entry: JournalEntry }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-white">{entry.title || "Untitled reflection"}</h4>
        <span className={`rounded-full px-2 py-0.5 text-xs ${MOOD_COLOR[entry.mood]}`}>
          {entry.mood}
        </span>
      </div>

      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
        {entry.content}
      </p>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
        {entry.tags?.length > 0 && (
          <span className="flex items-center gap-1">
            <Tag size={11} />
            {entry.tags.join(", ")}
          </span>
        )}
      </div>
    </div>
  );
}
