import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  runTransaction,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { auth } from "@/lib/firebase/auth";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { CommunityPost, CommunityComment } from "../types/post";
import type { CommunityGroup } from "../types/group";
import type { Challenge } from "../types/challenge";
import type { MentorCircle } from "../mentor-circles";
import type { CommunityEvent } from "../types/event";

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function getPosts(): Promise<CommunityPost[]> {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.COMMUNITY_POSTS),
      orderBy("createdAt", "desc")
    )
  );

  return snapshot.docs.map(
    (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as CommunityPost)
  );
}

export async function createPost(
  authorId: string,
  content: string
): Promise<void> {
  await addDoc(collection(db, COLLECTIONS.COMMUNITY_POSTS), {
    authorId,
    content,
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
  });
}

export async function likePost(postId: string): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.COMMUNITY_POSTS, postId), {
    likes: increment(1),
  });
}

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

export async function getComments(postId: string): Promise<CommunityComment[]> {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTIONS.COMMUNITY_POSTS, postId, "comments"),
      orderBy("createdAt", "asc")
    )
  );

  return snapshot.docs.map(
    (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as CommunityComment)
  );
}

export async function addComment(
  postId: string,
  authorId: string,
  content: string
): Promise<void> {
  await addDoc(collection(db, COLLECTIONS.COMMUNITY_POSTS, postId, "comments"), {
    postId,
    authorId,
    content,
    createdAt: new Date().toISOString(),
  });

  await updateDoc(doc(db, COLLECTIONS.COMMUNITY_POSTS, postId), {
    comments: increment(1),
  });
}

// ---------------------------------------------------------------------------
// Groups
// ---------------------------------------------------------------------------

export async function getGroups(): Promise<CommunityGroup[]> {
  const snapshot = await getDocs(collection(db, COLLECTIONS.COMMUNITY_GROUPS));

  return snapshot.docs.map(
    (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as CommunityGroup)
  );
}

// ---------------------------------------------------------------------------
// Challenges
// ---------------------------------------------------------------------------

export async function getChallenges(): Promise<Challenge[]> {
  const snapshot = await getDocs(collection(db, COLLECTIONS.COMMUNITY_CHALLENGES));

  return snapshot.docs.map(
    (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Challenge)
  );
}

// ---------------------------------------------------------------------------
// Mentor Circles
// ---------------------------------------------------------------------------

export async function getMentorCircles(): Promise<MentorCircle[]> {
  const snapshot = await getDocs(collection(db, COLLECTIONS.MENTOR_CIRCLES));

  return snapshot.docs.map(
    (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as MentorCircle)
  );
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export async function getEvents(): Promise<CommunityEvent[]> {
  const snapshot = await getDocs(
    query(collection(db, COLLECTIONS.COMMUNITY_EVENTS), orderBy("date", "asc"))
  );

  return snapshot.docs.map(
    (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as CommunityEvent)
  );
}

export async function rsvpEvent(eventId: string): Promise<void> {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Sign in to RSVP to this event.");

  const eventRef = doc(db, COLLECTIONS.COMMUNITY_EVENTS, eventId);
  const rsvpRef = doc(db, COLLECTIONS.COMMUNITY_EVENTS, eventId, "rsvps", userId);

  await runTransaction(db, async (transaction) => {
    const [eventSnapshot, rsvpSnapshot] = await Promise.all([
      transaction.get(eventRef),
      transaction.get(rsvpRef),
    ]);
    if (!eventSnapshot.exists()) throw new Error("This event no longer exists.");
    if (rsvpSnapshot.exists()) return;

    transaction.set(rsvpRef, {
      userId,
      createdAt: new Date().toISOString(),
    });
    transaction.update(eventRef, {
      attendeeCount: (eventSnapshot.data().attendeeCount ?? 0) + 1,
    });
  });
}
