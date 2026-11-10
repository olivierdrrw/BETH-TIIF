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
    ResearchStudy,
  } from "@/types/research";
  
  export async function
  createResearchStudy(
    study:
      Omit<
        ResearchStudy,
        "id"
      >
  ) {
    await addDoc(
      collection(
        db,
        COLLECTIONS.RESEARCH_DATA
      ),
      study
    );
  }
  
  export async function
  getResearchStudies() {
    const snapshot =
      await getDocs(
        collection(
          db,
          COLLECTIONS.RESEARCH_DATA
        )
      );
  
    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as ResearchStudy[];
  }