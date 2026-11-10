"use client";

import {
  useEffect,
} from "react";

import {
  subscribeToHumanTwin,
}
from "../realtime/human-twin-listener";

import {
  useHumanTwinStore,
}
from "../store/human-twin-store";

export function useHumanTwin(
  userId: string
) {

  const {
    setTwin,
  } = useHumanTwinStore();

  useEffect(() => {

    const unsubscribe =

      subscribeToHumanTwin(

        userId,

        (data) => {

          setTwin(data);

        }

      );

    return () =>
      unsubscribe();

  }, [userId]);

}