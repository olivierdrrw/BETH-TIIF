import { getFirebaseAdminDb } from "@/lib/firebase/admin";
import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;
  if (auth.user.role !== 'super_admin') {
    return Response.json({ error: "You do not have access to the user directory." }, { status: 403 });
  }

  try {
    const snapshot = await getFirebaseAdminDb()
      .collection("users")
      .select("email", "firstName", "lastName", "createdAt", "role")
      .limit(500)
      .get();
    const users = snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
    return Response.json({ users }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Admin user directory failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Unable to load the user directory." }, { status: 500 });
  }
}
