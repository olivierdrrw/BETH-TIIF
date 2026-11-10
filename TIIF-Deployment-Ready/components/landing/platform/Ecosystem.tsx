"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Users, HeartPulse, GraduationCap, 
  Building2, Globe, Church, Hospital, 
  Briefcase, Landmark, BrainCircuit, ArrowRight
} from "lucide-react";

// Inzego zose ziri muri TIIF Ecosystem n'ibisobanuro byazo
const ecosystemNodes = [
  { id: "youth", label: "Youth", icon: User, color: "text-navy-400", bg: "bg-navy-500/10", border: "hover:border-navy-500/50", desc: "Empowering the next generation with self-awareness, emotional resilience, and growth tools." },
  { id: "parents", label: "Parents", icon: Users, color: "text-navy-400", bg: "bg-navy-500/10", border: "hover:border-navy-500/50", desc: "Equipping parents with insights to understand and support their children's emotional journey." },
  { id: "therapists", label: "Therapists", icon: HeartPulse, color: "text-navy-400", bg: "bg-navy-500/10", border: "hover:border-navy-500/50", desc: "Providing clinical professionals with deep insights and continuous patient progress tracking." },
  { id: "schools", label: "Schools", icon: GraduationCap, color: "text-navy-400", bg: "bg-navy-500/10", border: "hover:border-navy-500/50", desc: "Creating mentally healthy environments and measuring student wellbeing at scale." },
  { id: "universities", label: "Universities", icon: Building2, color: "text-navy-400", bg: "bg-navy-500/10", border: "hover:border-navy-500/50", desc: "Supporting young adults through critical transitions with AI-guided emotional growth." },
  { id: "ngos", label: "NGOs", icon: Globe, color: "text-navy-400", bg: "bg-navy-500/10", border: "hover:border-navy-500/50", desc: "Scaling mental health interventions and measuring real community impact." },
  { id: "churches", label: "Churches", icon: Church, color: "text-navy-400", bg: "bg-navy-500/10", border: "hover:border-navy-500/50", desc: "Integrating faith-based support with measurable emotional and mental wellbeing." },
  { id: "hospitals", label: "Hospitals", icon: Hospital, color: "text-red-400", bg: "bg-red-500/10", border: "hover:border-red-500/50", desc: "Connecting physical healthcare with real-time mental health monitoring and crisis support." },
  { id: "corporates", label: "Corporates", icon: Briefcase, color: "text-navy-400", bg: "bg-navy-500/10", border: "hover:border-navy-500/50", desc: "Building resilient teams and preventing burnout through continuous wellbeing analytics." },
  { id: "governments", label: "Governments", icon: Landmark, color: "text-navy-400", bg: "bg-navy-500/10", border: "hover:border-navy-500/50", desc: "Mapping national mental health indexes and deploying policy-level wellbeing strategies." },
];

export function Ecosystem() {
  const [activeNode, setActiveNode] = useState(ecosystemNodes[0]);

  return (
    <section className="relative overflow-hidden bg-[#050505] py-24 md:py-32 border-t border-white/5">
      {/* Ambient Deep Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[800px] w-[800px] rounded-full bg-navy-900/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-navy-400">
            Platform Ecosystem
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl mb-6">
            Built for people. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
              Designed for communities.
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            TIIF is not a standalone tool. It is a connected ecosystem where individual healing fuels community growth. 
            Hover over any sector to see how TIIF integrates.
          </p>
        </motion.div>

        {/* Interactive Ecosystem Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Dynamic Insight Panel (Updates on hover) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden min-h-[350px] flex flex-col justify-center">
              {/* Dynamic Glow matching the active node */}
              <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] opacity-20 transition-colors duration-500 ${activeNode.bg}`} />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-lg ${activeNode.bg}`}>
                    <activeNode.icon className={`w-7 h-7 ${activeNode.color}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    For {activeNode.label}
                  </h3>
                  <p className="text-lg text-gray-400 leading-relaxed mb-8">
                    {activeNode.desc}
                  </p>
                  <button className="flex items-center gap-2 text-sm font-semibold text-white hover:text-navy-400 transition-colors group">
                    Explore Solution 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: The Node Network */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            
            {/* Center Core (TIIF OS) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-tr from-navy-600 to-navy-600 shadow-[0_0_40px_rgba(38, 61, 112,0.4)] flex items-center justify-center z-20 border-4 border-[#050505]">
              <BrainCircuit className="w-10 h-10 text-white" />
            </div>

            {/* Network Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
              {ecosystemNodes.map((node) => (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center min-h-[120px] ${
                    activeNode.id === node.id 
                      ? `bg-white/10 border-white/30 scale-105 shadow-xl` 
                      : `bg-white/[0.02] border-white/5 hover:bg-white/5 ${node.border}`
                  }`}
                >
                  <node.icon className={`w-6 h-6 ${activeNode.id === node.id ? node.color : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${activeNode.id === node.id ? 'text-white' : 'text-gray-400'}`}>
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}