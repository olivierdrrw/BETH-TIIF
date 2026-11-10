"use client";

import { useEffect } from "react";

import {
  subscribeHumanTwin,
  type HumanTwinSnapshot,
} from "../realtime/human-twin-listener";

import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";

interface HumanTwinProviderProps {
  userId: string;
  children: React.ReactNode;
}

export function HumanTwinProvider({
  userId,
  children,
}: HumanTwinProviderProps) {
  const { setTwin } = useHumanTwinStore();

  useEffect(() => {
    return subscribeHumanTwin(userId, (twin: HumanTwinSnapshot) => {
      setTwin(twin);
    });
  }, [userId, setTwin]);

  return children;
}

export default HumanTwinProvider;
