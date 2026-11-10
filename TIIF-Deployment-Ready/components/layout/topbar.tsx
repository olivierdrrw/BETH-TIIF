"use client";

import { Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { NotificationBell } from "@/features/notifications/components/notification-bell";
import { UserProfileMenu } from "@/components/profile/user-profile-menu";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import { useCommandPaletteStore } from "@/stores/command-palette-store";

export function Topbar() {
  const setOpen = useCommandPaletteStore((state) => state.setOpen);

  return (
    <header className="flex items-center justify-between border-b border-white/5 bg-background/80 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <SidebarToggle />

        <button
          onClick={() => setOpen(true)}
          className="flex w-64 items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-500 transition hover:border-white/20 hover:text-slate-300"
        >
          <Search size={15} />
          Search...
          <kbd className="ml-auto rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-600">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <ThemeToggle />
        <UserProfileMenu />
      </div>
    </header>
  );
}
