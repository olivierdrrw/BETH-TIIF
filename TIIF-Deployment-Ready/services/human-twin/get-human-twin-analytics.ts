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
  
  export async function
  getHumanTwinAnalytics() {
  
    const snapshot =
      await getDocs(
        collection(
          db,
          COLLECTIONS.HUMAN_TWINS
        )
      );
  
    const twins =
      snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
  
    const wellness =
      twins.map(
        (t: any) =>
          t.wellnessScore ??
          0
      );
  
    const average =
      wellness.length === 0
        ? 0
        : Math.round(
            wellness.reduce(
              (
                sum,
                score
              ) =>
                sum +
                score,
              0
            ) /
              wellness.length
          );
  
    return {
      totalHumanTwins:
        twins.length,
  
      averageWellnessScore:
        average,
    };
  }