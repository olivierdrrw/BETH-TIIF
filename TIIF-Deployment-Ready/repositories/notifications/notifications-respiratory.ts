import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export async function createNotification(
  notification: unknown
) {
  await addDoc(
    collection(
      db,
      "notifications"
    ),
    notification
  );
}