import { getOpenAIClient } from "@/lib/openai/openai";
import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";
import { consumeRateLimit } from "@/lib/server/rate-limit";
import { buildTwinContext } from "@/lib/ai/human-twin-context";
import { buildMemoryContext } from "@/lib/ai/memory-context";
import { getAgentById } from "@/features/ai-agents/data/agents";
import type { HumanTwinScoreSet } from "@/core/human-twin/score-engine";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  message?: unknown;
  history?: unknown[];
  twin?: unknown;
  memories?: unknown[];
  agentId?: unknown;
}

const SAFETY_NOTE = `

Support reflection and general wellbeing only. Do not diagnose, prescribe, or replace a qualified professional. If the person expresses imminent intent to harm themselves or others, encourage immediate contact with local emergency services and a trusted person. Do not imply that this service monitors emergencies.`;

export async function POST(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;

  const rate = consumeRateLimit(`ai-chat:${auth.user.uid}`, 20, 60_000);
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
    const body = await request.json() as ChatRequestBody;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) return Response.json({ error: "Message is required." }, { status: 400 });
    if (message.length > 8_000) return Response.json({ error: "Message is too long." }, { status: 413 });

    const rawHistory = (Array.isArray(body.history) ? body.history : [])
      .filter((item): item is ChatMessage =>
        !!item && typeof item === "object" &&
        (((item as ChatMessage).role === "user") || ((item as ChatMessage).role === "assistant")) &&
        typeof (item as ChatMessage).content === "string"
      )
      .slice(-10);
    let historyBudget = 16_000;
    const history = rawHistory.map((item) => {
      const content = item.content.slice(0, Math.min(3_500, historyBudget));
      historyBudget -= content.length;
      return { role: item.role, content };
    }).filter((item) => item.content.length > 0);

    // Client context is untrusted, user-provided reflection context—not verified system state.
    const scoreKeys: Array<keyof HumanTwinScoreSet> = [
      "identityScore", "growthScore", "wellbeingScore", "impactScore",
      "purposeScore", "relationshipScore", "resilienceScore",
    ];
    const safeTwin: Partial<HumanTwinScoreSet> = {};
    if (body.twin && typeof body.twin === "object") {
      for (const key of scoreKeys) {
        const value = (body.twin as Record<string, unknown>)[key];
        if (typeof value === "number" && Number.isFinite(value)) {
          safeTwin[key] = Math.max(0, Math.min(100, Math.round(value)));
        }
      }
    }
    const twinContext = Object.keys(safeTwin).length ? buildTwinContext(safeTwin) : null;

    const memoryTypes = new Set(["journal", "conversation", "assessment", "goal", "milestone", "reflection", "mood"]);
    const memories = (Array.isArray(body.memories) ? body.memories : [])
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .filter((item) => typeof item.type === "string" && memoryTypes.has(item.type)
        && typeof item.title === "string" && typeof item.content === "string")
      .slice(0, 15)
      .map((item) => ({
        type: String(item.type).slice(0, 30),
        title: String(item.title).slice(0, 160),
        content: String(item.content).slice(0, 1_000),
      }));
    const memoryContext = memories.length ? buildMemoryContext(memories) : null;

    const allowedAgentIds = new Set([
      "companion", "therapist", "coach", "career", "teacher", "parent",
      "relationship", "health", "finance", "mentor", "sleep", "identity",
      "nutrition", "habit",
    ]);
    const agentId = typeof body.agentId === "string" && allowedAgentIds.has(body.agentId)
      ? body.agentId
      : "companion";
    const agent = getAgentById(agentId);
    let systemContent = `${agent.systemPrompt}${SAFETY_NOTE}`;
    if (twinContext) systemContent += `

User-provided Human Twin context for reflection:
${twinContext}`;
    if (memoryContext) systemContent += `

User-provided recent context. Use only if relevant and avoid quoting private entries verbatim:
${memoryContext}`;

    const completion = await getOpenAIClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemContent },
        ...history,
        { role: "user", content: message },
      ],
    });

    return Response.json({ reply: completion.choices[0]?.message?.content ?? "I couldn't form a response just now." });
  } catch (error) {
    console.error("AI chat request failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "The AI Companion couldn't respond right now. Please try again." }, { status: 500 });
  }
}
