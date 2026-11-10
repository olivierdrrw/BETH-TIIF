import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { HumanTwin } from "@/types/human-twin";

export class HumanTwinRepository {
  static async save(userId: string, twin: Partial<HumanTwin>) {
    await setDoc(doc(db, COLLECTIONS.HUMAN_TWINS, userId), {
      ...twin,
      userId,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  }

  static async get(userId: string): Promise<HumanTwin | null> {
    const snapshot = await getDoc(doc(db, COLLECTIONS.HUMAN_TWINS, userId));
    return snapshot.exists() ? snapshot.data() as HumanTwin : null;
  }
}

export async function saveHumanTwin(userId: string, twin: Partial<HumanTwin>) {
  return HumanTwinRepository.save(userId, twin);
}

export async function getHumanTwin(userId: string) {
  return HumanTwinRepository.get(userId);
}
