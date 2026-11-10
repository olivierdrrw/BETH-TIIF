import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Therapist, TherapyBooking } from "../therapist.type";

export class TherapyRepository {
  static async getTherapists(): Promise<Therapist[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.THERAPISTS));
    return snapshot.docs.map(
      (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Therapist)
    );
  }

  static async addTherapist(therapist: Omit<Therapist, "id">) {
    return addDoc(collection(db, COLLECTIONS.THERAPISTS), therapist);
  }

  static async createBooking(booking: Omit<TherapyBooking, "id">) {
    return addDoc(collection(db, COLLECTIONS.THERAPY_BOOKINGS), booking);
  }

  static async getUserBookings(userId: string): Promise<TherapyBooking[]> {
    const snapshot = await getDocs(
      query(collection(db, COLLECTIONS.THERAPY_BOOKINGS), where("userId", "==", userId))
    );
    return snapshot.docs.map(
      (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as TherapyBooking)
    );
  }

  static async getTherapistBookings(therapistId: string): Promise<TherapyBooking[]> {
    const snapshot = await getDocs(
      query(collection(db, COLLECTIONS.THERAPY_BOOKINGS), where("therapistId", "==", therapistId))
    );
    return snapshot.docs.map(
      (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as TherapyBooking)
    );
  }

  static async updateBookingStatus(
    bookingId: string,
    status: TherapyBooking["status"]
  ) {
    await updateDoc(doc(db, COLLECTIONS.THERAPY_BOOKINGS, bookingId), { status });
  }
}
