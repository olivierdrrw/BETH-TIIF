import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export async function saveAssessment(
  data: unknown
) {
  await addDoc(
    collection(
      db,
      "assessments"
    ),
    data
  );
}