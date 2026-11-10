"use client";

import {
  Users,
  Activity,
  BrainCircuit,
  ShieldAlert,
} from "lucide-react";

const metrics = [
  {
    title: "Total Users",
    value: "24,891",
    icon: Users,
    change: "+18%",
  },
  {
    title: "Active Users",
    value: "12,482",
    icon: Activity,
    change: "+9%",
  },
  {
    title: "AI Sessions",
    value: "98,204",
    icon: BrainCircuit,
    change: "+42%",
  },
  {
    title: "Risk Alerts",
    value: "12",
    icon: ShieldAlert,
    change: "-6%",
  },
];

export default function DashboardOverview() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.title}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-6
              backdrop-blur-2xl
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-navy-400/40
              hover:bg-white/10
            "
          >
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-navy-500/10 blur-3xl transition-all duration-500 group-hover:bg-navy-400/20" />

            <div className="relative flex items-center justify-between">

              <div>

                <p className="text-sm text-zinc-400">
                  {metric.title}
                </p>

                <h3 className="mt-3 text-4xl font-bold tracking-tight">
                  {metric.value}
                </h3>

                <span className="mt-3 inline-block text-sm font-medium text-navy-400">
                  {metric.change}
                </span>

              </div>

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-navy-500/10
                  text-navy-400
                "
              >
                <Icon size={28} />
              </div>

            </div>

          </div>
        );
      })}

    </section>
  );
}