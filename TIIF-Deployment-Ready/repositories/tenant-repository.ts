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
  
  export async function
  getTenants() {
    const snapshot =
      await getDocs(
        collection(
          db,
          COLLECTIONS.TENANTS
        )
      );
  
    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  }
  
  export async function
  createTenant(
    tenant: unknown
  ) {
    await addDoc(
      collection(
        db,
        COLLECTIONS.TENANTS
      ),
      tenant
    );
  }