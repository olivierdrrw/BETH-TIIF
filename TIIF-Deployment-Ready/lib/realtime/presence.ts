import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";

const HEARTBEAT_MS = 30_000;
const STALE_AFTER_MS = 60_000;

let heartbeatTimer: ReturnType<typeof setInterval> | null = null;

/** Marks the current user online and refreshes a heartbeat every 30s. Call the
 * returned cleanup function on unmount to mark them offline immediately. */
export function startPresence(userId: string) {
  const ref = doc(db, COLLECTIONS.PRESENCE, userId);

  const beat = () => setDoc(ref, { online: true, lastSeen: new Date().toISOString() });
  beat();
  heartbeatTimer = setInterval(beat, HEARTBEAT_MS);

  const markOffline = () => setDoc(ref, { online: false, lastSeen: new Date().toISOString() });
  window.addEventListener("beforeunload", markOffline);

  return () => {
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    window.removeEventListener("beforeunload", markOffline);
    markOffline();
  };
}

/** Subscribes to whether a given user is currently online (heartbeat within the last minute). */
export function subscribeToPresence(
  userId: string,
  callback: (online: boolean) => void
) {
  return onSnapshot(doc(db, COLLECTIONS.PRESENCE, userId), (snap) => {
    const data = snap.data();
    if (!data?.online) return callback(false);
    const isStale = Date.now() - new Date(data.lastSeen).getTime() > STALE_AFTER_MS;
    callback(!isStale);
  });
}
