"use client";

export function PredictionsPanel() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-navy-500/20
        bg-navy-500/5
        p-6
      "
    >
      <h3 className="font-semibold">
        AI Predictions
      </h3>

      <div className="mt-4 space-y-4">
        <div>
          Purpose Growth
          <strong className="ml-2">
            82%
          </strong>
        </div>

        <div>
          Goal Completion
          <strong className="ml-2">
            78%
          </strong>
        </div>

        <div>
          Burnout Risk
          <strong className="ml-2">
            18%
          </strong>
        </div>
      </div>
    </div>
  );
}