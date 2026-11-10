import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";

export async function registerUser(email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);

  await setDoc(doc(db, COLLECTIONS.USERS, credential.user.uid), {
    email: email.trim().toLowerCase(),
    role: "member",
    plan: "free",
    privacy: "private",
    showOnLeaderboard: false,
    createdAt: new Date().toISOString(),
  });

  return credential;
}
