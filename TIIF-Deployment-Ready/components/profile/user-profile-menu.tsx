"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Settings, LogOut, ChevronDown } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { useUserProfile } from "@/hooks/use-user-profile";
import { logoutUser } from "@/features/auth/services/logout";

export function UserProfileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const profile = useUserProfile();

  const initial = (user?.email?.[0] ?? "T").toUpperCase();

  async function handleLogout() {
    await logoutUser();
    setOpen(false);
    router.push("/login");
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-white/10 px-2 py-1.5 transition hover:bg-white/5"
      >
        <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-navy-500/20 text-xs font-medium text-navy-300">
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            initial
          )}
        </div>
        <ChevronDown size={14} className="text-slate-500" />
      </button>

      {open && (
        <>
          <button
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />

          <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl">
            <div className="border-b border-white/5 px-4 py-3">
              <p className="truncate text-sm text-white">
                {user?.email ?? "Guest"}
              </p>
            </div>

            <Link
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5"
            >
              <Settings size={16} />
              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-rose-300 transition hover:bg-rose-500/10"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
