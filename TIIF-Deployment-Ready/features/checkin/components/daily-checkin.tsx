"use client";

const moods = [

  "Great",

  "Good",

  "Okay",

  "Low",

  "Struggling",

];

export function DailyCheckIn() {

  return (

    <div
      className="
      rounded-3xl
      border
      p-6
      "
    >

      <h2>
        How are you
        feeling today?
      </h2>

      <div
        className="
        mt-6
        flex
        gap-3
        "
      >

        {moods.map(
          (mood) => (

            <button
              key={mood}
              className="
              rounded-xl
              border
              px-4
              py-2
              "
            >
              {mood}
            </button>

          )
        )}

      </div>

    </div>

  );
}