"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

interface TagInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function TagInput({ label, values, onChange, placeholder }: TagInputProps) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const trimmed = draft.trim();
    if (!trimmed || values.includes(trimmed)) return;
    onChange([...values, trimmed]);
    setDraft("");
  }

  function removeTag(tag: string) {
    onChange(values.filter((v) => v !== tag));
  }

  return (
    <div className="space-y-2">
      <label className="text-xs text-slate-500">{label}</label>

      <div className="flex flex-wrap gap-2">
        {values.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 rounded-full bg-navy-500/10 px-3 py-1 text-xs text-navy-300"
          >
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:text-white">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder ?? "Type and press Enter"}
          className="input"
        />
        <button
          onClick={addTag}
          type="button"
          className="shrink-0 rounded-xl border border-white/10 px-3 text-slate-400 transition hover:bg-white/5"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
