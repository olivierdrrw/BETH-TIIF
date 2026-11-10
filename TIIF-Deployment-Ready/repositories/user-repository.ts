import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { auth } from "@/lib/firebase/auth";

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
  coverPhotoUrl?: string;
  language?: string;
  timezone?: string;
  privacy?: "public" | "private";
  notificationsEnabled?: boolean;
  interests?: string[];
  skills?: string[];
  certificates?: string[];
  showOnLeaderboard?: boolean;
  role?: "student" | "parent" | "teacher" | "therapist" | "organization" | "government";
  xp?: number;
  plan?: string;
  [key: string]: unknown;
}

export interface PublicDirectoryProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export async function getUsers(search = ""): Promise<PublicDirectoryProfile[]> {
  const currentUser = auth.currentUser;
  if (!currentUser) return [];
  const token = await currentUser.getIdToken();
  const params = new URLSearchParams();
  if (search.trim()) params.set("q", search.trim().slice(0, 80));

  const response = await fetch(`/api/directory${params.size ? `?${params.toString()}` : ""}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Unable to load the public member directory.");
  }
  const result = await response.json() as { users?: PublicDirectoryProfile[] };
  return Array.isArray(result.users) ? result.users : [];
}

export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, COLLECTIONS.USERS, uid));
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  await setDoc(doc(db, COLLECTIONS.USERS, uid), data, { merge: true });
}
