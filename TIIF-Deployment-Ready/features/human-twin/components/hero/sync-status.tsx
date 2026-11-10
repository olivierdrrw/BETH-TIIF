"use client";

export default function SyncStatus() {
  return (
    <div className="flex items-center gap-2">

      <span className="relative flex h-3 w-3">

        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy-400 opacity-75" />

        <span className="relative inline-flex h-3 w-3 rounded-full bg-navy-400" />

      </span>

      <span className="text-sm text-navy-400">

        Live Sync

      </span>

    </div>
  );
}