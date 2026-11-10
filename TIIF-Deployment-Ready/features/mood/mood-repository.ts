import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export class MoodRepository {

  static async create(
    mood: any
  ) {

    return addDoc(

      collection(
        db,
        "moodEntries"
      ),

      mood

    );
  }

  static async getByUser(userId: string) {
    const snapshot = await getDocs(
      query(
        collection(db, "moodEntries"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      )
    );

    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  }
}