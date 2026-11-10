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
  
  import {
    SecurityEvent,
  } from "@/types/security-event";
  
  export async function
  createSecurityEvent(
    event:
      Omit<
        SecurityEvent,
        "id"
      >
  ) {
    await addDoc(
      collection(
        db,
        COLLECTIONS.SECURITY_EVENTS
      ),
      event
    );
  }