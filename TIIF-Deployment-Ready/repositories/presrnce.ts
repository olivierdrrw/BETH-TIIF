import {
  doc,
  setDoc,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export async function updatePresence(
  userId: string,
  status: string
) {
  await setDoc(
    doc(
      db,
      "presence",
      userId
    ),
    {
      status,
      lastSeen:
        new Date()
          .toISOString(),
    }
  );
}