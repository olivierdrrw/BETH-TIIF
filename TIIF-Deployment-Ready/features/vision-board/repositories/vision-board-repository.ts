import {
 collection,
 addDoc,
 getDocs,
 query,
 where,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export class VisionBoardRepository {

 static async create(
  item:any
 ){

  return addDoc(

   collection(
    db,
    "visionBoards"
   ),

   item

  );

 }

 static async getUserItems(
  userId:string
 ){

  const q=query(

   collection(
    db,
    "visionBoards"
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