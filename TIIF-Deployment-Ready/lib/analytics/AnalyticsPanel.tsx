"use client";

import * as React from "react";
import { TrendingUp, Activity, Target, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function AnalyticsPanel() {
  // MOCK DATA (Phase 10 izahuzwa na Context/Firebase)
  const metrics = {
    growthScore: { value: 72, trend: "+4.2%", isPositive: true },
    wellnessIndex: { value: 68, trend: "+1.5%", isPositive: true },
    emotionalBalance: { value: 61, trend: "-2.0%", isPositive: false },
    stressLevel: { value: 35, trend: "-5.4%", isPositive: true }, // Stress dropping is positive
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 space-y-6 shadow-2xl">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-navy-400" />
            TIIF Analytics™
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Real-time measurement of your human development.
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-navy-500 animate-pulse"></span>
          Live Sync
        </div>
      </div>

      {/* METRICS GRID (Stripe Style) */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Growth Score */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-navy-900/20 to-transparent border border-white/5 relative overflow-hidden">
          <Target className="w-5 h-5 text-navy-400 mb-2" />
          <p className="text-xs text-gray-400 uppercase tracking-wider">Growth Score</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-3xl font-bold text-white">{metrics.growthScore.value}</span>
            <span className={`text-xs flex items-center mb-1 ${metrics.growthScore.isPositive ? 'text-success-500' : 'text-red-400'}`}>
              {metrics.growthScore.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {metrics.growthScore.trend}
            </span>
          </div>
        </div>

        {/* Wellness Index */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-navy-900/20 to-transparent border border-white/5">
          <Activity className="w-5 h-5 text-navy-400 mb-2" />
          <p className="text-xs text-gray-400 uppercase tracking-wider">Wellness Index</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-3xl font-bold text-white">{metrics.wellnessIndex.value}</span>
            <span className={`text-xs flex items-center mb-1 ${metrics.wellnessIndex.isPositive ? 'text-success-500' : 'text-red-400'}`}>
              {metrics.wellnessIndex.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {metrics.wellnessIndex.trend}
            </span>
          </div>
        </div>

        {/* Emotional Balance */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Emotional Balance</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-white">{metrics.emotionalBalance.value}%</span>
            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-navy-500 rounded-full" style={{ width: `${metrics.emotionalBalance.value}%` }}></div>
            </div>
          </div>
        </div>

        {/* Stress Level (Inverted logic: lower is better) */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Stress Level</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-white">{metrics.stressLevel.value}%</span>
            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-navy-500 rounded-full" style={{ width: `${metrics.stressLevel.value}%` }}></div>
            </div>
          </div>
        </div>

      </div>

      {/* AI ANALYTICS INSIGHT */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-navy-600/10 to-navy-600/10 border border-navy-500/20 flex gap-4 items-start">
        <div className="p-2 rounded-full bg-navy-500/20 text-navy-400 shrink-0">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">AI Synthesis</p>
          <p className="text-sm text-gray-400 mt-1 leading-relaxed">
            Your stress levels have dropped by 5.4% this week, directly correlating with a steady increase in your Growth Score. Your habit of evening reflections is working. Keep it up.
          </p>
        </div>
      </div>

    </div>
  );
}