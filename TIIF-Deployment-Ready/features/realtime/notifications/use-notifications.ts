"use client";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { useEffect }
from "react";

import { db }
from "@/lib/firebase/firestore";

import {
  useNotificationStore,
} from "@/features/notifications/store/notification-store";

export function useNotifications() {

  const addNotification =
    useNotificationStore(
      (s) =>
        s.addNotification
    );

  useEffect(() => {

    const unsubscribe =
      onSnapshot(
        collection(
          db,
          "notifications"
        ),
        (snapshot) => {

          snapshot.docChanges()
            .forEach(
              (change) => {

                if (
                  change.type ===
                  "added"
                ) {

                  addNotification({
                    id:
                      change.doc.id,
                    ...change.doc.data(),
                  });

                }

              }
            );

        }
      );

    return unsubscribe;

  }, []);
}