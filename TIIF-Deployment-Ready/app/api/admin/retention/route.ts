import { getFirebaseAdminDb } from "@/lib/firebase/admin";
import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";

export const runtime = "nodejs";

const USER_LIMIT = 5_000;
const ACTIVITY_LIMIT = 20_000;
const DAY_MS = 24 * 60 * 60 * 1000;

function toMillis(value: unknown): number | null {
  if (typeof value === "string" || typeof value === "number") {
    const result = typeof value === "number" ? value : Date.parse(value);
    return Number.isFinite(result) ? result : null;
  }
  if (value && typeof value === "object" && "toDate" in value
    && typeof (value as { toDate?: unknown }).toDate === "function") {
    const result = (value as { toDate: () => Date }).toDate().getTime();
    return Number.isFinite(result) ? result : null;
  }
  return null;
}

export async function GET(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;
  if (auth.user.role !== "super_admin") {
    return Response.json({ error: "Only a super administrator can view global retention metrics." }, { status: 403 });
  }

  try {
    const db = getFirebaseAdminDb();
    const [usersSnapshot, journalsSnapshot, moodsSnapshot] = await Promise.all([
      db.collection("users").select("createdAt").orderBy("createdAt", "desc").limit(USER_LIMIT).get(),
      db.collection("journals").select("userId", "createdAt").orderBy("createdAt", "desc").limit(ACTIVITY_LIMIT).get(),
      db.collection("moodEntries").select("userId", "createdAt").orderBy("createdAt", "desc").limit(ACTIVITY_LIMIT).get(),
    ]);

    const users = usersSnapshot.docs
      .map((document) => ({ id: document.id, createdAt: toMillis(document.data().createdAt) }))
      .filter((user): user is { id: string; createdAt: number } => user.createdAt !== null);

    const activityByUser = new Map<string, number[]>();
    for (const document of [...journalsSnapshot.docs, ...moodsSnapshot.docs]) {
      const data = document.data();
      const userId = typeof data.userId === "string" ? data.userId : "";
      const timestamp = toMillis(data.createdAt);
      if (!userId || timestamp === null) continue;
      const existing = activityByUser.get(userId) ?? [];
      existing.push(timestamp);
      activityByUser.set(userId, existing);
    }

    function retentionAt(days: number): number {
      const intervalStartOffset = days * DAY_MS;
      const now = Date.now();
      const eligible = users.filter((user) => now >= user.createdAt + intervalStartOffset);
      if (!eligible.length) return 0;
      const retained = eligible.filter((user) => {
        const start = user.createdAt + intervalStartOffset;
        const end = start + DAY_MS;
        return (activityByUser.get(user.id) ?? []).some((timestamp) => timestamp >= start && timestamp < end);
      });
      return Math.round((retained.length / eligible.length) * 100);
    }

    const sampleLimited = usersSnapshot.size >= USER_LIMIT
      || journalsSnapshot.size >= ACTIVITY_LIMIT
      || moodsSnapshot.size >= ACTIVITY_LIMIT;

    return Response.json({
      d1: retentionAt(1),
      d7: retentionAt(7),
      d30: retentionAt(30),
      totalUsers: users.length,
      sampleLimited,
      sampleLimits: { users: USER_LIMIT, activityRecordsPerCollection: ACTIVITY_LIMIT },
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Admin retention metrics failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Unable to calculate retention metrics." }, { status: 500 });
  }
}
