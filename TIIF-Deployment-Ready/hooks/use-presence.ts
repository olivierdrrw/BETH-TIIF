"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { startPresence, subscribeToPresence } from "@/lib/realtime/presence";

/** Call once near the app root to mark the current user online while the app is open. */
export function useOwnPresence() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user?.uid) return;
    return startPresence(user.uid);
  }, [user?.uid]);
}

/** Subscribes to whether a specific other user is currently online. */
export function useIsOnline(userId: string | undefined) {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (!userId) return;
    return subscribeToPresence(userId, setOnline);
  }, [userId]);

  return online;
}
