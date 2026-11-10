import {
  setDoc,
  doc,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export async function saveIdentityProfile(
  userId: string,
  profile: unknown
) {
  await setDoc(
    doc(
      db,
      "identity_profiles",
      userId
    ),
    profile
  );
}