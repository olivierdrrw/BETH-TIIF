"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { doc, setDoc } from "firebase/firestore";

import { Check } from "lucide-react";

import { TwinCreationAnimation } from "@/components/twin-creation-animation";
import { WizardProgress } from "@/features/human-twin-wizard/components/wizard-progress";
import { useHumanTwinWizard } from "@/hooks/use-human-twin-wizard";
import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";
import { generateHumanTwin } from "@/features/human-twin/services/human-twin-generator";

export default function CreateHumanTwinPage() {
  const { currentStep, steps, next } = useHumanTwinWizard();
  const [isComplete, setIsComplete] = useState(false);

  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setTwin = useHumanTwinStore((state) => state.setTwin);

  useEffect(() => {
    if (currentStep >= steps.length) {
      setIsComplete(true);

      async function finish() {
        if (user?.uid) {
          const twin = await generateHumanTwin({
            userId: user.uid,
            identity: 50,
            purpose: 50,
            domains: {},
            goals: [],
          });

          await setDoc(doc(db, COLLECTIONS.HUMAN_TWINS, user.uid), twin);

          setTwin({
            identity: twin.identityScore,
            growth: twin.growthScore,
            wellbeing: twin.wellbeingScore,
            resilience: twin.resilienceScore,
            aiConfidence: 70,
            emotionalState: "Calm",
          });
        }

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      }

      finish();
      return;
    }

    const timer = setTimeout(next, 1800);
    return () => clearTimeout(timer);
  }, [currentStep]);

  if (isComplete) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-success-400/30 bg-success-500/10">
          <Check size={40} className="text-success-400" />
        </div>

        <h1 className="mt-8 text-3xl font-bold">Your Human Twin™ is ready</h1>

        <p className="mt-4 text-slate-400">
          Identity, growth, wellbeing and resilience scores have been generated. Taking you to
          your dashboard…
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-between gap-12 px-10">
      <div>
        <h1 className="mb-10 text-5xl font-bold">Creating Your Human Twin™</h1>

        <WizardProgress currentStep={currentStep} steps={steps} />
      </div>

      <TwinCreationAnimation />
    </div>
  );
}
