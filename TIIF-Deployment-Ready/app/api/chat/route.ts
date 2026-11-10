import { getOpenAIClient } from "@/lib/openai/openai";
import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";
import { consumeRateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;

  const rate = consumeRateLimit(`stream-chat:${auth.user.uid}`, 20, 60_000);
  if (!rate.allowed) {
    return Response.json({ error: "Too many requests." }, {
      status: 429,
      headers: { "Retry-After": String(rate.retryAfterSeconds) },
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "AI is not configured on the server." }, { status: 503 });
  }

  try {
    const body = await request.json() as { prompt?: unknown };
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) return Response.json({ error: "Prompt is required." }, { status: 400 });
    if (prompt.length > 8_000) return Response.json({ error: "Prompt is too long." }, { status: 413 });

    const stream = await getOpenAIClient().responses.create({
      model: "gpt-5",
      input: prompt,
      stream: true,
    });
    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "response.output_text.delta") {
              controller.enqueue(encoder.encode(event.delta));
            }
          }
          controller.close();
        } catch {
          controller.error(new Error("The AI response stream failed."));
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Streaming AI request failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "AI could not respond right now." }, { status: 500 });
  }
}
