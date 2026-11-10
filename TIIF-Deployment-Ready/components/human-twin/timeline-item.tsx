"use client";

import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp } from "lucide-react";
import { StatusPill } from "@/components/dashboard/ui/status-pill";

interface TimelineItemProps {
  title: string;
  date: string;
  reflection: string;
  growth: string;
}

export default function TimelineItem({
  title,
  date,
  reflection,
  growth,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative ml-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      {/* Timeline Dot */}
      <div className="absolute -left-[42px] top-8 flex h-8 w-8 items-center justify-center rounded-full bg-navy-500 shadow-[0_0_25px_rgba(93, 133, 209,.5)]">
        <BrainCircuit size={16} className="text-white" />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-navy-400">
            {date}
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            {title}
          </h3>
        </div>

        <StatusPill>Recorded</StatusPill>
      </div>

      <p className="mt-5 leading-8 text-slate-400">
        {reflection}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-500/10 px-4 py-2 text-sm text-navy-400">
        <TrendingUp size={16} />
        {growth}
      </div>
    </motion.div>
  );
}