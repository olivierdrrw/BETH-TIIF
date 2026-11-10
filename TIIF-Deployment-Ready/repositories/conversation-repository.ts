import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    orderBy,
  } from "firebase/firestore";
  
  import {
    db,
  } from "@/lib/firebase/firestore";
  
  import {
    COLLECTIONS,
  } from "@/lib/firebase/collections";
  
  import {
    Conversation,
  } from "@/types/conversation";
  
  export async function
  createConversation(
    conversation:
      Omit<
        Conversation,
        "id"
      >
  ) {
    await addDoc(
      collection(
        db,
        COLLECTIONS.AI_SESSIONS
      ),
      conversation
    );
  }
  
  export async function
  getConversations(
    userId: string
  ) {
    const q = query(
      collection(
        db,
        COLLECTIONS.AI_SESSIONS
      ),
      where(
        "userId",
        "==",
        userId
      ),
      orderBy(
        "createdAt",
        "asc"
      )
    );
  
    const snapshot =
      await getDocs(q);
  
    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Conversation[];
  }