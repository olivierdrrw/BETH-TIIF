"use client";

export default function AIConfidence() {
  return (
    <div
      className="
      rounded-3xl
      border
      border-navy-500/15
      bg-navy-500/5
      p-6
    "
    >
      <div className="flex justify-between">

        <span className="text-slate-400">
          AI Confidence
        </span>

        <span className="font-bold text-navy-400">
          97%
        </span>

      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">

        <div
          className="
          h-full
          w-[97%]
          rounded-full
          bg-gradient-to-r
          from-navy-400
          to-navy-500
        "
        />

      </div>

    </div>
  );
}