import { getFirebaseAdminDb } from "@/lib/firebase/admin";
import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;
  if (auth.user.role !== 'super_admin') {
    return Response.json({ error: "You do not have access to administrative metrics." }, { status: 403 });
  }

  try {
    const db = getFirebaseAdminDb();
    const [users, humanTwins, assessments, journals] = await Promise.all([
      db.collection("users").count().get(),
      db.collection("human_twins").count().get(),
      db.collection("assessments").count().get(),
      db.collection("journals").count().get(),
    ]);
    return Response.json({
      users: users.data().count,
      humanTwins: humanTwins.data().count,
      assessments: assessments.data().count,
      journals: journals.data().count,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Admin summary failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Unable to load administrative metrics." }, { status: 500 });
  }
}
