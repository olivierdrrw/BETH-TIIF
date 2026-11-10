"use client";

import { useState }
from "react";

export function CreateJournalEntry() {

  const [
    content,
    setContent,
  ] = useState("");

  return (

    <div
      className="
      space-y-4
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
        className="
        w-full
        rounded-2xl
        border
        p-4
        "
      />

      <button
        className="
        rounded-xl
        bg-navy-600
        px-5
        py-3
        "
      >
        Save Reflection
      </button>

    </div>

  );
}