import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Message } from "@/features/messages/message.type";

/** Deterministic conversation ID shared by both participants, regardless of order. */
export function conversationIdFor(userA: string, userB: string): string {
  return [userA, userB].sort().join("_");
}

export async function sendMessage(
  senderId: string,
  receiverId: string,
  content: string
) {
  const conversationId = conversationIdFor(senderId, receiverId);

  await addDoc(collection(db, COLLECTIONS.MESSAGES), {
    conversationId,
    senderId,
    receiverId,
    content,
    createdAt: new Date().toISOString(),
  });

  // One doc per conversation, used to list "recent conversations" cheaply.
  await setDoc(
    doc(db, COLLECTIONS.CONVERSATIONS, conversationId),
    {
      participants: [senderId, receiverId],
      lastMessage: content,
      lastSenderId: senderId,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

/** Realtime subscription to a single conversation's messages, oldest first. */
export function subscribeToConversation(
  userA: string,
  userB: string,
  callback: (messages: Message[]) => void
) {
  const conversationId = conversationIdFor(userA, userB);

  return onSnapshot(
    query(
      collection(db, COLLECTIONS.MESSAGES),
      where("conversationId", "==", conversationId),
      orderBy("createdAt", "asc")
    ),
    (snapshot) => {
      callback(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Message))
      );
    }
  );
}

export interface ConversationSummary {
  id: string;
  participants: string[];
  lastMessage: string;
  lastSenderId: string;
  updatedAt: string;
}

/** Realtime subscription to a user's conversation list, most recent first. */
export function subscribeToConversations(
  userId: string,
  callback: (conversations: ConversationSummary[]) => void
) {
  return onSnapshot(
    query(
      collection(db, COLLECTIONS.CONVERSATIONS),
      where("participants", "array-contains", userId),
      orderBy("updatedAt", "desc")
    ),
    (snapshot) => {
      callback(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ConversationSummary))
      );
    }
  );
}
