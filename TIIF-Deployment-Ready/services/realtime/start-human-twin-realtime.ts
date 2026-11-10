import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/firestore";

import {
  useHumanTwinStore,
} from "@/domains/human-twin/store";

export function
startHumanTwinRealtime(
  twinId: string
) {
  return onSnapshot(
    doc(
      db,
      "humanTwins",
      twinId
    ),
    (snapshot) => {
      useHumanTwinStore
        .getState()
        .setTwin({
          id:
            snapshot.id,
          ...snapshot.data(),
        } as never);
    }
  );
}