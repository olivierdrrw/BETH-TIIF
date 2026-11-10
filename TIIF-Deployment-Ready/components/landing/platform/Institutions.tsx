"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Building2, Landmark, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

export function Institutions() {
  const sectors = [
    {
      icon: GraduationCap,
      title: "Schools & Universities",
      desc: "Measure student wellbeing at scale. Identify cohorts needing support before crises occur.",
    },
    {
      icon: Landmark,
      title: "Government & NGOs",
      desc: "Track national mental health indexes and deploy policy-level wellbeing interventions based on real data.",
    },
    {
      icon: Building2,
      title: "Hospitals & Corporates",
      desc: "Integrate mental health tracking into physical care, or build resilient, burnout-free teams.",
    }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Enterprise scale. <br />
              <span className="text-gray-500">Human impact.</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              TIIF provides anonymized, aggregate insights to institutions. Leaders can finally measure the emotional pulse of their organizations and direct resources where they are needed most.
            </p>
            
            <div className="flex items-center gap-2 text-sm font-medium text-navy-400 bg-navy-400/10 border border-navy-400/20 px-4 py-2 rounded-full w-max mb-10">
              <ShieldCheck className="w-4 h-4" />
              100% HIPAA & GDPR Compliant
            </div>

            <button className="flex items-center gap-2 text-white font-semibold hover:text-navy-400 transition-colors group">
              View Enterprise Solutions 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* RIGHT: Sector Cards */}
          <motion.div 
            className="lg:col-span-7 grid gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {sectors.map((sector, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-6 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-navy-500/10 flex items-center justify-center shrink-0 border border-navy-500/20">
                  <sector.icon className="w-6 h-6 text-navy-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{sector.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{sector.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}