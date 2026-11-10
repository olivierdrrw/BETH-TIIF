"use client";

import * as React from "react";
import { useState } from "react";
import { Send, Bot } from "lucide-react";

export function QuickReflection() {
  const [entry, setEntry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit() {
    if (!entry.trim()) return;
    setIsSubmitting(true);
    
    // Simulate AI processing & Data Save
    setTimeout(() => {
      console.log("Saved entry:", entry);
      setEntry("");
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Daily Reflection</h2>
        <Bot className="w-5 h-5 text-navy-400" />
      </div>

      <div className="relative">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="What's on your mind right now? AI Companion is listening..."
          className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-navy-500/50 resize-none transition-all"
        />
        
        <button
          onClick={handleSubmit}
          disabled={!entry.trim() || isSubmitting}
          className={`absolute bottom-3 right-3 p-2 rounded-lg flex items-center justify-center transition-all ${
            entry.trim() && !isSubmitting
              ? "bg-navy-600 hover:bg-navy-500 text-white shadow-[0_0_10px_rgba(38, 61, 112,0.4)]" 
              : "bg-white/10 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-3 text-right">
        Encrypted & deeply private.
      </p>
    </div>
  );
}