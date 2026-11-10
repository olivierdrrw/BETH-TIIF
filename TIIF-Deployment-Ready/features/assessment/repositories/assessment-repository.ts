import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export class AssessmentRepository {

  static async create(
    data: any
  ) {

    return addDoc(

      collection(
        db,
        "assessments"
      ),

      data

    );
  }
}