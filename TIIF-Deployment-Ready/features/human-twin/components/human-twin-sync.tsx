"use client";

import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";

/**
 * Renders nothing — keeps the Human Twin store in sync with the real,
 * saved Firestore document (human_twins/{uid}) in real time.
 *
 * Without this, every score shown across the app (AI Companion, Human
 * Twin page, Future Self, dashboard cards) falls back to the store's
 * hardcoded defaults instead of the person's real, saved scores.
 */
export function HumanTwinSync() {
  const user = useAuthStore((state) => state.user);
  const setTwin = useHumanTwinStore((state) => state.setTwin);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = onSnapshot(
      doc(db, COLLECTIONS.HUMAN_TWINS, user.uid),
      (snapshot) => {
        if (!snapshot.exists()) return;
        const data = snapshot.data();

        setTwin({
          identity: data.identityScore ?? 0,
          growth: data.growthScore ?? 0,
          wellbeing: data.wellbeingScore ?? 0,
          resilience: data.resilienceScore ?? 0,
          aiConfidence: data.prediction?.confidence ?? 0,
          emotionalState: data.emotionalState ?? "Calm",
        });
      }
    );

    return () => unsubscribe();
  }, [user?.uid, setTwin]);

  return null;
}
