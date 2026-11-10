"use client";

import { Bell } from "lucide-react";

export function NotificationsCenter() {
  return (
    <button className="relative rounded-xl border p-2 hover:bg-muted">
      <Bell className="h-5 w-5" />

      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
        3
      </span>
    </button>
  );
}