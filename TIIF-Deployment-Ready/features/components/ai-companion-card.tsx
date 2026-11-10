"use client";

export function AICompanionCard() {
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
      <p className="text-xs text-zinc-400">
        AI Companion
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        Human Twin Aware AI
      </h2>

      <p className="mt-4 text-zinc-400">
        Reflect. Grow.
        Understand yourself.
      </p>
    </div>
  );
}