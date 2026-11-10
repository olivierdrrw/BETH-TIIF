import {
    addDoc,
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
    Institution,
  } from "@/types/institution";
  
  export async function
  createInstitution(
    institution:
      Omit<
        Institution,
        "id"
      >
  ) {
    await addDoc(
      collection(
        db,
        COLLECTIONS.INSTITUTIONS
      ),
      institution
    );
  }
  
  export async function
  getInstitutions() {
    const snapshot =
      await getDocs(
        collection(
          db,
          COLLECTIONS.INSTITUTIONS
        )
      );
  
    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Institution[];
  }