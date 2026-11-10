import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { registerUser } from "@/features/auth/services/register";

export class AuthService {
  static register(email: string, password: string) {
    return registerUser(email, password);
  }

  static login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  }

  static logout() {
    return signOut(auth);
  }
}

// Named exports are retained for the existing login/register screens.
export const register = registerUser;
export const login = AuthService.login;
export const logout = AuthService.logout;
