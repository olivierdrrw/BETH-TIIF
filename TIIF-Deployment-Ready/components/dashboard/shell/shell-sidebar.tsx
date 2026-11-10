"use client";

import {
  LayoutDashboard,
  BrainCircuit,
  Activity,
  UserCircle2,
  Settings,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BrainCircuit, label: "Human Twin" },
  { icon: Activity, label: "Analytics" },
  { icon: UserCircle2, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function ShellSidebar() {
  return (
    <aside
      className="
        hidden
        w-72
        border-r
        border-white/10
        bg-white/[0.02]
        backdrop-blur-3xl
        lg:block
      "
    >
      <div className="p-8">

        <h1 className="text-2xl font-bold">
          TIIF
        </h1>

        <nav className="mt-12 space-y-2">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className="
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  px-4
                  py-4
                  text-left
                  transition
                  hover:bg-white/5
                "
              >
                <Icon size={20} />

                {item.label}

              </button>
            );
          })}

        </nav>

      </div>
    </aside>
  );
}