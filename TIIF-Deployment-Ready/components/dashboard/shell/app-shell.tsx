"use client";

import { ReactNode } from "react";
import ShellBackground from "./shell-background";
import ShellSidebar from "./shell-sidebar";
import ShellTopbar from "./shell-topbar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      <ShellBackground />

      <div className="relative z-10 flex min-h-screen">

        <ShellSidebar />

        <div className="flex flex-1 flex-col">

          <ShellTopbar />

          <main className="flex-1 overflow-y-auto px-8 py-8">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}