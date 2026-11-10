"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Mic, Users2, BrainCircuit } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "A companion that remembers",
    description:
      "Your AI Companion draws on your journal, goals, and Human Twin to respond with real context — not a blank slate every time.",
  },
  {
    icon: Users2,
    title: "Seventeen specialized agents",
    description:
      "Switch between a coach, a mentor, a career advisor, or a supportive listener — whichever fits what you need right now.",
  },
  {
    icon: Mic,
    title: "Talk, don't just type",
    description:
      "Speak your reflections out loud and hear responses back, for moments when typing feels like too much.",
  },
  {
    icon: BrainCircuit,
    title: "Never a replacement for people",
    description:
      "The AI Companion is built to strengthen your real support system, not substitute for it — every crisis signal routes toward a human, not away from one.",
  },
];

export function AICompanion() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl font-bold">Meet Your TIIF Companion</h2>

        <p className="mt-6 max-w-3xl text-zinc-500 dark:text-zinc-400">
          A personal AI companion designed to grow with you, understand your journey, and
          help you reflect, focus, and move forward.
        </p>

        <Link
          href="/dashboard/ai-companion/create"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-navy-500 px-6 py-3 font-semibold text-white transition hover:bg-navy-400"
        >
          Create My Companion
        </Link>
      </motion.div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.02]"
          >
            <feature.icon className="text-navy-500 dark:text-navy-400" size={28} />
            <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
