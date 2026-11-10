import {
    onSnapshot,
    Query,
  } from "firebase/firestore";
  
  export function
  createListener<T>(
    query:
      Query,
    callback:
      (
        data:
          T[]
      ) => void
  ) {
    return onSnapshot(
      query,
      (
        snapshot
      ) => {
        const data =
          snapshot.docs.map(
            (
              doc
            ) => ({
              id:
                doc.id,
              ...doc.data(),
            })
          ) as T[];
  
        callback(
          data
        );
      }
    );
  }