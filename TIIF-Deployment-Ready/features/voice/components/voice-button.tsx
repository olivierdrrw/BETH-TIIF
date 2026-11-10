"use client";

import { Mic } from "lucide-react";

export function VoiceButton({ onStart }: { onStart: () => void }) {
  return (
    <button
      onClick={onStart}
      className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-500 text-white shadow-lg shadow-navy-500/30 transition hover:bg-navy-400"
    >
      <Mic size={24} />
    </button>
  );
}
