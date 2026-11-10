"use client";

import {
  useState,
} from "react";

export function AIChat() {

  const [
    prompt,
    setPrompt,
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
        value={prompt}
        onChange={(e) =>
          setPrompt(
            e.target.value
          )
        }
        placeholder="
        Ask your Human Twin...
        "
        className="
        w-full
        min-h-[120px]
        bg-transparent
        outline-none
        "
      />

    </div>
  );
}