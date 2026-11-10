"use client";

import * as React from "react";
import { Activity } from "lucide-react";

export function WellnessIndex() {
  const metrics = [
    { label: "Growth Score", value: 82, color: "bg-navy-500" },
    { label: "Emotional Balance", value: 68, color: "bg-navy-500" },
    { label: "Stress Level", value: 24, color: "bg-navy-500" }, // Low stress is good
  ];

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-navy-400" />
          Wellness Index
        </h2>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-navy-500/10 text-navy-400">
          Updated just now
        </span>
      </div>

      <div className="space-y-5">
        {metrics.map((metric, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{metric.label}</span>
              <span className="font-medium text-white">{metric.value}%</span>
            </div>
            {/* Progress Bar */}
            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
              <div 
                className={`h-full rounded-full ${metric.color} transition-all duration-1000 ease-out`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}