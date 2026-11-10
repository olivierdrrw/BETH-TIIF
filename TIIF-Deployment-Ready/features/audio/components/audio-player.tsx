"use client";

import {
  useRef,
} from "react";

export function AudioPlayer({

  src,

}: {
  src: string;
}) {

  const audioRef =
    useRef<
      HTMLAudioElement
    >(null);

  return (

    <div
      className="
      rounded-2xl
      border
      p-4
      "
    >

      <audio
        ref={audioRef}
        src={src}
      />

      <button
        onClick={() =>
          audioRef
            .current
            ?.play()
        }
      >
        ▶ Play
      </button>

    </div>

  );
}