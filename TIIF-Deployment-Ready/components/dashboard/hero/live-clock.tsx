"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
      rounded-2xl
      border
      border-white/10
      bg-white/5
      px-5
      py-3
      backdrop-blur-xl
    "
    >
      {time}
    </div>
  );
}