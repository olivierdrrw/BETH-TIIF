import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export async function createUser(
  userId: string,
  data: unknown
) {
  await setDoc(
    doc(
      db,
      "users",
      userId
    ),
    data
  );
}

export async function getUser(
  userId: string
) {
  const snapshot =
    await getDoc(
      doc(
        db,
        "users",
        userId
      )
    );

  return snapshot.data();
}