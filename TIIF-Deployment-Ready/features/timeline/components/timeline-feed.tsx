const events = [

  {
    title: "Goal Completed",
    date: "Today",
  },

  {
    title: "Mood Logged",
    date: "Yesterday",
  },

  {
    title: "Journal Added",
    date: "2 Days Ago",
  },

];

export function TimelineFeed() {

  return (

    <div
      className="
      rounded-3xl
      border
      border-zinc-800
      p-6
      "
    >

      <h2 className="text-xl font-semibold">
        Timeline
      </h2>

      <div className="mt-6 space-y-4">

        {events.map((event) => (

          <div
            key={event.title}
            className="
            flex
            justify-between
            "
          >

            <p>{event.title}</p>

            <span
              className="
              text-zinc-500
              "
            >
              {event.date}
            </span>

          </div>

        ))}

      </div>

    </div>

  );
}