import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

const COLLECTION = "savedArticles";

function docId(userId: string, slug: string) {
  return `${userId}_${slug}`;
}

export async function saveArticle(userId: string, slug: string) {
  await setDoc(doc(db, COLLECTION, docId(userId, slug)), {
    userId,
    slug,
    savedAt: new Date().toISOString(),
  });
}

export async function unsaveArticle(userId: string, slug: string) {
  await deleteDoc(doc(db, COLLECTION, docId(userId, slug)));
}

export async function getSavedSlugs(userId: string): Promise<string[]> {
  const snapshot = await getDocs(
    query(collection(db, COLLECTION), where("userId", "==", userId))
  );
  return snapshot.docs.map((d) => d.data().slug as string);
}
