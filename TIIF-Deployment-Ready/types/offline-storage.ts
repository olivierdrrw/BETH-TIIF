import {
 openDB
}
from "idb";

export const dbPromise =
openDB(

 "tiif",

 1,

 {

  upgrade(db){

   db.createObjectStore(
    "offlineGoals"
   );

   db.createObjectStore(
    "offlineJournal"
   );

  },

 }

);