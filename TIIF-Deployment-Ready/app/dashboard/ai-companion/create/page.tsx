"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Check, Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { uploadCompanionPhoto } from "@/features/companion-avatar/services/upload-companion-photo";
import { avatarProvider } from "@/features/companion-avatar/providers/local-avatar-provider";
import { saveCompanionAvatar } from "@/repositories/companion/companion-avatar-repository";
import type { PersonalityStyle } from "@/features/companion-avatar/types/companion-avatar.type";

const STYLES: { id: PersonalityStyle; label: string; description: string }[] = [
  { id: "calm", label: "Calm", description: "Steady, gentle, unhurried." },
  { id: "supportive", label: "Supportive", description: "Warm and encouraging." },
  { id: "motivational", label: "Motivational", description: "Energizing, action-focused." },
  { id: "reflective", label: "Reflective", description: "Thoughtful, asks good questions." },
  { id: "balanced", label: "Balanced", description: "A bit of everything." },
];

const VOICES = [
  { id: "warm", label: "Warm" },
  { id: "calm", label: "Calm" },
  { id: "bright", label: "Bright" },
  { id: "neutral", label: "Neutral" },
];

const STEPS = ["Create", "Photo", "Style", "Voice", "Preview"];

export default function CreateCompanionPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>();
  const [style, setStyle] = useState<PersonalityStyle>("balanced");
  const [voiceId, setVoiceId] = useState("warm");
  const [isSaving, setIsSaving] = useState(false);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!user?.uid) return;
    setIsSaving(true);

    try {
      let imageUrl: string | undefined;
      if (photoFile) {
        imageUrl = await uploadCompanionPhoto(user.uid, photoFile);
      }

      const created = await avatarProvider.createAvatar({
        userId: user.uid,
        displayName: displayName.trim() || "Companion",
        avatarType: imageUrl ? "basic" : "digital",
        personalityStyle: style,
        voiceId,
        photoDataUrl: imageUrl,
      });

      await saveCompanionAvatar({
        userId: user.uid,
        displayName: displayName.trim() || "Companion",
        avatarType: imageUrl ? "basic" : "digital",
        personalityStyle: style,
        voiceId,
        imageUrl: created.imageUrl,
      });

      router.push("/dashboard/ai-companion");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16">
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <span
            key={s}
            className={`h-1.5 rounded-full transition-all ${
              i === step ? "w-6 bg-navy-400" : i < step ? "w-4 bg-navy-600" : "w-4 bg-white/10"
            }`}
          />
        ))}
      </div>

      <div className="w-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
        {step === 0 && (
          <>
            <h1 className="text-2xl font-bold">Create your Companion</h1>
            <p className="mt-2 text-sm text-slate-400">
              A digital companion that grows with you. Not a therapist — a personal AI
              companion for reflection, focus, and support.
            </p>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Give your Companion a name"
              className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-center text-sm text-white placeholder:text-slate-500"
            />
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold">Add a photo</h1>
            <p className="mt-2 text-sm text-slate-400">Optional — you can skip this.</p>
            <button
              onClick={() => inputRef.current?.click()}
              className="group relative mx-auto mt-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-navy-500/20 text-navy-300"
            >
              {photoPreview ? (
                <img src={photoPreview} alt="" className="h-full w-full object-cover" />
              ) : (
                <Camera size={22} />
              )}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold">Choose your Companion's style</h1>
            <div className="mt-6 grid grid-cols-1 gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    style === s.id
                      ? "border-navy-400 bg-navy-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-white">{s.label}</p>
                    <p className="text-xs text-slate-500">{s.description}</p>
                  </div>
                  {style === s.id && <Check size={16} className="text-navy-400" />}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl font-bold">Choose a voice</h1>
            <p className="mt-2 text-sm text-slate-400">Used when your Companion speaks aloud.</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {VOICES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVoiceId(v.id)}
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    voiceId === v.id
                      ? "border-navy-400 bg-navy-500/10 text-navy-300"
                      : "border-white/10 text-slate-300 hover:border-white/20"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-navy-500/20 text-navy-300">
              {photoPreview ? (
                <img src={photoPreview} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-semibold">
                  {(displayName || "C")[0].toUpperCase()}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-2xl font-bold">{displayName || "Your Companion"}</h1>
            <p className="mt-1 text-sm capitalize text-navy-400">{style} · {voiceId} voice</p>
            <p className="mt-4 text-sm text-slate-400">Your Companion is ready.</p>
          </>
        )}

        <button
          onClick={() => (step === STEPS.length - 1 ? handleSave() : setStep((s) => s + 1))}
          disabled={isSaving}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-navy-500 px-6 py-3 font-medium text-white transition hover:bg-navy-400 disabled:opacity-60"
        >
          {isSaving && <Loader2 size={14} className="animate-spin" />}
          {step === STEPS.length - 1 ? "Start talking" : "Continue"}
        </button>
      </div>
    </div>
  );
}
