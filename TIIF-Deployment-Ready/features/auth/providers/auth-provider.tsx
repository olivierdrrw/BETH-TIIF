"use client";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  useEffect,
} from "react";

import {
  auth,
} from "@/lib/firebase/auth";

import {
  useAuthStore,
} from "../store/auth-store";

export function AuthProvider({

  children,

}: {

  children:
    React.ReactNode;

}) {

  const {
    setUser,
  } = useAuthStore();

  useEffect(() => {

    const unsubscribe =

      onAuthStateChanged(

        auth,

        (user) => {

          setUser(user);

        }

      );

    return () =>
      unsubscribe();

  }, []);

  return <>{children}</>;
}