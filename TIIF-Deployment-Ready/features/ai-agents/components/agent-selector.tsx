"use client";

import {
  Sparkles,
  HeartHandshake,
  Target,
  Briefcase,
  GraduationCap,
  Baby,
  Users,
  HeartPulse,
  PiggyBank,
  Compass,
  Moon,
  Fingerprint,
  Apple,
  Repeat,
  School,
  Building2,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

import { AI_AGENTS, type AIAgent } from "../data/agents";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  HeartHandshake,
  Target,
  Briefcase,
  GraduationCap,
  Baby,
  Users,
  HeartPulse,
  PiggyBank,
  Compass,
  Moon,
  Fingerprint,
  Apple,
  Repeat,
  School,
  Building2,
  FlaskConical,
};

interface AgentSelectorProps {
  selectedId: string;
  onSelect: (agent: AIAgent) => void;
}

export function AgentSelector({ selectedId, onSelect }: AgentSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {AI_AGENTS.map((agent) => {
        const Icon = ICONS[agent.icon] ?? Sparkles;
        const isSelected = agent.id === selectedId;

        return (
          <button
            key={agent.id}
            onClick={() => onSelect(agent)}
            className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition ${
              isSelected
                ? "border-navy-400/50 bg-navy-500/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <Icon size={18} className={isSelected ? "text-navy-300" : "text-slate-400"} />
            <div>
              <p className="text-sm font-medium text-white">{agent.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">{agent.role}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
