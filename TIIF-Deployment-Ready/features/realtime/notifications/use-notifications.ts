"use client";

import {
  collection,
  onSnapshot,
  type Timestamp,
} from "firebase/firestore";

import { useEffect } from "react";
import { query, where } from "firebase/firestore";
import { useAuthStore } from "@/features/auth/store/auth-store";

import { db }
from "@/lib/firebase/firestore";

import {
  useNotificationStore,
  type AppNotification,
} from "@/features/notifications/store/notification-store";

type NotificationDocument = Partial<Omit<AppNotification, "createdAt">> & {
  createdAt?: string | Timestamp;
};

function toAppNotification(id: string, value: unknown): AppNotification | null {
  if (!value || typeof value !== "object") return null;
  const data = value as NotificationDocument;
  if (typeof data.title !== "string" || typeof data.message !== "string") return null;

  const createdAt =
    typeof data.createdAt === "string"
      ? data.createdAt
      : data.createdAt?.toDate().toISOString() ?? new Date().toISOString();

  return {
    id,
    title: data.title,
    message: data.message,
    type: data.type,
    read: data.read === true,
    createdAt,
  };
}

export function useNotifications() {
  const user = useAuthStore((state) => state.user);
  const addNotification =
    useNotificationStore(
      (s) =>
        s.addNotification
    );

  useEffect(() => {
    if (!user?.uid) return;

    const notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
    );

    const unsubscribe = onSnapshot(
        notificationsQuery,
        (snapshot) => {

          snapshot.docChanges()
            .forEach(
              (change) => {

                if (
                  change.type ===
                  "added"
                ) {

                  const notification = toAppNotification(
                    change.doc.id,
                    change.doc.data(),
                  );
                  if (notification) addNotification(notification);

                }

              }
            );

        }
      );

    return unsubscribe;

  }, [user?.uid, addNotification]);
}