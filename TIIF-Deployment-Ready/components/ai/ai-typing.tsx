"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const dotTransition = (delay: number) => ({
  animate: { y: [0, -6, 0] },
  transition: { duration: 0.9, repeat: Infinity, delay, ease: "easeInOut" as const },
});

export function AIWriting() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
      <Sparkles size={16} className="text-navy-400" />

      <span className="text-sm text-slate-400">Your AI Companion is reflecting</span>

      <div className="flex items-end gap-1">
        {[0, 0.15, 0.3].map((delay) => (
          <motion.span
            key={delay}
            {...dotTransition(delay)}
            className="h-1.5 w-1.5 rounded-full bg-navy-400"
          />
        ))}
      </div>
    </div>
  );
}

// Kept as a named alias since some earlier drafts imported this as AITyping.
export const AITyping = AIWriting;

export default AIWriting;
