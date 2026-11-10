import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  getMultiFactorResolver,
} from "firebase/auth";

import {
  auth,
} from "@/lib/firebase/auth";

export async function loginUser(
  email: string,
  password: string,
  rememberMe: boolean = true
) {
  await setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence
  );

  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error?.code === "auth/multi-factor-auth-required") {
      // Re-throw with the resolver attached so the UI can start the
      // phone verification challenge.
      error.mfaResolver = getMultiFactorResolver(auth, error);
    }
    throw error;
  }
}
