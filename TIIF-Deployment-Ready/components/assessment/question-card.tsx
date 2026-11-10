"use client";

interface Props {
  question: string;

  onSelect: (
    value: number
  ) => void;
}

export function
QuestionCard({
  question,
  onSelect,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 p-8">
      <h2 className="mb-8 text-xl">
        {question}
      </h2>

      <div className="flex gap-4">
        {[1, 2, 3, 4, 5].map(
          (value) => (
            <button
              key={value}
              onClick={() =>
                onSelect(
                  value
                )
              }
              className="
                h-12
                w-12
                rounded-full
                border
                border-zinc-700
              "
            >
              {value}
            </button>
          )
        )}
      </div>
    </div>
  );
}