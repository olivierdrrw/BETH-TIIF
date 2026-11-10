"use client";

import { useState } from "react";

export function JournalEditor() {

  const [
    content,
    setContent,
  ] = useState("");

  return (

    <div
      className="
      rounded-3xl
      border
      border-white/10
      p-6
      "
    >

      <textarea
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        rows={10}
        placeholder="
        What are you
        reflecting on today?
        "
        className="
          w-full
          bg-transparent
          outline-none
        "
      />

    </div>
  );
}