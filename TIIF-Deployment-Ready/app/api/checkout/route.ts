import Stripe from "stripe";
import { verifyFirebaseRequest } from "@/lib/auth/verify-firebase-request";
import { getFirebaseAdminAuth } from "@/lib/firebase/admin";
import { consumeRateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

const PRICE_ENV_BY_PLAN: Record<string, string> = {
  student: "STRIPE_PRICE_STUDENT",
  premium: "STRIPE_PRICE_PREMIUM",
  family: "STRIPE_PRICE_FAMILY",
  professional: "STRIPE_PRICE_PROFESSIONAL",
  therapist_pro: "STRIPE_PRICE_THERAPIST_PRO",
  school: "STRIPE_PRICE_SCHOOL",
  university: "STRIPE_PRICE_UNIVERSITY",
};

function getAppUrl(): URL | null {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_APP_URL ?? "");
    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const auth = await verifyFirebaseRequest(request);
  if (!auth.ok) return auth.response;

  const rate = consumeRateLimit(`checkout:${auth.user.uid}`, 5, 60 * 60_000);
  if (!rate.allowed) {
    return Response.json({ error: "Too many checkout attempts. Please try again later." }, {
      status: 429,
      headers: { "Retry-After": String(rate.retryAfterSeconds) },
    });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json({ error: "Payments are not configured on the server." }, { status: 503 });
  }

  const appUrl = getAppUrl();
  if (!appUrl) return Response.json({ error: "NEXT_PUBLIC_APP_URL must be a valid production HTTPS URL." }, { status: 503 });

  try {
    const body = await request.json() as { planId?: unknown };
    const planId = typeof body.planId === "string" ? body.planId : "";
    const envName = PRICE_ENV_BY_PLAN[planId];
    const priceId = envName ? process.env[envName] : undefined;
    if (!priceId) {
      return Response.json({ error: "This plan is not configured for checkout." }, { status: 400 });
    }

    const firebaseUser = await getFirebaseAdminAuth().getUser(auth.user.uid);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const successUrl = new URL("/dashboard?billing=pending", appUrl).toString();
    const cancelUrl = new URL("/pricing?checkout=cancelled", appUrl).toString();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: firebaseUser.email,
      client_reference_id: auth.user.uid,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { firebaseUid: auth.user.uid, planId },
      subscription_data: { metadata: { firebaseUid: auth.user.uid, planId } },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url) return Response.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout creation failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Unable to start checkout right now." }, { status: 500 });
  }
}
