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
import type { JournalEntry } from "./types/journal-entry";

export class JournalRepository {
  static async create(entry: Omit<JournalEntry, "id">) {
    return addDoc(collection(db, COLLECTIONS.JOURNALS), entry);
  }

  static async getByUser(userId: string): Promise<JournalEntry[]> {
    const snapshot = await getDocs(
      query(
        collection(db, COLLECTIONS.JOURNALS),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      )
    );

    return snapshot.docs.map(
      (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as JournalEntry)
    );
  }
}
