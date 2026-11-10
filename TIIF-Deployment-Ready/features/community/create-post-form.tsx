"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { createPost } from "./repositories/community-repository";

export function CreatePostForm({ onPosted }: { onPosted?: () => void }) {
  const user = useAuthStore((state) => state.user);
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  async function handlePublish() {
    if (!content.trim() || !user?.uid || isPosting) return;

    setIsPosting(true);
    try {
      await createPost(user.uid, content.trim());
      setContent("");
      onPosted?.();
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Share something with the community..."
        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white placeholder:text-slate-600 focus:border-navy-400/50 focus:outline-none"
      />

      <button
        onClick={handlePublish}
        disabled={!content.trim() || isPosting}
        className="mt-4 flex items-center gap-2 rounded-xl bg-navy-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPosting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
        Publish
      </button>
    </div>
  );
}
