import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import type { Habit } from "../types/habit";

const COLLECTION = "habits";

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function isYesterday(a: Date, b: Date) {
  const yesterday = new Date(b);
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(a, yesterday);
}

export class HabitRepository {
  static async create(userId: string, title: string) {
    return addDoc(collection(db, COLLECTION), {
      userId,
      title,
      streak: 0,
      lastCheckedAt: null,
      createdAt: new Date().toISOString(),
    });
  }

  static async getByUser(userId: string): Promise<Habit[]> {
    const snapshot = await getDocs(
      query(collection(db, COLLECTION), where("userId", "==", userId))
    );
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Habit));
  }

  /**
   * Checks a habit off for today. Streak increments if the last check-in
   * was yesterday, stays flat if it's already today, resets to 1 otherwise.
   */
  static async checkIn(habit: Habit): Promise<{ streak: number; alreadyDone: boolean }> {
    const now = new Date();
    const last = habit.lastCheckedAt ? new Date(habit.lastCheckedAt) : null;

    if (last && isSameDay(last, now)) {
      return { streak: habit.streak, alreadyDone: true };
    }

    const nextStreak = last && isYesterday(last, now) ? habit.streak + 1 : 1;

    await updateDoc(doc(db, COLLECTION, habit.id), {
      streak: nextStreak,
      lastCheckedAt: now.toISOString(),
    });

    return { streak: nextStreak, alreadyDone: false };
  }
}
