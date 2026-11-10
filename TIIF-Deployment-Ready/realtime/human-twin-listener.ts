import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";

export interface HumanTwinSnapshot {
  identity?: number;
  growth?: number;
  resilience?: number;
  wellbeing?: number;
  aiConfidence?: number;
  emotionalState?: string;
  [key: string]: unknown;
}

/**
 * Subscribes to real-time updates on a single user's Human Twin document.
 * Returns an unsubscribe function, meant to be called from a useEffect
 * cleanup (see HumanTwinProvider).
 */
export function subscribeHumanTwin(
  userId: string,
  callback: (twin: HumanTwinSnapshot) => void
) {
  if (!userId) {
    return () => {};
  }

  const ref = doc(db, COLLECTIONS.HUMAN_TWINS, userId);

  return onSnapshot(ref, (snapshot) => {
    if (!snapshot.exists()) return;
    callback(snapshot.data() as HumanTwinSnapshot);
  });
}
