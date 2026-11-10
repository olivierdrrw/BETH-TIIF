"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function CheckoutSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("checkout") === "success") {
      // The Stripe webhook, not a browser query string, changes the user's plan.
      router.replace("/dashboard?billing=pending");
    }
  }, [router, searchParams]);

  return null;
}
