"use client";

import { useEffect, useState } from "react";
import { Send, Search, Circle, X } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { useIsOnline } from "@/hooks/use-presence";
import { getUsers } from "@/repositories/user-repository";
import {
  sendMessage,
  subscribeToConversation,
  subscribeToConversations,
  type ConversationSummary,
} from "@/repositories/message/message-repository";
import type { Message } from "@/features/messages/message.type";

interface DirectoryUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

function nameFor(u: DirectoryUser | undefined) {
  if (!u) return "Unknown";
  return [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email || "Unknown";
}

function OnlineDot({ userId }: { userId: string }) {
  const online = useIsOnline(userId);
  return (
    <Circle
      size={8}
      className={online ? "fill-navy-400 text-navy-400" : "fill-slate-600 text-slate-600"}
    />
  );
}

export default function MessagesPage() {
  const user = useAuthStore((state) => state.user);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [users, setUsers] = useState<DirectoryUser[]>([]);
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers().then((data) => setUsers(data as DirectoryUser[]));
  }, []);

  useEffect(() => {
    if (!user?.uid) return;
    return subscribeToConversations(user.uid, setConversations);
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid || !activePartnerId) return;
    return subscribeToConversation(user.uid, activePartnerId, setMessages);
  }, [user?.uid, activePartnerId]);

  async function handleSend() {
    if (!draft.trim() || !user?.uid || !activePartnerId) return;
    await sendMessage(user.uid, activePartnerId, draft.trim());
    setDraft("");
  }

  function userFor(id: string) {
    return users.find((u) => u.id === id);
  }

  const filteredUsers = users.filter(
    (u) =>
      u.id !== user?.uid &&
      (nameFor(u).toLowerCase().includes(search.toLowerCase()) || !search)
  );

  const activePartner = activePartnerId ? userFor(activePartnerId) : null;

  return (
    <div className="grid h-[calc(100vh-8rem)] gap-4 lg:grid-cols-[320px_1fr]">
      {/* Conversation list */}
      <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between border-b border-white/5 p-4">
          <h2 className="font-semibold text-white">Messages</h2>
          <button
            onClick={() => setShowNewChat(true)}
            className="rounded-lg bg-navy-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-navy-400"
          >
            New
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="p-4 text-sm text-slate-500">No conversations yet.</p>
          ) : (
            conversations.map((c) => {
              const partnerId = c.participants.find((p) => p !== user?.uid) ?? "";
              const partner = userFor(partnerId);
              return (
                <button
                  key={c.id}
                  onClick={() => setActivePartnerId(partnerId)}
                  className={`flex w-full items-center gap-3 border-b border-white/5 p-4 text-left transition hover:bg-white/5 ${
                    activePartnerId === partnerId ? "bg-navy-500/5" : ""
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-500/20 text-xs font-medium text-navy-300">
                    {nameFor(partner)[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm text-white">{nameFor(partner)}</p>
                      <OnlineDot userId={partnerId} />
                    </div>
                    <p className="truncate text-xs text-slate-500">{c.lastMessage}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Active chat */}
      <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.02]">
        {!activePartnerId ? (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-500">
            Select a conversation or start a new one.
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 border-b border-white/5 p-4">
              <p className="text-sm font-medium text-white">{nameFor(activePartner)}</p>
              <OnlineDot userId={activePartnerId} />
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.senderId === user?.uid ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                      m.senderId === user?.uid
                        ? "bg-navy-500 text-white"
                        : "border border-white/5 bg-white/[0.03] text-slate-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-white/5 p-4">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="input"
              />
              <button
                onClick={handleSend}
                disabled={!draft.trim()}
                className="shrink-0 rounded-xl bg-navy-500 p-2.5 text-white transition hover:bg-navy-400 disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* New conversation modal */}
      {showNewChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-background p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-white">New conversation</h3>
              <button onClick={() => setShowNewChat(false)} className="text-slate-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="mb-3 flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2">
              <Search size={14} className="text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search people..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            <div className="max-h-64 space-y-1 overflow-y-auto">
              {filteredUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    setActivePartnerId(u.id);
                    setShowNewChat(false);
                    setSearch("");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-500/20 text-xs text-navy-300">
                    {nameFor(u)[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm text-slate-200">{nameFor(u)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
