"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Clock, Bookmark } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { ARTICLES, searchArticles } from "@/features/knowledge-base/data/articles";
import { getSavedSlugs } from "@/features/knowledge-base/repositories/saved-articles-repository";
import type { ArticleCategory } from "@/features/knowledge-base/types/article";

const CATEGORIES: { id: ArticleCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "trauma", label: "Trauma & Healing" },
  { id: "identity", label: "Identity" },
  { id: "relationships", label: "Relationships" },
  { id: "growth", label: "Growth" },
  { id: "purpose", label: "Purpose" },
  { id: "mindfulness", label: "Mindfulness" },
];

export default function KnowledgeBasePage() {
  const user = useAuthStore((state) => state.user);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ArticleCategory | "all">("all");
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    getSavedSlugs(user.uid).then(setSavedSlugs);
  }, [user?.uid]);

  const articles = useMemo(() => {
    const base = query.trim() ? searchArticles(query) : ARTICLES;
    return category === "all" ? base : base.filter((a) => a.category === category);
  }, [query, category]);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Knowledge Base</h1>
        <p className="mt-1 text-slate-400">Short, trauma-informed reads on identity, growth, and healing.</p>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-2.5 focus-within:border-navy-400/50">
        <Search size={16} className="text-slate-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`rounded-full px-3 py-1.5 text-xs transition ${
              category === c.id
                ? "bg-navy-500 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {articles.length === 0 ? (
          <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-slate-500">
            No articles match that search.
          </p>
        ) : (
          articles.map((a) => (
            <Link
              key={a.slug}
              href={`/dashboard/knowledge-base/${a.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-navy-400/30 hover:bg-navy-500/5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-white">{a.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-400">{a.summary}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {a.readTimeMinutes} min read
                    </span>
                    <span className="capitalize">{a.category}</span>
                  </div>
                </div>
                {savedSlugs.includes(a.slug) && (
                  <Bookmark size={16} className="mt-1 shrink-0 fill-navy-400 text-navy-400" />
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
