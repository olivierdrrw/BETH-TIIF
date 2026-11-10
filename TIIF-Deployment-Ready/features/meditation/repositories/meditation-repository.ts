import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export async function
getMeditations() {

  const snapshot =
    await getDocs(
      collection(
        db,
        "meditations"
      )
    );

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );
}