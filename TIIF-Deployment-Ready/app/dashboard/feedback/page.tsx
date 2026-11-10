"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { Loader2, Send, ThumbsUp, ThumbsDown } from "lucide-react";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function FeedbackPage() {
  const user = useAuthStore((state) => state.user);

  const [helpful, setHelpful] = useState("");
  const [confusing, setConfusing] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit() {
    if (wouldRecommend === null || isSaving) return;
    setIsSaving(true);

    await addDoc(collection(db, COLLECTIONS.FEEDBACK), {
      userId: user?.uid ?? "anonymous",
      helpful,
      confusing,
      wouldRecommend,
      createdAt: new Date().toISOString(),
    });

    setIsSaving(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-navy-400/30 bg-navy-500/5 p-8 text-center">
        <h1 className="text-2xl font-bold text-white">Thank you</h1>
        <p className="mt-2 text-slate-400">
          Your feedback helps shape what TIIF becomes next.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Feedback</h1>
        <p className="mt-1 text-slate-400">
          A few quick questions — this takes about a minute.
        </p>
      </div>

      <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <div>
          <label className="text-sm font-medium text-slate-300">
            What helped you most?
          </label>
          <textarea
            value={helpful}
            onChange={(e) => setHelpful(e.target.value)}
            rows={3}
            className="input mt-2 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">
            What felt confusing?
          </label>
          <textarea
            value={confusing}
            onChange={(e) => setConfusing(e.target.value)}
            rows={3}
            className="input mt-2 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">
            Would you recommend TIIF to a friend?
          </label>
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => setWouldRecommend(true)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                wouldRecommend === true
                  ? "border-navy-400/50 bg-navy-500/10 text-navy-300"
                  : "border-white/10 text-slate-400 hover:border-white/20"
              }`}
            >
              <ThumbsUp size={14} /> Yes
            </button>
            <button
              onClick={() => setWouldRecommend(false)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                wouldRecommend === false
                  ? "border-rose-400/50 bg-rose-500/10 text-rose-300"
                  : "border-white/10 text-slate-400 hover:border-white/20"
              }`}
            >
              <ThumbsDown size={14} /> Not yet
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={wouldRecommend === null || isSaving}
        className="flex items-center gap-2 rounded-2xl bg-navy-500 px-6 py-3 font-medium text-white transition hover:bg-navy-400 disabled:opacity-50"
      >
        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        Submit feedback
      </button>
    </div>
  );
}
