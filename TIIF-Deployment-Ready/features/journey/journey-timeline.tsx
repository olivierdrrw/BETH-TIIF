"use client";

import { useJourneyStore }
from "@/features/journey/journey-store";

export function JourneyTimeline() {
  const { events } =
    useJourneyStore();

  return (
    <div className="space-y-6">

      {events.map((event) => (
        <div
          key={event.id}
          className="
            border-l
            border-white/10
            pl-6
          "
        >
          <h3 className="font-medium">
            {event.title}
          </h3>

          <p className="text-zinc-400">
            {event.description}
          </p>
        </div>
      ))}

    </div>
  );
}