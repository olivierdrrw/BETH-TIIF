"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { CommandProvider } from "@/components/command/command-provider";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useOwnPresence } from "@/hooks/use-presence";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const collapsed = useSidebarStore((state) => state.collapsed);
  useOwnPresence();

  return (
    <div className="flex min-h-screen bg-background text-white">
      <Sidebar />

      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          collapsed ? "ml-20" : "ml-72"
        )}
      >
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>

      <CommandProvider />
    </div>
  );
}
