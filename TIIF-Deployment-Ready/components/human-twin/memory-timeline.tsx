"use client";

const memories = [
  {
    title:
      "Completed Trauma Assessment",
    date: "2 weeks ago",
  },
  {
    title:
      "Purpose Score Increased",
    date: "1 week ago",
  },
  {
    title:
      "30 Day Journal Streak",
    date: "Today",
  },
];

export function MemoryTimeline() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        p-6
      "
    >
      <h3 className="text-xl font-semibold">
        Growth Timeline
      </h3>

      <div className="mt-6 space-y-6">
        {memories.map(
          (memory) => (
            <div
              key={memory.title}
            >
              <h4>
                {memory.title}
              </h4>

              <p
                className="
                  text-sm
                  text-zinc-500
                "
              >
                {memory.date}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}