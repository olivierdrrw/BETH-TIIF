"use client";

export function AICopilot() {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-6
      backdrop-blur-xl
    "
    >
      <h3 className="text-xl font-semibold">
        AI Copilot
      </h3>

      <div className="mt-6 space-y-3">

        <button className="w-full rounded-2xl border border-white/10 p-4 text-left">
          What changed this month?
        </button>

        <button className="w-full rounded-2xl border border-white/10 p-4 text-left">
          Which domain needs support?
        </button>

        <button className="w-full rounded-2xl border border-white/10 p-4 text-left">
          Show growth insights
        </button>

      </div>
    </div>
  );
}