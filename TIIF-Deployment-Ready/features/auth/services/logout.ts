import {
  signOut,
} from "firebase/auth";

import {
  auth,
} from "@/lib/firebase/auth";

export async function logoutUser() {

  return signOut(auth);
}