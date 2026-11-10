import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";

async function ensureUserProfile(credential: UserCredential) {
  const profileRef = doc(db, COLLECTIONS.USERS, credential.user.uid);
  const existingProfile = await getDoc(profileRef);

  if (!existingProfile.exists()) {
    await setDoc(profileRef, {
      email: credential.user.email,
      role: "member",
      plan: "free",
      privacy: "private",
      showOnLeaderboard: false,
      createdAt: new Date().toISOString(),
    });
  } else {
    await setDoc(profileRef, { email: credential.user.email }, { merge: true });
  }
  return credential;
}

/**
 * Social sign-in. Each provider must be enabled in the Firebase Console
 * (Authentication → Sign-in method) before it will work — this code is
 * ready to go the moment that's turned on, no further changes needed.
 */
export async function loginWithGoogle() {
  return ensureUserProfile(await signInWithPopup(auth, new GoogleAuthProvider()));
}

export async function loginWithGithub() {
  return ensureUserProfile(await signInWithPopup(auth, new GithubAuthProvider()));
}

export async function loginWithFacebook() {
  return ensureUserProfile(await signInWithPopup(auth, new FacebookAuthProvider()));
}

export async function loginWithApple() {
  return ensureUserProfile(await signInWithPopup(auth, new OAuthProvider("apple.com")));
}
