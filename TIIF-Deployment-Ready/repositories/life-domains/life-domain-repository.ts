import {
  doc,
  setDoc,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

import {
  LifeDomainResults,
} from "@/features/life-domains/types/life-domain";

export class LifeDomainRepository {

  static async save(
    userId: string,
    results: LifeDomainResults
  ) {
    await setDoc(
      doc(
        db,
        "life_domains",
        userId
      ),
      {
        ...results,
        updatedAt:
          new Date()
            .toISOString(),
      }
    );
  }
}