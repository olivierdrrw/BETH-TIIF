import {
    collection,
    getCountFromServer,
  } from "firebase/firestore";
  
  import { db }
  from "@/lib/firebase/firestore";
  
  import { COLLECTIONS }
  from "@/lib/firebase/collections";
  
  export async function
  getTotalUsers() {
  
    const snapshot =
      await getCountFromServer(
        collection(
          db,
          COLLECTIONS.USERS
        )
      );
  
    return snapshot.data().count;
  }