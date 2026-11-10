import { getFirebaseAdminAuth, getFirebaseAdminDb } from "@/lib/firebase/admin";
import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";
import type { UserRole } from "@/types/role";

export const runtime = "nodejs";

const VALID_ROLES: UserRole[] = [
  "member",
  "therapist",
  "researcher",
  "institution_admin",
  "tenant_admin",
  "super_admin",
];

function isSuperAdmin(role: unknown): boolean {
  return role === "super_admin";
}

export async function GET(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;
  if (auth.user.role !== 'super_admin') {
    return Response.json({ error: "You do not have access to role assignments." }, { status: 403 });
  }

  try {
    const snapshot = await getFirebaseAdminDb().collection("roles").get();
    const roles = Object.fromEntries(snapshot.docs.map((document) => [document.id, document.data().role ?? "member"]));
    return Response.json({ roles });
  } catch (error) {
    console.error("Role listing failed:", error);
    return Response.json({ error: "Unable to load role assignments." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;
  if (!isSuperAdmin(auth.user.role)) {
    return Response.json({ error: "Only a super administrator can assign roles." }, { status: 403 });
  }

  try {
    const body = await request.json() as { userId?: unknown; role?: unknown };
    const userId = typeof body.userId === "string" ? body.userId.trim() : "";
    const role = body.role;
    if (!userId || typeof role !== "string" || !VALID_ROLES.includes(role as UserRole)) {
      return Response.json({ error: "A valid userId and role are required." }, { status: 400 });
    }
    if (userId === auth.user.uid && role !== "super_admin") {
      return Response.json({ error: "You cannot remove your own super_admin role in this screen." }, { status: 400 });
    }

    const adminAuth = getFirebaseAdminAuth();
    const target = await adminAuth.getUser(userId);
    await adminAuth.setCustomUserClaims(userId, {
      ...(target.customClaims ?? {}),
      role,
    });
    await getFirebaseAdminDb().collection("roles").doc(userId).set({
      role,
      updatedAt: new Date().toISOString(),
      updatedBy: auth.user.uid,
    }, { merge: true });
    await getFirebaseAdminDb().collection("users").doc(userId).set({ role }, { merge: true });
    await adminAuth.revokeRefreshTokens(userId);

    return Response.json({ success: true, userId, role });
  } catch (error) {
    console.error("Role assignment failed:", error);
    return Response.json({ error: "Unable to update this user's role." }, { status: 500 });
  }
}
