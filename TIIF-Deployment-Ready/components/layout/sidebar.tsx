"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  ClipboardList,
  Target,
  Smile,
  TrendingUp,
  Bot,
  Users,
  Stethoscope,
  Settings,
  LogOut,
  ChevronDown,
  School,
  Home,
  Building2,
  Landmark,
} from "lucide-react";

import { useSidebarStore } from "@/stores/sidebar-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useUserProfile } from "@/hooks/use-user-profile";
import { logoutUser } from "@/features/auth/services/logout";
import { calculateAvatarLevel, getIdentityRank } from "@/features/avatar/avatar-level-engine";
import { cn } from "@/lib/utils";

type NavLink = { label: string; href: string; icon: any };
type NavGroup = { label: string; icon: any; children: NavLink[] };
type NavEntry = NavLink | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

// A handful of items stay at the top level; related pages are grouped so the
// sidebar reads as ~11 rows instead of 22 flat entries. Every original route
// is still reachable — this only changes how they're organized.
const nav: NavEntry[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Human Twin", href: "/dashboard/human-twin", icon: Sparkles },
  { label: "Future Self", href: "/dashboard/future-self", icon: Sparkles },
  {
    label: "Self-Discovery",
    icon: ClipboardList,
    children: [
      { label: "Assessment", href: "/dashboard/assessment", icon: ClipboardList },
      { label: "Identity", href: "/dashboard/identity", icon: ClipboardList },
      { label: "Personality", href: "/dashboard/personality", icon: ClipboardList },
    ],
  },
  {
    label: "Growth",
    icon: Target,
    children: [
      { label: "Goals", href: "/dashboard/goals", icon: Target },
      { label: "Habits", href: "/dashboard/habits", icon: Target },
      { label: "Journal", href: "/dashboard/journal", icon: Target },
      { label: "Calendar", href: "/dashboard/calendar", icon: Target },
    ],
  },
  { label: "Wellness", href: "/dashboard/wellness", icon: Smile },
  {
    label: "Progress",
    icon: TrendingUp,
    children: [
      { label: "Impact", href: "/dashboard/impact", icon: TrendingUp },
      { label: "Achievements", href: "/dashboard/achievements", icon: TrendingUp },
      { label: "Leaderboard", href: "/dashboard/leaderboard", icon: TrendingUp },
      { label: "Reports", href: "/dashboard/reports", icon: TrendingUp },
    ],
  },
  { label: "AI Companion", href: "/dashboard/ai-companion", icon: Bot },
  {
    label: "Community",
    icon: Users,
    children: [
      { label: "Community", href: "/dashboard/community", icon: Users },
      { label: "Messages", href: "/dashboard/messages", icon: Users },
      { label: "Trusted Circle", href: "/dashboard/trusted-circle", icon: Users },
    ],
  },
  {
    label: "Resources",
    icon: ClipboardList,
    children: [
      { label: "Knowledge Base", href: "/dashboard/knowledge-base", icon: ClipboardList },
      { label: "Files", href: "/dashboard/files", icon: ClipboardList },
    ],
  },
  { label: "Therapy", href: "/dashboard/therapy", icon: Stethoscope },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

// Role-specific dashboards, shown to the relevant users only — added right
// after Overview, based on the role chosen during onboarding.
const ROLE_NAV: Record<string, NavLink> = {
  parent: { label: "Parent Dashboard", href: "/dashboard/parent", icon: Home },
  teacher: { label: "School Dashboard", href: "/dashboard/school", icon: School },
  organization: { label: "Organization Dashboard", href: "/dashboard/organization", icon: Building2 },
  therapist: { label: "Therapist Dashboard", href: "/dashboard/therapist", icon: Stethoscope },
  government: { label: "National Dashboard", href: "/dashboard/national", icon: Landmark },
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const collapsed = useSidebarStore((state) => state.collapsed);
  const user = useAuthStore((state) => state.user);
  const profile = useUserProfile();

  const roleEntry = profile?.role ? ROLE_NAV[profile.role] : undefined;
  const renderedNav: NavEntry[] = roleEntry
    ? [nav[0], roleEntry, ...nav.slice(1)]
    : nav;

  const [openGroup, setOpenGroup] = useState<string | null>(() => {
    const active = nav.find(
      (entry) => isGroup(entry) && entry.children.some((c) => pathname?.startsWith(c.href))
    );
    return active ? active.label : null;
  });

  async function handleLogout() {
    await logoutUser();
    router.push("/login");
  }

  const initial = (user?.email?.[0] ?? "T").toUpperCase();

  const xp = profile?.xp ?? 0;
  const level = calculateAvatarLevel(xp);
  const rank = getIdentityRank(level);
  const xpIntoLevel = xp % 100;

  function isLinkActive(href: string) {
    return href === "/dashboard" ? pathname === href : pathname?.startsWith(href);
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/5 bg-background transition-all duration-300",
        collapsed ? "w-20" : "w-72"
      )}
    >
      <Link
        href="/"
        className={cn(
          "flex items-center gap-2.5 p-6 text-2xl font-bold text-white",
          collapsed && "justify-center px-0"
        )}
      >
        <img src="/logo.png" alt="TIIF" className="h-8 w-8 shrink-0 rounded-lg" />
        {!collapsed && <span>TIIF</span>}
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {renderedNav.map((entry) => {
          if (!isGroup(entry)) {
            const Icon = entry.icon;
            const active = isLinkActive(entry.href);
            return (
              <Link
                key={entry.href}
                href={entry.href}
                title={collapsed ? entry.label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors",
                  collapsed && "justify-center px-0",
                  active
                    ? "bg-navy-500/10 text-navy-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span>{entry.label}</span>}
              </Link>
            );
          }

          const groupActive = entry.children.some((c) => isLinkActive(c.href));
          const open = openGroup === entry.label;
          const GroupIcon = entry.icon;

          return (
            <div key={entry.label}>
              <button
                onClick={() => setOpenGroup(open ? null : entry.label)}
                title={collapsed ? entry.label : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors",
                  collapsed && "justify-center px-0",
                  groupActive
                    ? "text-navy-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <GroupIcon size={18} className="shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{entry.label}</span>
                    <ChevronDown
                      size={14}
                      className={cn("shrink-0 transition-transform", open && "rotate-180")}
                    />
                  </>
                )}
              </button>

              {!collapsed && open && (
                <div className="ml-6 space-y-1 border-l border-white/5 pl-3">
                  {entry.children.map((child) => {
                    const active = isLinkActive(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-navy-500/10 text-navy-300"
                            : "text-slate-500 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-white/5 p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2",
            collapsed && "justify-center px-0"
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy-500/20 text-sm font-medium text-navy-300">
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              initial
            )}
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-white">
                {user?.email ?? "Guest"}
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-navy-300">
                  Level {level} · {rank}
                </span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-navy-600 to-navy-400"
                    style={{ width: `${xpIntoLevel}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            title="Log out"
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-rose-300"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
