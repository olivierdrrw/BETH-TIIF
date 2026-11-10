"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function AnimatedStats() {
  const stats = [
    { label: "Data Points Analyzed Daily", value: "2.4M+", color: "text-navy-400" },
    { label: "Growth Scoring Accuracy", value: "98.5%", color: "text-navy-400" },
    { label: "Emergency Interventions", value: "10k+", color: "text-navy-400" },
    { label: "Therapist Hours Saved", value: "50k+", color: "text-navy-400" }
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-[#050505] relative overflow-hidden">
      {/* Background visual */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors"
            >
              <h4 className={`text-4xl md:text-5xl font-bold tracking-tight mb-2 ${stat.color} drop-shadow-lg`}>
                {stat.value}
              </h4>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}