"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import TimelineItem from "./timeline-item";

const events = [
  {
    date: "TODAY",
    title: "Identity Confidence Increased",
    reflection:
      "Your Human Twin detected stronger emotional consistency and improved decision making.",
    growth: "+4% Identity Growth",
  },
  {
    date: "YESTERDAY",
    title: "Reflection Completed",
    reflection:
      "Completing your evening reflection improved emotional awareness.",
    growth: "+2% Wellbeing",
  },
  {
    date: "LAST WEEK",
    title: "Purpose Milestone",
    reflection:
      "You completed every planned personal growth activity this week.",
    growth: "+7% Purpose Alignment",
  },
  {
    date: "LAST MONTH",
    title: "Transformation Detected",
    reflection:
      "Your Human Twin observed measurable progress across resilience and identity.",
    growth: "+11% Overall Growth",
  },
];

export default function HumanTwinTimeline() {
  return (
    <DashboardCard>

      <div className="mb-12">

        <p className="text-xs uppercase tracking-[0.3em] text-navy-400">
          HUMAN TWIN TIMELINE™
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Your Digital Life Journey
        </h2>

        <p className="mt-4 max-w-2xl text-slate-400">
          Every important milestone, reflection, prediction and achievement
          becomes part of your evolving Human Twin.
        </p>

      </div>

      <div className="relative">

        {/* Vertical Line */}
        <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-navy-500 via-navy-400 to-transparent" />

        <div className="space-y-8">
          {events.map((event) => (
            <TimelineItem
              key={event.date}
              {...event}
            />
          ))}
        </div>

      </div>

    </DashboardCard>
  );
}