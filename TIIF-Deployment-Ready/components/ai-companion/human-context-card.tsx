"use client";

import { Fingerprint } from "lucide-react";
import { motion } from "framer-motion";
import { useHumanTwin } from "@/hooks/use-human-twin";

export function HumanContextCard() {
  const { identity, growth, wellbeing, resilience } = useHumanTwin();

  const rows = [
    { label: "Identity", value: identity },
    { label: "Growth", value: growth },
    { label: "Wellbeing", value: wellbeing },
    { label: "Resilience", value: resilience },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-500/10 text-navy-400">
          <Fingerprint size={16} />
        </div>
        <h3 className="font-semibold text-white">Human Twin Context</h3>
      </div>

      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">{row.label}</span>
              <span className="font-medium text-white">{row.value}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-navy-600 to-navy-400 transition-all duration-700"
                style={{ width: `${row.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
