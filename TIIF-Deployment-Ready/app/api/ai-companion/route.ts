import { getOpenAIClient } from "@/lib/openai/openai";
import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";
import { consumeRateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;

  const rate = consumeRateLimit(`ai-companion:${auth.user.uid}`, 20, 60_000);
  if (!rate.allowed) {
    return Response.json({ error: "Too many requests. Please try again shortly." }, {
      status: 429,
      headers: { "Retry-After": String(rate.retryAfterSeconds) },
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "AI Companion is not configured on the server." }, { status: 503 });
  }

  try {
    const body = await request.json() as { message?: unknown };
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) return Response.json({ error: "Message is required." }, { status: 400 });
    if (message.length > 8_000) return Response.json({ error: "Message is too long." }, { status: 413 });

    const response = await getOpenAIClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are TIIF's reflective wellbeing companion. Support self-reflection and general wellbeing. Do not diagnose, prescribe, or replace qualified human professionals. For imminent danger, encourage immediate contact with local emergency services and a trusted person. Do not imply that this service monitors emergencies.",
        },
        { role: "user", content: message },
      ],
    });

    return Response.json({ message: response.choices[0]?.message?.content ?? "I couldn't respond just now." });
  } catch (error) {
    console.error("AI Companion request failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "The AI Companion couldn't respond right now." }, { status: 500 });
  }
}
