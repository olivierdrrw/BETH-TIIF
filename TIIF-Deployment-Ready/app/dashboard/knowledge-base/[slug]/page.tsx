"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Bookmark, Clock } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { getArticleBySlug } from "@/features/knowledge-base/data/articles";
import {
  getSavedSlugs,
  saveArticle,
  unsaveArticle,
} from "@/features/knowledge-base/repositories/saved-articles-repository";

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const article = getArticleBySlug(params.slug);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    getSavedSlugs(user.uid).then((slugs) => setIsSaved(slugs.includes(params.slug)));
  }, [user?.uid, params.slug]);

  async function toggleSave() {
    if (!user?.uid) return;
    if (isSaved) {
      await unsaveArticle(user.uid, params.slug);
    } else {
      await saveArticle(user.uid, params.slug);
    }
    setIsSaved(!isSaved);
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-2xl py-24 text-center">
        <p className="text-slate-400">That article doesn't exist.</p>
        <button
          onClick={() => router.push("/dashboard/knowledge-base")}
          className="mt-4 text-sm text-navy-400 hover:text-navy-300"
        >
          Back to Knowledge Base
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <button
        onClick={() => router.push("/dashboard/knowledge-base")}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={14} /> Knowledge Base
      </button>

      <div>
        <span className="text-xs uppercase tracking-wide text-navy-400">{article.category}</span>
        <h1 className="mt-2 text-3xl font-bold text-white">{article.title}</h1>

        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock size={12} /> {article.readTimeMinutes} min read
          </span>

          <button
            onClick={toggleSave}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition ${
              isSaved
                ? "border-navy-400/40 bg-navy-500/10 text-navy-300"
                : "border-white/10 text-slate-400 hover:bg-white/5"
            }`}
          >
            <Bookmark size={12} className={isSaved ? "fill-navy-400" : ""} />
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {article.content.map((paragraph, i) => (
          <p key={i} className="leading-7 text-slate-300">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
