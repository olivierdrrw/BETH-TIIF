"use client";

import { PremiumButton } from "@/components/ui/premium-button";

export default function HeroActions() {
  return (
    <div className="flex justify-center gap-5">

      <PremiumButton>

        Continue Journey

      </PremiumButton>

      <PremiumButton variant="secondary">

        Open Brain Map

      </PremiumButton>

    </div>
  );
}