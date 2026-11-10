import {
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";

export class HumanTwinRepository {
  static subscribe(
    uid: string,
    callback: (data: any) => void
  ) {
    return onSnapshot(
      doc(db, COLLECTIONS.HUMAN_TWINS, uid),
      (snapshot) => {
        callback(snapshot.data());
      }
    );
  }

  static async getByUser(uid: string) {
    const snapshot = await getDoc(
      doc(db, COLLECTIONS.HUMAN_TWINS, uid)
    );

    return snapshot.exists() ? snapshot.data() : null;
  }
}
