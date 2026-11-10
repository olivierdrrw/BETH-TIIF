import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { HumanTwin } from "@/types/human-twin";

export type HumanTwinSnapshot = HumanTwin | null;

export function subscribeHumanTwin(
  userId: string,
  callback: (data: HumanTwinSnapshot) => void,
) {
  return onSnapshot(
    doc(db, COLLECTIONS.HUMAN_TWINS, userId),
    (snapshot) => callback(snapshot.exists() ? snapshot.data() as HumanTwin : null),
  );
}

export const subscribeToHumanTwin = subscribeHumanTwin;
