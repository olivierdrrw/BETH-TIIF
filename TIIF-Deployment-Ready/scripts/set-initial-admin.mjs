import fs from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const [uid] = process.argv.slice(2);
const credentialPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!uid || !credentialPath) {
  console.error("Usage: set FIREBASE_SERVICE_ACCOUNT_PATH to a service-account JSON file, then run: node scripts/set-initial-admin.mjs <FIREBASE_UID>");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(credentialPath, "utf8"));
const app = initializeApp({ credential: cert(serviceAccount) });
const auth = getAuth(app);
const db = getFirestore(app);
const user = await auth.getUser(uid);
const existingAdmins = await db.collection("roles").where("role", "==", "super_admin").limit(2).get();
const otherAdmin = existingAdmins.docs.find((document) => document.id !== uid);
if (otherAdmin) {
  console.error("A super_admin is already configured. Use the authenticated admin-management process to grant additional roles.");
  await app.delete();
  process.exit(1);
}
await auth.setCustomUserClaims(uid, { ...(user.customClaims ?? {}), role: "super_admin" });
await db.collection("roles").doc(uid).set({ role: "super_admin", updatedAt: new Date().toISOString() }, { merge: true });
await db.collection("users").doc(uid).set({ role: "super_admin" }, { merge: true });
await auth.revokeRefreshTokens(uid);
console.log(`Assigned super_admin role to ${user.email ?? uid}. Sign in again to refresh the ID token.`);
await app.delete();
