"use client";

import { useState } from "react";

export function PurposeForm() {

  const [
    purpose,
    setPurpose
  ] = useState("");

  return (

    <div>

      <label>

        What gives your life meaning?

      </label>

      <textarea

        value={purpose}

        onChange={(e) =>
          setPurpose(
            e.target.value
          )
        }

        className="
        mt-4
        w-full
        rounded-xl
        border
        p-4
        "

      />

    </div>

  );
}