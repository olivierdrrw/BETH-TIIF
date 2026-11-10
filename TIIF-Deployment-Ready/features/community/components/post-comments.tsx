"use client";

import { useEffect, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getComments, addComment } from "../repositories/community-repository";
import type { CommunityComment } from "../types/post";

export function PostComments({ postId }: { postId: string }) {
  const user = useAuthStore((state) => state.user);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  async function load() {
    setIsLoading(true);
    setComments(await getComments(postId));
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, [postId]);

  async function handleSend() {
    if (!draft.trim() || !user?.uid || isSending) return;
    setIsSending(true);
    await addComment(postId, user.uid, draft.trim());
    setDraft("");
    setIsSending(false);
    load();
  }

  return (
    <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
      {isLoading ? (
        <Loader2 size={14} className="animate-spin text-slate-500" />
      ) : (
        comments.map((c) => (
          <p key={c.id} className="rounded-xl bg-white/[0.02] px-3 py-2 text-sm text-slate-300">
            {c.content}
          </p>
        ))
      )}

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Write a comment..."
          className="input"
        />
        <button
          onClick={handleSend}
          disabled={!draft.trim() || isSending}
          className="shrink-0 rounded-xl bg-navy-500 p-2.5 text-white transition hover:bg-navy-400 disabled:opacity-50"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
