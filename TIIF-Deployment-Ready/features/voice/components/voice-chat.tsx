"use client";

import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";

import { useVoice } from "./use-voice";
import { speak } from "./services/text-to-speech";
import { VoiceButton } from "./voice-button";
import { getFirebaseAuthorizationHeader } from "@/lib/auth/client-auth-headers";

/**
 * Standalone push-to-talk widget that asks the Human Twin AI a single
 * question and speaks the answer back. For the full conversational
 * experience with memory/agents/history, see components/ai-companion/
 * conversation-panel.tsx — this is a lightweight variant for embedding
 * elsewhere (e.g. a quick-ask widget).
 */
export function VoiceChat() {
  const [isThinking, setIsThinking] = useState(false);

  const handleResult = useCallback(async (question: string) => {
    setIsThinking(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: await getFirebaseAuthorizationHeader() },
        body: JSON.stringify({ message: question }),
      });
      const data = await res.json();
      if (res.ok) speak(data.reply);
    } finally {
      setIsThinking(false);
    }
  }, []);

  const { isListening, isSupported, startListening } = useVoice({ onResult: handleResult });

  if (!isSupported) {
    return <p className="text-sm text-slate-500">Voice isn't supported in this browser.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <VoiceButton onStart={startListening} />
      <p className="text-sm text-slate-400">
        {isThinking ? (
          <span className="flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" /> Thinking...
          </span>
        ) : isListening ? (
          "Listening..."
        ) : (
          "Talk to your Human Twin"
        )}
      </p>
    </div>
  );
}
