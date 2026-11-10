import {
 doc,
 getDoc,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

import { COLLECTIONS } from "@/lib/firebase/collections";

export async function isAdmin(
 uid:string
){

 const snap =
 await getDoc(

  doc(
   db,
   COLLECTIONS.ROLES,
   uid
  )

 );

 return (
  snap.data()?.role
  ===
  "super_admin"
 );

}