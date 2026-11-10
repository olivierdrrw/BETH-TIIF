import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}
