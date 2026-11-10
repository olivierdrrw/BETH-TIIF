import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export class MemoryRepository {

  static async save(
    memory: any
  ) {

    return addDoc(

      collection(
        db,
        "humanTwinMemory"
      ),

      memory

    );
  }
}