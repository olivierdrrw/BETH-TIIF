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
    MemoryRecord,
  } from "@/types/memory";
  
  export async function
  createMemory(
    memory:
      Omit<
        MemoryRecord,
        "id"
      >
  ) {
    await addDoc(
      collection(
        db,
        COLLECTIONS.JOURNALS
      ),
      memory
    );
  }
  
  export async function
  getMemories() {
    const snapshot =
      await getDocs(
        collection(
          db,
          COLLECTIONS.JOURNALS
        )
      );
  
    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as MemoryRecord[];
  }