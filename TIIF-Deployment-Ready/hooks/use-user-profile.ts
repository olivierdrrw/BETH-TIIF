"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getUserProfile, type UserProfile } from "@/repositories/user-repository";

export function useUserProfile() {
  const user = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user?.uid) return;
    getUserProfile(user.uid).then(setProfile);
  }, [user?.uid]);

  return profile;
}
