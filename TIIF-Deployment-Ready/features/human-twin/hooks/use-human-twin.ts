"use client";

import { useEffect } from "react";
import { subscribeToHumanTwin } from "../realtime/human-twin-listener";
import { useHumanTwinStore } from "@/stores/human-twin-store";

export function useHumanTwin(userId: string) {
  const updateTwin = useHumanTwinStore((state) => state.updateTwin);

  useEffect(() => {
    if (!userId) return;

    return subscribeToHumanTwin(userId, (data) => {
      if (data) updateTwin(data);
    });
  }, [userId, updateTwin]);
}
