"use client";

import * as React from "react";
import { BrainCircuit, ChevronRight } from "lucide-react";
import Link from "next/link";

export function IdentityGraph() {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-navy-900/20 to-transparent backdrop-blur-sm relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-navy-600/20 rounded-full blur-3xl -z-10" />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-navy-400" />
          Human Twin™
        </h2>
      </div>

      <p className="text-sm text-gray-400 mb-6">
        Your self-awareness has grown by 4% this week. Keep reflecting.
      </p>

      {/* Abstract Representation of Twin */}
      <div className="h-32 flex items-center justify-center border border-white/5 rounded-xl bg-black/20 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-navy-500 to-navy-500 animate-pulse blur-md opacity-80" />
        <div className="w-12 h-12 rounded-full bg-white/10 absolute backdrop-blur-xl border border-white/20" />
      </div>

      <Link 
        href="/dashboard/twin" 
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-all"
      >
        View Full Graph <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}