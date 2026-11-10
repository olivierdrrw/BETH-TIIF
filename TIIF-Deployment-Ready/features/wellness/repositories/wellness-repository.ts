import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { WellnessLog, WellnessLogType } from "../types/wellness-log";

export class WellnessRepository {
  static async create(entry: Omit<WellnessLog, "id">) {
    return addDoc(collection(db, COLLECTIONS.WELLNESS_LOGS), entry);
  }

  static async getByUserAndType(
    userId: string,
    type: WellnessLogType
  ): Promise<WellnessLog[]> {
    const snapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.WELLNESS_LOGS),
        where("userId", "==", userId),
        where("type", "==", type),
        orderBy("createdAt", "desc")
      )
    );

    return snapshot.docs.map(
      (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as WellnessLog)
    );
  }

  static async getTodayCount(
    userId: string,
    type: WellnessLogType
  ): Promise<number> {
    const entries = await this.getByUserAndType(userId, type);
    const today = new Date().toDateString();
    return entries.filter(
      (e) => new Date(e.createdAt).toDateString() === today
    ).length;
  }
}
