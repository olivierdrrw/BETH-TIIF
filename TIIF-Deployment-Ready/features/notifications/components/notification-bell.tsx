"use client";

import { useState } from "react";
import { Bell, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { useNotificationStore } from "@/features/notifications/store/notification-store";
import { cn } from "@/lib/utils";

const ICON_BY_TYPE = {
  info: Info,
  warning: AlertTriangle,
  critical: AlertCircle,
} as const;

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/5"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-medium text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close notifications"
          />

          <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <p className="text-sm font-medium text-white">Notifications</p>
              {notifications.length > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-navy-400 hover:text-navy-300"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-slate-500">
                  You're all caught up.
                </p>
              ) : (
                notifications.map((n) => {
                  const Icon = ICON_BY_TYPE[n.type ?? "info"];
                  return (
                    <button
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={cn(
                        "flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left transition hover:bg-white/5",
                        !n.read && "bg-navy-500/[0.04]"
                      )}
                    >
                      <Icon size={16} className="mt-0.5 shrink-0 text-navy-400" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-white">{n.title}</p>
                        <p className="truncate text-xs text-slate-400">{n.message}</p>
                      </div>
                      {!n.read && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-navy-400" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
