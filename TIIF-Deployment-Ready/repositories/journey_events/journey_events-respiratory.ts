import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export async function createJourneyEvent(
  data: unknown
) {
  await addDoc(
    collection(
      db,
      "journey_events"
    ),
    data
  );
}