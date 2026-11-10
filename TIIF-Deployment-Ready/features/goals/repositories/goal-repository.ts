import {

 collection,

 addDoc,

 getDocs,

 doc,

 updateDoc,

 query,

 where,

} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export class GoalRepository {

 static async create(
  goal:any
 ){

  return addDoc(

   collection(
    db,
    "goals"
   ),

   goal

  );

 }

 static async update(
  goalId: string,
  data: Record<string, unknown>
 ) {

  await updateDoc(
   doc(db, "goals", goalId),
   data
  );

 }

 static async getUserGoals(
  userId:string
 ){

  const q=query(

   collection(
    db,
    "goals"
   ),

   where(
    "userId",
    "==",
    userId
   )

  );

  const snapshot=
  await getDocs(q);

  return snapshot.docs.map(
   doc=>({
    id:doc.id,
    ...doc.data(),
   })
  );

 }

}