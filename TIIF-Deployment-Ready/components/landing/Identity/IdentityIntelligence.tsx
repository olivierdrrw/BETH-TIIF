"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Fingerprint,
  Compass,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Identity Mapping™",
    description:
      "Discover your values, strengths, beliefs, personality, and growth opportunities.",
  },
  {
    icon: Brain,
    title: "Trauma-Informed Intelligence",
    description:
      "Understand how life experiences influence emotions, decisions, and relationships.",
  },
  {
    icon: Compass,
    title: "Purpose Discovery",
    description:
      "Gain clarity about your direction, purpose, and long-term personal development.",
  },
  {
    icon: Sparkles,
    title: "AI Personal Insights",
    description:
      "Receive personalized recommendations powered by your Human Twin™ and AI Companion.",
  },
];

export function IdentityIntelligence() {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold">
            Identity Intelligence™
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
            TIIF goes beyond mental wellness by helping people understand who
            they are, where they are today, and who they can become.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * .12 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 dark:bg-slate-800"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-100 dark:bg-navy-900">
                  <Icon
                    size={30}
                    className="text-navy-600 dark:text-navy-300"
                  />
                </div>

                <h3 className="mb-4 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}