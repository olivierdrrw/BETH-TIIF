"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import type { UserRole } from "@/types/role";

const VALID_ROLES: UserRole[] = [
  "super_admin",
  "tenant_admin",
  "therapist",
  "researcher",
  "institution_admin",
  "member",
];

export function useUserRole() {
  const user = useAuthStore((state) => state.user);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!user?.uid) {
      setRole(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    user.getIdTokenResult().then((tokenResult: { claims: Record<string, unknown> }) => {
      if (cancelled) return;
      const claimRole = tokenResult.claims.role;
      setRole(typeof claimRole === "string" && VALID_ROLES.includes(claimRole as UserRole)
        ? claimRole as UserRole
        : "member");
    }).catch(() => {
      if (!cancelled) setRole("member");
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => { cancelled = true; };
  }, [user]);

  return { role, isLoading };
}
