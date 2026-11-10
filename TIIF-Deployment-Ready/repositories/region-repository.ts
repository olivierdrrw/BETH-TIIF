import {
    collection,
    getDocs,
  } from "firebase/firestore";
  
  import {
    db,
  } from "@/lib/firebase/firestore";
  
  import {
    COLLECTIONS,
  } from "@/lib/firebase/collections";
  
  import {
    Region,
  } from "@/types/region";
  
  export async function
  getRegions() {
    const snapshot =
      await getDocs(
        collection(
          db,
          COLLECTIONS.REGIONS
        )
      );
  
    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Region[];
  }