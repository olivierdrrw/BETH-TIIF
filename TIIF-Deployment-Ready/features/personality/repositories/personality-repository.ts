import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import type { PersonalityProfile } from "../types/personality";

const COLLECTION = "personalityProfiles";

export class PersonalityRepository {
  static async save(userId: string, profile: PersonalityProfile) {
    await setDoc(doc(db, COLLECTION, userId), profile);
  }

  static async get(userId: string): Promise<PersonalityProfile | null> {
    const snap = await getDoc(doc(db, COLLECTION, userId));
    return snap.exists() ? (snap.data() as PersonalityProfile) : null;
  }
}
