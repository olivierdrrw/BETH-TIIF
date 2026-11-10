import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { CalendarEvent } from "../types/calendar-event";

export class CalendarRepository {
  static async create(event: Omit<CalendarEvent, "id">) {
    return addDoc(collection(db, COLLECTIONS.CALENDAR_EVENTS), event);
  }

  static async getByUser(userId: string): Promise<CalendarEvent[]> {
    const snapshot = await getDocs(
      query(collection(db, COLLECTIONS.CALENDAR_EVENTS), where("userId", "==", userId))
    );

    return snapshot.docs.map(
      (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as CalendarEvent)
    );
  }

  static async remove(eventId: string) {
    await deleteDoc(doc(db, COLLECTIONS.CALENDAR_EVENTS, eventId));
  }
}
