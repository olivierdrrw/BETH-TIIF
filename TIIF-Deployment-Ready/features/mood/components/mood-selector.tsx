"use client";

interface Props {
  onSelect: (
    mood: string
  ) => void;
}

export function MoodSelector({
  onSelect,
}: Props) {

  const moods = [
    "excellent",
    "good",
    "neutral",
    "low",
    "very_low",
  ];

  return (

    <div
      className="
      flex
      gap-3
      "
    >

      {moods.map(
        (mood) => (

          <button
            key={mood}
            onClick={() =>
              onSelect(
                mood
              )
            }
            className="
            rounded-xl
            border
            border-white/10
            px-4
            py-2
            "
          >
            {mood}
          </button>
        )
      )}

    </div>
  );
}