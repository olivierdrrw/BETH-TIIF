"use client";

import { useMemo, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

const starterMessages = [
  {
    role: "assistant",
    content:
      "Hello — how are you feeling today?",
  },
  {
    role: "user",
    content:
      "I’ve been carrying a lot lately, but I’m trying to stay grounded.",
  },
];

export function AICompanion() {
  const [input, setInput] = useState("");

  const suggestedPrompts = useMemo(
    () => [
      "What should I focus on today?",
      "Help me reflect on my week.",
      "What would support my mood right now?",
    ],
    []
  );

  return (
    <section className="rounded-2xl border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            AI companion
          </p>
          <h3 className="text-lg font-semibold">
            Daily support
          </h3>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {starterMessages.map((message) => (
          <div
            key={`${message.role}-${message.content}`}
            className={`flex gap-3 ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          placeholder="Ask your AI companion..."
          className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm outline-none"
        />

        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground">
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-muted-foreground"
          >
            <Sparkles className="h-3 w-3" />
            {prompt}
          </button>
        ))}
      </div>
    </section>
  );
}