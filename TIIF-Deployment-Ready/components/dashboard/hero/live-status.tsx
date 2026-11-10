"use client";

export default function LiveStatus() {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      rounded-2xl
      border
      border-navy-500/20
      bg-navy-500/5
      px-5
      py-3
    "
    >
      <span className="relative flex h-3 w-3">

        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy-400 opacity-75" />

        <span className="relative inline-flex h-3 w-3 rounded-full bg-navy-400" />

      </span>

      <span className="text-sm font-medium">
        LIVE
      </span>

    </div>
  );
}