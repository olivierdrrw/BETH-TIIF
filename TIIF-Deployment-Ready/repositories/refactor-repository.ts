import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

import { HumanTwin }
from "@/types/human-twin";

export class HumanTwinRepository {

  static async save(
    userId: string,
    twin: HumanTwin
  ) {
    await setDoc(
      doc(
        db,
        "human_twins",
        userId
      ),
      twin
    );
  }

  static async get(
    userId: string
  ): Promise<HumanTwin | null> {

    const snapshot =
      await getDoc(
        doc(
          db,
          "human_twins",
          userId
        )
      );

    if (!snapshot.exists())
      return null;

    return snapshot.data() as HumanTwin;
  }
}