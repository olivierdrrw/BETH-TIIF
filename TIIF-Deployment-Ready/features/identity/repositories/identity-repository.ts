import {
  doc,
  setDoc,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export class IdentityRepository {

  static async save(

    userId: string,

    data: any

  ) {

    return setDoc(

      doc(
        db,
        "identityProfiles",
        userId
      ),

      data,

      {
        merge: true,
      }

    );
  }
}