import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";

export async function saveScreenerResult(entry: {
  userId: string;
  screener: "phq9" | "gad7";
  total: number;
  severity: string;
  createdAt: string;
}) {
  return addDoc(collection(db, COLLECTIONS.ASSESSMENTS), entry);
}
