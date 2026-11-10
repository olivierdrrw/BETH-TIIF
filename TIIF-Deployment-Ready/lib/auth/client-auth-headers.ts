"use client";

import { auth } from "@/lib/firebase/auth";

export async function getFirebaseAuthorizationHeader(): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("Please sign in to continue.");
  return `Bearer ${await user.getIdToken()}`;
}
