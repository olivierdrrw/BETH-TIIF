"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Pencil } from "lucide-react";
import { motion } from "framer-motion";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { getCompanionAvatar } from "@/repositories/companion/companion-avatar-repository";
import type { CompanionAvatar } from "@/features/companion-avatar/types/companion-avatar.type";

export function AICompanionHeader() {
  const user = useAuthStore((state) => state.user);
  const [avatar, setAvatar] = useState<CompanionAvatar | null>(null);

  useEffect(() => {
    if (!user?.uid) return;
    getCompanionAvatar(user.uid).then(setAvatar);
  }, [user?.uid]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-navy-500/30 bg-navy-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-navy-400">
        <Sparkles size={12} />
        Human Twin™ Intelligence
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-navy-300" />
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {avatar?.displayName ?? "AI Companion"}
        </h1>

        <Link
          href="/dashboard/ai-companion/create"
          className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/5"
        >
          <Pencil size={12} />
          {avatar ? "Edit Companion" : "Create your Companion"}
        </Link>
      </div>

      <p className="max-w-2xl text-slate-400">
        {avatar
          ? `Your personal AI companion — ${avatar.personalityStyle}, and growing with you.`
          : "A trusted guide that helps you reflect, understand patterns, and support your growth journey."}
      </p>
    </motion.div>
  );
}
