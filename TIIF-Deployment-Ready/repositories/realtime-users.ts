import {
    addDoc,
    collection,
    onSnapshot,
  } from "firebase/firestore";
  
  import {
    db,
  } from "@/lib/firebase/firestore";
  
  import {
    COLLECTIONS,
  } from "@/lib/firebase/collections";
  
  export async function
  createNotification(
    notification:
      unknown
  ) {
    await addDoc(
      collection(
        db,
        COLLECTIONS.NOTIFICATIONS
      ),
      notification
    );
  }
  
  export function
  subscribeNotifications(
    callback:
      (
        notifications:
          unknown[]
      ) => void
  ) {
    return onSnapshot(
      collection(
        db,
        COLLECTIONS.NOTIFICATIONS
      ),
      (
        snapshot
      ) => {
        callback(
          snapshot.docs.map(
            (
              doc
            ) => ({
              id:
                doc.id,
              ...doc.data(),
            })
          )
        );
      }
    );
  }