import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { CompanionAvatar } from "@/features/companion-avatar/types/companion-avatar.type";

export async function getCompanionAvatar(userId: string): Promise<CompanionAvatar | null> {
  const snap = await getDoc(doc(db, COLLECTIONS.COMPANION_AVATARS, userId));
  return snap.exists() ? (snap.data() as CompanionAvatar) : null;
}

export async function saveCompanionAvatar(
  avatar: Omit<CompanionAvatar, "id" | "createdAt" | "updatedAt"> & {
    createdAt?: string;
  }
): Promise<CompanionAvatar> {
  const existing = await getCompanionAvatar(avatar.userId);
  const now = new Date().toISOString();

  const record: CompanionAvatar = {
    ...avatar,
    id: avatar.userId,
    createdAt: existing?.createdAt ?? avatar.createdAt ?? now,
    updatedAt: now,
  };

  await setDoc(doc(db, COLLECTIONS.COMPANION_AVATARS, avatar.userId), record);
  return record;
}

export async function deleteCompanionAvatar(userId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.COMPANION_AVATARS, userId));
}
