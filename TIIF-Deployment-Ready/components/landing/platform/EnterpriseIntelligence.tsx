"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Globe, GraduationCap, Users, ShieldAlert } from "lucide-react";

export function EnterpriseIntelligence() {
  const insights = [
    { name: "National Wellness Index™", icon: Globe, val: "94%", color: "text-navy-400", border: "border-navy-500/20" },
    { name: "School Wellbeing Analytics™", icon: GraduationCap, val: "A+", color: "text-navy-400", border: "border-navy-500/20" },
    { name: "Community Growth Trends™", icon: Users, val: "+12%", color: "text-navy-400", border: "border-navy-500/20" },
    { name: "Risk Detection Insights™", icon: ShieldAlert, val: "Active", color: "text-red-400", border: "border-red-500/20" },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-navy-600/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-navy-400">
              Enterprise Intelligence™
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl mb-6 leading-tight">
              Insights beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                individuals.
              </span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-400">
              Schools, NGOs, institutions, and governments can access aggregated wellbeing insights, growth indicators, and population-level trends without compromising individual privacy.
            </p>
          </motion.div>

          {/* RIGHT UI MOCKUP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-2xl"
          >
            <div className="space-y-4">
              {insights.map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between rounded-2xl border bg-black/40 p-5 hover:bg-white/[0.05] transition-colors ${item.border}`}>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white/5">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="font-medium text-gray-200">{item.name}</span>
                  </div>
                  <span className={`font-bold ${item.color}`}>{item.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}