"use client";

import BrainNode from "./brain-node";
import BrainLink from "./brain-link";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatusPill } from "@/components/dashboard/ui/status-pill";

const nodes = [
  { id: "identity", label: "Identity", x: 50, y: 10 },
  { id: "purpose", label: "Purpose", x: 82, y: 28 },
  { id: "growth", label: "Growth", x: 78, y: 72 },
  { id: "emotion", label: "Emotion", x: 22, y: 30 },
  { id: "health", label: "Health", x: 18, y: 72 },
  { id: "career", label: "Career", x: 50, y: 92 },
];

const links = [
  ["identity", "purpose"],
  ["identity", "emotion"],
  ["purpose", "growth"],
  ["emotion", "health"],
  ["growth", "career"],
  ["health", "career"],
  ["emotion", "growth"],
];

export default function BrainMap() {
  return (
    <DashboardCard className="relative overflow-hidden">

      <div className="mb-10 flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.3em] text-navy-400">
            HUMAN TWIN BRAIN™
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            Neural Intelligence Map
          </h2>

        </div>

        <StatusPill>
          Learning
        </StatusPill>

      </div>

      <div className="relative h-[520px]">

        {links.map(([a, b]) => {
          const from = nodes.find(n => n.id === a)!;
          const to = nodes.find(n => n.id === b)!;

          return (
            <BrainLink
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
            />
          );
        })}

        {nodes.map(node => (
          <BrainNode
            key={node.id}
            label={node.label}
            x={node.x}
            y={node.y}
          />
        ))}

      </div>

    </DashboardCard>
  );
}