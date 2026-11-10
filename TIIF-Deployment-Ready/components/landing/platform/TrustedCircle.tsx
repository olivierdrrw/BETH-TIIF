"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Heart, Activity } from "lucide-react";

export function TrustedCircle() {
  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Crisis Support Layer™
          </h2>
          <p className="text-lg text-gray-400">
            Safety is built into the core of the OS. When emotional thresholds cross into critical territory, TIIF instantly triggers your Trusted Circle and professional emergency support.
          </p>
        </motion.div>

        {/* Visual Graph of Connection */}
        <div className="relative h-[400px] flex items-center justify-center max-w-4xl mx-auto">
          
          {/* Connection Lines (Background) */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="#ef4444" strokeWidth="3" />
          </svg>

          {/* Central User Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <Heart className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-white text-sm font-semibold mt-3">You</p>
          </div>

          {/* Therapist Node (Top Left) */}
          <div className="absolute top-[20%] left-[15%]">
            <div className="w-16 h-16 rounded-full bg-navy-500/20 border border-navy-500/50 flex items-center justify-center">
              <Activity className="w-6 h-6 text-navy-400" />
            </div>
            <p className="text-gray-400 text-xs font-medium mt-2">Clinical Therapist</p>
          </div>

          {/* Family/Mentor Node (Top Right) */}
          <div className="absolute top-[20%] right-[15%]">
            <div className="w-16 h-16 rounded-full bg-navy-500/20 border border-navy-500/50 flex items-center justify-center">
              <Heart className="w-6 h-6 text-navy-400" />
            </div>
            <p className="text-gray-400 text-xs font-medium mt-2">Trusted Circle</p>
          </div>

          {/* Emergency SOS Node (Bottom Center) */}
          <div className="absolute bottom-[0%] left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
              <ShieldAlert className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 text-sm font-bold mt-3">Emergency Routing</p>
          </div>

        </div>
      </div>
    </section>
  );
}