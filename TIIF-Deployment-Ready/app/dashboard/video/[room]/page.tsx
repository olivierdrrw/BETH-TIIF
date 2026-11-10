"use client";

import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { VideoRoom } from "@/features/video/components/video-room";

export default function VideoCallPage() {
  const router = useRouter();
  const params = useParams<{ room: string }>();
  const user = useAuthStore((state) => state.user);

  const roomSlug = params.room ?? "";
  const bookingId = roomSlug.startsWith("booking-")
    ? roomSlug.slice("booking-".length)
    : "";

  if (!user?.uid) return null;
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(bookingId)) {
    return (
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
        <h1 className="text-xl font-semibold text-white">Invalid video session</h1>
        <p className="mt-2 text-sm text-slate-400">Open a confirmed booking from your therapy dashboard.</p>
        <button type="button" onClick={() => router.push("/dashboard/therapy")} className="mt-5 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
          Back to therapy
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Video Session</h1>
        <p className="mt-1 text-sm text-slate-400">Authorized participants only</p>
      </div>

      <VideoRoom
        bookingId={bookingId}
        onLeave={() => router.push("/dashboard/therapy")}
      />
    </div>
  );
}
