import {
  TimelineEvent,
} from "@/features/timeline/timeline-event";

export function TimelineCard({
  event,
}: {
  event: TimelineEvent;
}) {

  return (

    <div
      className="
      border-l
      border-navy-500
      pl-5
      py-4
      "
    >

      <h4>
        {event.title}
      </h4>

      <p
        className="
        text-zinc-400
        text-sm
        "
      >
        {event.description}
      </p>

    </div>
  );
}