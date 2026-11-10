import { getFirebaseAdminDb } from "@/lib/firebase/admin";
import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;
  if (auth.user.role !== "super_admin") {
    return Response.json({ error: "Only a super administrator can view global evidence metrics." }, { status: 403 });
  }

  try {
    const db = getFirebaseAdminDb();
    const [users, journals, assessments, feedback, recommend] = await Promise.all([
      db.collection("users").count().get(),
      db.collection("journals").count().get(),
      db.collection("assessments").count().get(),
      db.collection("feedback").count().get(),
      db.collection("feedback").where("wouldRecommend", "==", true).count().get(),
    ]);
    return Response.json({
      users: users.data().count,
      journalEntries: journals.data().count,
      assessments: assessments.data().count,
      feedbackCount: feedback.data().count,
      recommendCount: recommend.data().count,
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Admin evidence metrics failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Unable to load evidence metrics." }, { status: 500 });
  }
}
