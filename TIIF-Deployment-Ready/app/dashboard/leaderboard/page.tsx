"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { Trophy, Loader2 } from "lucide-react";

import { db } from "@/lib/firebase/firestore";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useUserXP } from "@/hooks/use-user-xp";

interface LeaderboardEntry {
  id: string;
  displayName: string;
  xp: number;
  level: string;
}

const MEDAL = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const user = useAuthStore((state) => state.user);
  const { xp, level } = useUserXP();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const snapshot = await getDocs(
        query(collection(db, COLLECTIONS.LEADERBOARD), orderBy("xp", "desc"), limit(50))
      );
      setEntries(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as LeaderboardEntry)));
      setIsLoading(false);
    }
    load();
  }, [xp]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
        <p className="mt-1 text-slate-400">
          Your XP: <span className="text-white">{xp}</span> · Level: {level.name}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12 text-slate-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : entries.length === 0 ? (
        <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-slate-500">
          Nobody has joined the public leaderboard yet — enable it in Settings to be first.
        </p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between rounded-2xl border p-4 ${
                entry.id === user?.uid
                  ? "border-navy-400/40 bg-navy-500/5"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 text-center text-lg">
                  {MEDAL[i] ?? `#${i + 1}`}
                </span>
                <div>
                  <p className="text-white">{entry.displayName}</p>
                  <p className="text-xs text-slate-500">{entry.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-navy-300">
                <Trophy size={14} /> {entry.xp} XP
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
