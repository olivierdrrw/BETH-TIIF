"use client";

import * as React from "react";
import { BrainCircuit, Activity } from "lucide-react";
import { motion } from "framer-motion";

export function HumanTwinPanel() {
  // Mock State (In Phase 10 we will use the hook and real data)
  const twin = {
    growthLevel: 74,
    traits: [
      { label: "Self Awareness", value: 82, color: "from-navy-500 to-navy-400" },
      { label: "Emotional Stability", value: 65, color: "from-navy-500 to-navy-400" },
      { label: "Confidence", value: 70, color: "from-navy-500 to-navy-400" },
      { label: "Discipline", value: 60, color: "from-navy-500 to-navy-400" },
      { label: "Social Connection", value: 88, color: "from-navy-500 to-navy-300" },
      { label: "Resilience", value: 76, color: "from-navy-500 to-navy-400" },
    ]
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl">
      
      {/* HEADER WITH LIVING ORB */}
      <div className="relative p-8 border-b border-white/10 overflow-hidden bg-gradient-to-b from-navy-900/20 to-transparent">
        {/* Background Glows */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-navy-600/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-navy-600/20 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <BrainCircuit className="w-7 h-7 text-navy-400" />
              Human Twin™
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-sm">
              Your living identity model. As you reflect and grow, your Twin evolves in real-time.
            </p>
          </div>

          {/* Core Growth Level indicator */}
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Overall Growth</span>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {twin.growthLevel}
              </span>
              <span className="text-xl text-gray-500">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* TRAITS GRAPHIC AREA */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Traits List */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-gray-400" />
            Identity Traits Map
          </h3>
          
          {twin.traits.map((trait, i) => (
            <div key={i} className="space-y-2 group">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 group-hover:text-white transition-colors">{trait.label}</span>
                <span className="font-medium text-white">{trait.value}%</span>
              </div>

              <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.value}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                  className={`h-full bg-gradient-to-r ${trait.color} rounded-full relative`}
                >
                  {/* Highlight effect on the bar */}
                  <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-[2px]" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Abstract Insight Card (AI Connection) */}
        <div className="flex flex-col justify-center">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 relative overflow-hidden group hover:bg-white/[0.04] transition-all duration-500">
            {/* The Living Orb Representation */}
            <div className="w-32 h-32 mx-auto mb-6 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-navy-600/30 to-navy-600/30 blur-xl animate-pulse" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-navy-500 to-navy-500 shadow-[0_0_30px_rgba(38, 61, 112,0.5)] border border-white/20" />
            </div>

            <h4 className="text-center text-white font-medium mb-2">AI Insight</h4>
            <p className="text-center text-sm text-gray-400 leading-relaxed">
              Your <span className="text-navy-400">Social Connection</span> is exceptionally high right now, but your <span className="text-navy-400">Discipline</span> needs some attention. Focus on building small routines today.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}