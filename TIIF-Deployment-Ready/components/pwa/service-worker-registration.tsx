"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Silently ignore — offline support is a progressive enhancement,
        // not a requirement for the app to function.
      });
    }
  }, []);

  return null;
}
