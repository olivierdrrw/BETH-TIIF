"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Stethoscope, Heart } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    message:
      "A private space to understand yourself outside of grades and deadlines — before a hard semester becomes a crisis.",
  },
  {
    icon: Briefcase,
    title: "Young professionals",
    message:
      "Somewhere to process a demanding week and stay connected to what you actually value, not just what's urgent.",
  },
  {
    icon: Stethoscope,
    title: "Therapists",
    message:
      "A continuous, client-owned signal between sessions — so the 50 minutes you have together go further.",
  },
  {
    icon: Heart,
    title: "Anyone rebuilding after a hard chapter",
    message:
      "A trauma-informed pace, with no pressure to disclose anything before you're ready.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold">Who TIIF Is Built For</h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            TIIF is in early development, built around the real people it's
            designed to support first.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800"
            >
              <item.icon className="text-navy-500 dark:text-navy-400" size={24} />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm italic text-gray-600 dark:text-gray-300">
                {item.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
