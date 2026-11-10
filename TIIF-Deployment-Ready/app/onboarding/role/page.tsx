"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Users,
  BookOpen,
  Stethoscope,
  Building2,
  Landmark,
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { updateUserProfile, type UserProfile } from "@/repositories/user-repository";

const ROLES: { id: NonNullable<UserProfile["role"]>; label: string; icon: any }[] = [
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "parent", label: "Parent", icon: Users },
  { id: "teacher", label: "Teacher", icon: BookOpen },
  { id: "therapist", label: "Therapist", icon: Stethoscope },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "government", label: "Government / NGO", icon: Landmark },
];

export default function OnboardingRolePage() {
  const [selected, setSelected] = useState<UserProfile["role"]>("student");
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  async function handleContinue() {
    if (!selected) return;
    setSaving(true);

    if (user?.uid) {
      await updateUserProfile(user.uid, { role: selected });
    }

    router.push("/assessment");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-4xl font-bold">Who is this for?</h1>
      <p className="mt-4 max-w-md text-zinc-400">
        This helps TIIF tailor your Human Twin™ and dashboard from the start.
      </p>

      <div className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const active = selected === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setSelected(role.id)}
              className={`flex flex-col items-center gap-3 rounded-2xl border p-6 transition ${
                active
                  ? "border-navy-400 bg-navy-500/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-500/10 text-navy-400">
                <Icon size={22} />
              </div>
              <span className="text-sm font-medium">{role.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex items-center gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === 1 ? "w-5 bg-navy-400" : "w-1.5 bg-white/10"
            }`}
          />
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={saving}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-navy-500 px-6 py-3 font-semibold text-white transition hover:bg-navy-400 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Continue"}
      </button>
    </div>
  );
}
