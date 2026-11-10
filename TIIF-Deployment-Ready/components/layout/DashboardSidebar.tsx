"use client";

import {
  LayoutDashboard,
  Brain,
  Heart,
  Target,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";

const items = [
  LayoutDashboard,
  Brain,
  Heart,
  Target,
  BarChart3,
  Bell,
  Settings,
];

export function DashboardSidebar() {
  return (
    <aside
      className="
        hidden
        xl:flex
        w-24
        flex-col
        items-center
        gap-5
        py-8
      "
    >
      <div
        className="
          h-14
          w-14
          rounded-2xl
          bg-[#3E63B0]/10
          border
          border-[#3E63B0]/20
          backdrop-blur-2xl
        "
      />

      {items.map((Icon, index) => (
        <button
          key={index}
          className="
            h-14
            w-14
            rounded-2xl
            border
            border-white/5
            bg-white/[0.03]
            backdrop-blur-xl
            flex
            items-center
            justify-center
            transition-all
            duration-300
            hover:scale-105
            hover:border-[#3E63B0]/40
            hover:bg-[#3E63B0]/10
          "
        >
          <Icon
            size={20}
            className="text-slate-300"
          />
        </button>
      ))}
    </aside>
  );
}