"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let active = true;

    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .then((registration) => {
        if (active) {
          registration.update().catch(() => {});
        }
      })
      .catch((error) => {
        console.error("TIIF Service Worker registration failed:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  return null;
}
