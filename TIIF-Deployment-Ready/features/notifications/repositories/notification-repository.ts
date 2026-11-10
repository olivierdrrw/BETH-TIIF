import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export class NotificationRepository {

  static async create(
    notification: any
  ) {

    return addDoc(

      collection(
        db,
        "notifications"
      ),

      notification

    );
  }
}