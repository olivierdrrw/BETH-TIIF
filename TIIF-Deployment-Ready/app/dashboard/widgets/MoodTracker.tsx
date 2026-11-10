"use client";

import * as React from "react";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { id: "motivated", label: "Motivated", emoji: "🔥", color: "hover:bg-navy-500/20 hover:text-navy-400 hover:border-navy-500" },
    { id: "calm", label: "Calm", emoji: "🌊", color: "hover:bg-navy-500/20 hover:text-navy-400 hover:border-navy-500" },
    { id: "anxious", label: "Anxious", emoji: "🌪️", color: "hover:bg-navy-500/20 hover:text-navy-400 hover:border-navy-500" },
    { id: "sad", label: "Sad", emoji: "🌧️", color: "hover:bg-gray-500/20 hover:text-gray-400 hover:border-gray-500" },
  ];

  function handleMoodSelect(moodId: string) {
    setSelectedMood(moodId);
    // Hano niho tuzahuza na ya "updateTwin" na "updateAnalytics" twakoze mbere
    console.log("Logged mood:", moodId);
  }

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-navy-400" />
        <h2 className="text-lg font-semibold text-white">How are you feeling?</h2>
      </div>
      
      <p className="text-sm text-gray-400 mb-5">
        Your Human Twin™ uses this to map your emotional history.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 transition-all duration-300 ${mood.color} ${
              selectedMood === mood.id ? "bg-white/10 border-white/30 scale-105 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : ""
            }`}
          >
            <span className="text-2xl mb-2">{mood.emoji}</span>
            <span className="text-xs font-medium text-gray-300">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}