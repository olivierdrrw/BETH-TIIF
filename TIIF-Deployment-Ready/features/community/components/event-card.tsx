"use client";

import { useState } from "react";
import { Calendar, Users } from "lucide-react";
import type { CommunityEvent } from "../types/event";
import { rsvpEvent } from "../repositories/community-repository";

export function EventCard({ event }: { event: CommunityEvent }) {
  const [attending, setAttending] = useState(false);
  const [count, setCount] = useState(event.attendeeCount);

  async function handleRsvp() {
    if (attending) return;
    setAttending(true);
    setCount((c) => c + 1);
    await rsvpEvent(event.id);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-500/10 text-navy-400">
          <Calendar size={15} />
        </div>
        <div>
          <h4 className="font-medium text-white">{event.title}</h4>
          <p className="text-xs text-slate-500">{event.date}</p>
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-400">{event.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Users size={13} />
          {count} attending
        </div>
        <button
          onClick={handleRsvp}
          disabled={attending}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            attending
              ? "bg-success-500/10 text-success-400"
              : "bg-navy-500/10 text-navy-300 hover:bg-navy-500/20"
          }`}
        >
          {attending ? "Going" : "RSVP"}
        </button>
      </div>
    </div>
  );
}
