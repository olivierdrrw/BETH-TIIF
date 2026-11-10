"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Heart,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "Identity Intelligence",
    description:
      "Understand your personality, strengths, values and growth opportunities.",
  },
  {
    icon: Heart,
    title: "Emotional Awareness",
    description:
      "Track emotions, resilience and wellbeing over time.",
  },
  {
    icon: Target,
    title: "Purpose & Goals",
    description:
      "Build meaningful goals with AI-powered guidance.",
  },
  {
    icon: Sparkles,
    title: "AI Personal Insights",
    description:
      "Receive recommendations generated from your Human Twin™.",
  },
];

export function HumanTwin() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-100 py-24 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
          >

            <span className="rounded-full bg-navy-100 px-4 py-2 text-sm font-semibold text-navy-700 dark:bg-navy-900 dark:text-navy-300">
              Core Technology
            </span>

            <h2 className="mt-6 text-5xl font-bold leading-tight">
              Meet Your
              <span className="block text-navy-600">
                Human Twin™
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              A living digital reflection of your identity,
              wellbeing, relationships, purpose, growth and
              future potential.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {features.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                  >
                    <Icon className="mb-4 text-navy-600" size={30} />

                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/dashboard"
                className="rounded-xl bg-navy-600 px-7 py-4 font-semibold text-white transition hover:bg-navy-500"
              >
                Explore Human Twin
              </Link>

              <Link
                href="/assessment"
                className="flex items-center gap-2 rounded-xl border px-7 py-4 font-semibold transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Take Assessment
                <ArrowRight size={18} />
              </Link>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >

            <div className="relative">

              <div className="absolute inset-0 animate-pulse rounded-full bg-navy-500/30 blur-3xl" />

              <div className="relative flex h-80 w-80 items-center justify-center rounded-full bg-gradient-to-br from-navy-500 via-navy-500 to-navy-400 shadow-2xl">

                <Brain
                  size={120}
                  className="text-white"
                />

              </div>

              <div className="absolute -left-6 top-8 rounded-xl bg-white p-4 shadow-xl dark:bg-slate-900">
                <p className="text-xs text-zinc-500">Identity Score</p>
                <p className="text-2xl font-bold">92%</p>
              </div>

              <div className="absolute -right-8 bottom-10 rounded-xl bg-white p-4 shadow-xl dark:bg-slate-900">
                <p className="text-xs text-zinc-500">Growth Score</p>
                <p className="text-2xl font-bold text-navy-600">+18%</p>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}