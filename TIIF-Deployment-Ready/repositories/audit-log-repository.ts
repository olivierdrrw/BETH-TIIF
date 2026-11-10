import {
    addDoc,
    collection,
  } from "firebase/firestore";
  
  import {
    db,
  } from "@/lib/firebase/firestore";
  
  import {
    COLLECTIONS,
  } from "@/lib/firebase/collections";
  
  export async function
  createAuditLog(
    log: unknown
  ) {
    await addDoc(
      collection(
        db,
        COLLECTIONS.AUDIT_LOGS
      ),
      log
    );
  }