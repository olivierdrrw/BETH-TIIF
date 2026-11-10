import {
    create,
  } from "zustand";
  
  import {
    UserSession,
  } from "@/types/session";
  
  interface SessionState {
    session:
      UserSession | null;
  
    setSession:
      (
        session:
          UserSession
      ) => void;
  
    clearSession:
      () => void;
  }
  
  export const
  useSessionStore =
    create<
      SessionState
    >(
      (set) => ({
        session: null,
  
        setSession:
          (session) =>
            set({
              session,
            }),
  
        clearSession:
          () =>
            set({
              session: null,
            }),
      })
    );