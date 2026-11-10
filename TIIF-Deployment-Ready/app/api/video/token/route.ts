import { AccessToken } from "livekit-server-sdk";
import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";
import { getFirebaseAdminDb } from "@/lib/firebase/admin";
import { consumeRateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;

  const rate = consumeRateLimit(`video-token:${auth.user.uid}`, 10, 60 * 60_000);
  if (!rate.allowed) {
    return Response.json({ error: "Too many video-token requests." }, {
      status: 429,
      headers: { "Retry-After": String(rate.retryAfterSeconds) },
    });
  }

  const { LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_URL, NEXT_PUBLIC_LIVEKIT_URL } = process.env;
  const serverUrl = LIVEKIT_URL || NEXT_PUBLIC_LIVEKIT_URL;
  if (!LIVEKIT_API_KEY || !LIVEKIT_API_SECRET || !serverUrl) {
    return Response.json({ error: "Video calling is not configured on the server." }, { status: 503 });
  }
  if (!/^wss:\/\//i.test(serverUrl)) {
    return Response.json({ error: "The LiveKit URL must use the secure wss:// protocol." }, { status: 503 });
  }

  try {
    const body = await request.json() as { bookingId?: unknown };
    const bookingId = typeof body.bookingId === "string" ? body.bookingId.trim() : "";
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(bookingId)) {
      return Response.json({ error: "A valid booking ID is required." }, { status: 400 });
    }

    const bookingSnapshot = await getFirebaseAdminDb()
      .collection("therapy_bookings")
      .doc(bookingId)
      .get();

    if (!bookingSnapshot.exists) {
      return Response.json({ error: "This booking could not be found." }, { status: 404 });
    }

    const booking = bookingSnapshot.data();
    const isBookingParticipant = booking?.userId === auth.user.uid
      || booking?.therapistId === auth.user.uid;

    if (!isBookingParticipant) {
      return Response.json({ error: "You are not a participant in this session." }, { status: 403 });
    }
    if (booking?.status !== "confirmed") {
      return Response.json({ error: "The session must be confirmed before joining." }, { status: 409 });
    }

    // Room names are derived on the server; callers cannot request arbitrary rooms.
    const roomName = `tiif-booking-${bookingId}`;
    const token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity: auth.user.uid,
      name: auth.user.name || auth.user.email || auth.user.uid,
      ttl: "1h",
    });
    token.addGrant({ room: roomName, roomJoin: true, canPublish: true, canSubscribe: true });

    return Response.json({
      token: await token.toJwt(),
      roomName,
      serverUrl,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("LiveKit token request failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Unable to authorize this video session." }, { status: 500 });
  }
}
