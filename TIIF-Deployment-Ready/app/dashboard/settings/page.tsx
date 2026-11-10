"use client";

import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import {
  getUserProfile,
  updateUserProfile,
  type UserProfile,
} from "@/repositories/user-repository";
import { locales } from "@/i18n/config";
import { TwoFactorSettings } from "@/features/auth/components/two-factor-settings";
import { AvatarUploader } from "@/features/avatar/components/avatar-uploader";
import { TagInput } from "@/components/ui/tag-input";
import { plans } from "@/features/billing/types/plan";
import Link from "next/link";

const TIMEZONES = [
  "UTC",
  "Africa/Kigali",
  "Africa/Nairobi",
  "Africa/Lagos",
  "Europe/London",
  "Europe/Paris",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Dubai",
];

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState<UserProfile>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    getUserProfile(user.uid).then((data) => {
      setProfile(data ?? {});
      setIsLoading(false);
    });
  }, [user?.uid]);

  function update<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    if (!user?.uid) return;
    setIsSaving(true);
    await updateUserProfile(user.uid, profile);
    setIsSaving(false);
    setSaved(true);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-24 text-slate-500">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-slate-400">Manage your profile and preferences.</p>
      </div>

      {/* Profile */}
      <section className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Profile
        </h2>

        <AvatarUploader
          currentUrl={profile.avatarUrl}
          onUploaded={(url) => update("avatarUrl", url)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name">
            <input
              value={profile.firstName ?? ""}
              onChange={(e) => update("firstName", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Last name">
            <input
              value={profile.lastName ?? ""}
              onChange={(e) => update("lastName", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <Field label="Bio">
          <textarea
            value={profile.bio ?? ""}
            onChange={(e) => update("bio", e.target.value)}
            rows={3}
            className="input resize-none"
          />
        </Field>

        <Field label="Email">
          <input
            value={user?.email ?? ""}
            disabled
            className="input opacity-50"
          />
        </Field>
      </section>

      {/* Preferences */}
      <section className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Preferences
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Language">
            <select
              value={profile.language ?? "en"}
              onChange={(e) => update("language", e.target.value)}
              className="input"
            >
              {locales.map((locale) => (
                <option key={locale} value={locale}>
                  {locale.toUpperCase()}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Timezone">
            <select
              value={profile.timezone ?? "UTC"}
              onChange={(e) => update("timezone", e.target.value)}
              className="input"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* Billing */}
      <section className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Billing
        </h2>

        {(() => {
          const currentPlan = plans.find((p) => p.id === (profile.plan ?? "free"));
          return (
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Current plan</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {currentPlan?.name ?? "Free"}
                </p>
                {currentPlan && !currentPlan.custom && (
                  <p className="mt-1 text-sm text-slate-400">
                    ${currentPlan.monthlyPrice}/month
                  </p>
                )}
              </div>
              <Link
                href="/pricing"
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
              >
                {profile.plan && profile.plan !== "free" ? "Change plan" : "Upgrade"}
              </Link>
            </div>
          );
        })()}
      </section>

      {/* Privacy & Notifications */}
      <section className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Privacy &amp; Notifications
        </h2>

        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm text-slate-300">
            Show my profile in the member directory
            <input
              type="checkbox"
              checked={profile.privacy === "public"}
              onChange={(e) => update("privacy", e.target.checked ? "public" : "private")}
              className="h-4 w-4 accent-navy-500"
            />
          </label>
          <p className="text-xs text-slate-500">
            When enabled, other signed-in members can see only your first name, last name, and avatar. Your email and private development records are not included.
          </p>
        </div>

        <label className="flex items-center justify-between text-sm text-slate-300">
          Enable notifications
          <input
            type="checkbox"
            checked={profile.notificationsEnabled ?? true}
            onChange={(e) => update("notificationsEnabled", e.target.checked)}
            className="h-4 w-4 accent-navy-500"
          />
        </label>

        <label className="flex items-center justify-between text-sm text-slate-300">
          Show my first name on the public leaderboard
          <input
            type="checkbox"
            checked={profile.showOnLeaderboard ?? false}
            onChange={(e) => update("showOnLeaderboard", e.target.checked)}
            className="h-4 w-4 accent-navy-500"
          />
        </label>
      </section>

      {/* Interests, Skills, Certificates */}
      <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Interests &amp; Skills
        </h2>

        <TagInput
          label="Interests"
          values={profile.interests ?? []}
          onChange={(v) => update("interests", v)}
          placeholder="e.g. Reading, Hiking"
        />
        <TagInput
          label="Skills"
          values={profile.skills ?? []}
          onChange={(v) => update("skills", v)}
          placeholder="e.g. Public speaking"
        />
        <TagInput
          label="Certificates"
          values={profile.certificates ?? []}
          onChange={(v) => update("certificates", v)}
          placeholder="e.g. First Aid Certified"
        />
      </section>

      <TwoFactorSettings />

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="flex items-center gap-2 rounded-2xl bg-navy-500 px-6 py-3 font-medium text-white transition hover:bg-navy-400 disabled:opacity-60"
      >
        {isSaving ? (
          <Loader2 size={16} className="animate-spin" />
        ) : saved ? (
          <Check size={16} />
        ) : null}
        {saved ? "Saved" : "Save changes"}
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs text-slate-500">{label}</span>
      {children}
    </label>
  );
}
