"use client";

import { useEffect, useRef, useState } from "react";
import { Room, RoomEvent, Track, type RemoteTrack } from "livekit-client";
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Loader2 } from "lucide-react";
import { getFirebaseAuthorizationHeader } from "@/lib/auth/client-auth-headers";

interface VideoRoomProps {
  bookingId: string;
  onLeave?: () => void;
}

interface VideoTokenResponse {
  token?: string;
  roomName?: string;
  serverUrl?: string;
  error?: string;
}

export function VideoRoom({ bookingId, onLeave }: VideoRoomProps) {
  const [room] = useState(() => new Room());
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function connect() {
      try {
        const res = await fetch("/api/video/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: await getFirebaseAuthorizationHeader(),
          },
          body: JSON.stringify({ bookingId }),
          cache: "no-store",
        });
        const data = await res.json() as VideoTokenResponse;

        if (!res.ok) throw new Error(data.error ?? "Could not join the call.");
        if (!data.token || !data.roomName || !data.serverUrl) {
          throw new Error("The video session authorization response is incomplete.");
        }
        if (cancelled) return;

        await room.connect(data.serverUrl, data.token);
        await room.localParticipant.setMicrophoneEnabled(true);
        await room.localParticipant.setCameraEnabled(true);

        const localPub = room.localParticipant.videoTrackPublications.values().next().value;
        if (localPub?.videoTrack && localVideoRef.current) {
          localPub.videoTrack.attach(document.createElement("video"));
          localVideoRef.current.appendChild(localPub.videoTrack.attach());
        }

        room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
          if (track.kind === Track.Kind.Video && remoteVideoRef.current) {
            remoteVideoRef.current.appendChild(track.attach());
          }
        });

        setIsConnecting(false);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not join the call.");
          setIsConnecting(false);
        }
      }
    }

    void connect();

    return () => {
      cancelled = true;
      room.disconnect();
    };
  }, [room, bookingId]);

  function toggleMic() {
    void room.localParticipant.setMicrophoneEnabled(!micOn);
    setMicOn(!micOn);
  }

  function toggleCam() {
    void room.localParticipant.setCameraEnabled(!camOn);
    setCamOn(!camOn);
  }

  function leave() {
    room.disconnect();
    onLeave?.();
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3 rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 text-center">
        <p className="text-rose-300">{error}</p>
        <p className="text-xs text-slate-500">
          Video access is available only to participants of a confirmed booking.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative grid gap-2 overflow-hidden rounded-3xl border border-white/10 bg-black sm:grid-cols-2">
        {isConnecting ? (
          <div className="col-span-2 flex h-96 items-center justify-center text-slate-500">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <div ref={localVideoRef} className="h-64 bg-zinc-900 sm:h-96 [&>video]:h-full [&>video]:w-full [&>video]:object-cover" />
            <div ref={remoteVideoRef} className="h-64 bg-zinc-900 sm:h-96 [&>video]:h-full [&>video]:w-full [&>video]:object-cover" />
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={toggleMic}
          aria-label={micOn ? "Mute microphone" : "Enable microphone"}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition ${micOn ? "bg-white/10 text-white" : "bg-rose-500 text-white"}`}
        >
          {micOn ? <Mic size={18} /> : <MicOff size={18} />}
        </button>
        <button
          type="button"
          onClick={toggleCam}
          aria-label={camOn ? "Turn camera off" : "Turn camera on"}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition ${camOn ? "bg-white/10 text-white" : "bg-rose-500 text-white"}`}
        >
          {camOn ? <VideoIcon size={18} /> : <VideoOff size={18} />}
        </button>
        <button
          type="button"
          onClick={leave}
          aria-label="Leave video session"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-white transition hover:bg-rose-500"
        >
          <PhoneOff size={18} />
        </button>
      </div>
    </div>
  );
}
