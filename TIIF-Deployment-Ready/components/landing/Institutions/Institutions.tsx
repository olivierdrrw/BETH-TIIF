"use client";

import { motion } from "framer-motion";
import {
  School,
  Building2,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

const institutions = [
  {
    icon: School,
    title: "Schools & Universities",
    description:
      "Support students with wellbeing insights, identity development, and growth tracking.",
  },
  {
    icon: HeartHandshake,
    title: "Therapists",
    description:
      "Access client progress, wellbeing indicators, and Human Twin™ insights.",
  },
  {
    icon: Building2,
    title: "Organizations",
    description:
      "Improve employee wellbeing, resilience, productivity, and engagement.",
  },
  {
    icon: ShieldCheck,
    title: "Government & NGOs",
    description:
      "Measure community wellbeing and create evidence-based impact programs.",
  },
];

export function Institutions() {
  return (
    <section className="bg-white py-24 dark:bg-background">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-bold">
            Built for Every Institution
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
            TIIF empowers educational institutions, therapists,
            organizations, NGOs, and governments with actionable wellbeing
            intelligence.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {institutions.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-100 dark:bg-navy-900">
                  <Icon className="text-navy-600 dark:text-navy-300" size={28} />
                </div>

                <h3 className="mb-4 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}