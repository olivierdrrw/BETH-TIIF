"use client";

import { ProgressBar } from "@/components/dashboard/ui/progress-bar";

export default function AIConfidence() {
  return (

    <div className="space-y-3">

      <div className="flex justify-between">

        <span>

          AI Confidence

        </span>

        <strong>

          97%

        </strong>

      </div>

      <ProgressBar value={97}/>

    </div>

  );
}