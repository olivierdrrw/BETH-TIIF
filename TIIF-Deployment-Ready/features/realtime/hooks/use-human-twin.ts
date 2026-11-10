"use client";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import { useEffect } from "react";

import { db }
from "@/lib/firebase/firestore";

import {
  useHumanTwinStore,
} from "@/stores/human-twin-store";

export function useHumanTwin(
  userId: string
) {
  const updateTwin =
    useHumanTwinStore(
      (state) =>
        state.updateTwin
    );

  useEffect(() => {
    const unsubscribe =
      onSnapshot(
        doc(
          db,
          "human_twins",
          userId
        ),
        (snapshot) => {

          if (
            snapshot.exists()
          ) {
            updateTwin(
              snapshot.data()
            );
          }

        }
      );

    return unsubscribe;
  }, [userId]);
}