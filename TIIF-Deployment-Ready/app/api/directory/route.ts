import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";
import { getFirebaseAdminDb } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;

  try {
    const url = new URL(request.url);
    const search = (url.searchParams.get("q") ?? "").trim().toLowerCase().slice(0, 80);
    const snapshot = await getFirebaseAdminDb()
      .collection("users")
      .where("privacy", "==", "public")
      .select("firstName", "lastName", "avatarUrl")
      .limit(100)
      .get();

    const users = snapshot.docs
      .filter((document) => document.id !== auth.user.uid)
      .map((document) => {
        const data = document.data();
        return {
          id: document.id,
          firstName: typeof data.firstName === "string" ? data.firstName.slice(0, 80) : "",
          lastName: typeof data.lastName === "string" ? data.lastName.slice(0, 80) : "",
          avatarUrl: typeof data.avatarUrl === "string" ? data.avatarUrl : undefined,
        };
      })
      .filter((profile) => !search || `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(search));

    return Response.json({ users }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Public member directory failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Unable to load the member directory." }, { status: 500 });
  }
}
