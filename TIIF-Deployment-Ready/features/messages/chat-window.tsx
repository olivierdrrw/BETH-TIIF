"use client";

import { useState } from "react";
import { useMessageStore } from "@/features/messages/messages-store";

interface ChatWindowProps {
  senderId: string;
  receiverId: string;
}

/**
 * Lightweight local preview component. Production messaging is handled by
 * repositories/message/message-repository.ts and the messages dashboard.
 */
export function ChatWindow({ senderId, receiverId }: ChatWindowProps) {
  const [text, setText] = useState("");
  const { messages, sendMessage } = useMessageStore();

  function handleSend() {
    const content = text.trim();
    if (!content || !senderId || !receiverId) return;

    sendMessage({
      id: crypto.randomUUID(),
      senderId,
      receiverId,
      content,
      createdAt: new Date().toISOString(),
    });
    setText("");
  }

  return (
    <div className="space-y-4">
      <div className="h-96 space-y-2 overflow-y-auto rounded-xl border border-white/10 p-4">
        {messages.length === 0 ? (
          <p className="text-sm text-slate-500">No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="rounded-lg bg-white/[0.04] p-3 text-sm">
              {message.content}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          aria-label="Message"
          placeholder="Write a message…"
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-transparent p-3"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!text.trim()}
          className="rounded-xl bg-navy-600 px-4 text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
