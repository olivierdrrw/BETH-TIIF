import type { DecodedIdToken } from "firebase-admin/auth";
import { getFirebaseAdminAuth } from "@/lib/firebase/admin";

export type FirebaseRequestAuth =
  | { ok: true; user: DecodedIdToken }
  | { ok: false; response: Response };

export async function verifyFirebaseRequest(
  request: Request
): Promise<FirebaseRequestAuth> {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  if (!token) {
    return {
      ok: false,
      response: Response.json({ error: "Authentication is required." }, { status: 401 }),
    };
  }

  try {
    const user = await getFirebaseAdminAuth().verifyIdToken(token, true);
    return { ok: true, user };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Authentication service unavailable.";
    if (message.includes("FIREBASE_SERVICE_ACCOUNT_JSON")) {
      return {
        ok: false,
        response: Response.json({ error: "Server authentication is not configured." }, { status: 503 }),
      };
    }
    return {
      ok: false,
      response: Response.json({ error: "Your session is invalid or expired. Please sign in again." }, { status: 401 }),
    };
  }
}
