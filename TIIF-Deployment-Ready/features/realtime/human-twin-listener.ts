import {

 doc,

 onSnapshot,

} from "firebase/firestore";

import { db }
from "@/lib/firebase/firestore";

export function listenHumanTwin(

 userId:string,

 callback:any

){

 return onSnapshot(

  doc(
   db,
   "humanTwins",
   userId
  ),

  (snapshot)=>{

   callback(
    snapshot.data()
   );

  }

 );

}