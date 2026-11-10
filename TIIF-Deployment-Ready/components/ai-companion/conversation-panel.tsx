"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2, Users2, Mic, Volume2, VolumeX } from "lucide-react";
import { useHumanTwin } from "@/hooks/use-human-twin";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getFirebaseAuthorizationHeader } from "@/lib/auth/client-auth-headers";
import { AIWriting } from "@/components/ai/ai-typing";
import { JournalRepository } from "@/features/journal/journal-repository";
import { GoalRepository } from "@/features/goals/repositories/goal-repository";
import { extractFromJournal, extractFromGoals, mergeMemories } from "@/lib/memory/memory-extractor";
import { AgentSelector } from "@/features/ai-agents/components/agent-selector";
import { AI_AGENTS, type AIAgent } from "@/features/ai-agents/data/agents";
import { useVoice } from "@/features/voice/components/use-voice";
import { speak, stopSpeaking, isSpeechSupported } from "@/features/voice/components/services/text-to-speech";
import type { MemoryRecord } from "@/types/memory";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const QUICK_ACTIONS = [
  "How am I doing?",
  "Help me reflect",
  "I feel overwhelmed",
  "Plan my day",
  "Review my progress",
  "Help me understand myself",
];

function starterFor(agent: AIAgent): ChatMessage {
  return {
    role: "assistant",
    content: `Hi — I'm your ${agent.name}. ${agent.description} What's on your mind today?`,
  };
}

export function ConversationPanel() {
  const twin = useHumanTwin();
  const user = useAuthStore((state) => state.user);
  const [agent, setAgent] = useState<AIAgent>(AI_AGENTS[0]);
  const [showAgents, setShowAgents] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([starterFor(AI_AGENTS[0])]);
  const [memories, setMemories] = useState<MemoryRecord[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voiceReplyEnabled, setVoiceReplyEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleVoiceResult = useCallback((transcript: string) => {
    sendMessageRef.current(transcript);
  }, []);

  const { isListening, isSupported: micSupported, error: voiceError, startListening } = useVoice({
    onResult: handleVoiceResult,
  });

  useEffect(() => {
    if (!user?.uid) return;
    Promise.all([
      JournalRepository.getByUser(user.uid),
      GoalRepository.getUserGoals(user.uid),
    ]).then(([journals, goals]) => {
      const merged = mergeMemories(
        extractFromJournal(journals),
        extractFromGoals(goals as any)
      );
      setMemories(merged.slice(0, 15));
    });
  }, [user?.uid]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  function handleSelectAgent(next: AIAgent) {
    setAgent(next);
    setMessages([starterFor(next)]);
    setShowAgents(false);
    setError(null);
    stopSpeaking();
  }

  async function sendMessage(overrideText?: string) {
    const trimmed = (overrideText ?? input).trim();
    if (!trimmed || isSending) return;

    const nextMessages = [...messages, { role: "user", content: trimmed } as ChatMessage];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: await getFirebaseAuthorizationHeader() },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(0, -1),
          agentId: agent.id,
          twin: {
            identityScore: twin.identity,
            growthScore: twin.growth,
            wellbeingScore: twin.wellbeing,
            resilienceScore: twin.resilience,
          },
          memories,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);

      if (voiceReplyEnabled) {
        speak(
          data.reply,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    } catch (err: any) {
      setError(err?.message ?? "The AI Companion couldn't respond right now.");
    } finally {
      setIsSending(false);
    }
  }

  const sendMessageRef = useRef(sendMessage);
  sendMessageRef.current = sendMessage;

  return (
    <div className="flex h-[600px] flex-col rounded-3xl border border-white/10 bg-white/[0.02]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-white">
          <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-500/15 text-navy-300">
            <Sparkles size={12} />
            <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-navy-300" />
            </span>
          </span>
          {agent.name}
        </div>
        <div className="flex items-center gap-2">
          {isSpeechSupported() && (
            <button
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                setVoiceReplyEnabled((v) => !v);
              }}
              title={voiceReplyEnabled ? "Voice replies on" : "Voice replies off"}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition ${
                voiceReplyEnabled
                  ? "border-navy-400/40 bg-navy-500/10 text-navy-300"
                  : "border-white/10 text-slate-400 hover:bg-white/5"
              }`}
            >
              {voiceReplyEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </button>
          )}
          <button
            onClick={() => setShowAgents((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 transition hover:bg-white/5"
          >
            <Users2 size={12} /> Switch agent
          </button>
        </div>
      </div>

      {showAgents && (
        <div className="border-b border-white/5 p-4">
          <AgentSelector selectedId={agent.id} onSelect={handleSelectAgent} />
        </div>
      )}

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
        <AnimatePresence initial={false}>
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-500/15 text-navy-300">
                  <Sparkles size={12} />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "bg-navy-500 text-white"
                    : "border border-white/5 bg-white/[0.03] text-slate-200"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isSending && <AIWriting />}

        {error && (
          <p className="rounded-xl bg-rose-500/10 px-4 py-2 text-sm text-rose-300">
            {error}
          </p>
        )}
      </div>

      <div className="border-t border-white/5 p-4">
        {messages.length === 1 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                disabled={isSending}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-slate-300 transition hover:border-navy-400/40 hover:bg-navy-500/10 hover:text-navy-300 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
        {voiceError && (
          <p className="mb-2 text-xs text-rose-300">{voiceError}</p>
        )}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-2 transition focus-within:border-navy-400/50 focus-within:shadow-[0_0_0_4px_rgba(62,99,176,0.12)]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={isListening ? "Listening..." : `Message your ${agent.name}...`}
            disabled={isSending || isListening}
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none disabled:opacity-50"
          />

          {micSupported && (
            <button
              onClick={startListening}
              disabled={isSending || isListening}
              title="Speak your message"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition disabled:cursor-not-allowed ${
                isListening
                  ? "animate-pulse bg-rose-500 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              <Mic size={14} />
            </button>
          )}

          <button
            onClick={() => sendMessage()}
            disabled={isSending || !input.trim()}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-navy-500 text-white transition hover:bg-navy-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConversationPanel;
