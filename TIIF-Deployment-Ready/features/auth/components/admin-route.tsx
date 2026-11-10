"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ShieldAlert } from "lucide-react";

import { useUserRole } from "@/hooks/use-user-role";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { role, isLoading } = useUserRole();

  const allowed = role === "super_admin";

  useEffect(() => {
    if (!isLoading && !allowed) {
      const timer = setTimeout(() => router.push("/dashboard"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, allowed, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-slate-500" />
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <ShieldAlert size={32} className="text-rose-400" />
        <p className="text-white">You don't have access to this page.</p>
        <p className="text-sm text-slate-500">Redirecting you back to the dashboard...</p>
      </div>
    );
  }

  return <>{children}</>;
}
