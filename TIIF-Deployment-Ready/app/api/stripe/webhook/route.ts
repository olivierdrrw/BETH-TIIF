import Stripe from "stripe";
import { getFirebaseAdminDb } from "@/lib/firebase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secretKey || !webhookSecret) {
    return Response.json({ error: "Stripe webhook is not configured." }, { status: 503 });
  }
  if (!signature) return Response.json({ error: "Missing Stripe signature." }, { status: 400 });

  const stripe = new Stripe(secretKey);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch {
    return Response.json({ error: "Invalid Stripe webhook signature." }, { status: 400 });
  }

  try {
    const db = getFirebaseAdminDb();
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const uid = session.metadata?.firebaseUid ?? session.client_reference_id;
      const planId = session.metadata?.planId;
      if (uid && planId && session.mode === "subscription") {
        await db.collection("users").doc(uid).set({
          plan: planId,
          subscriptionStatus: session.payment_status === "paid" ? "active" : "pending",
          stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
          stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : null,
          billingUpdatedAt: new Date().toISOString(),
        }, { merge: true });
      }
    } else if (event.type === "customer.subscription.deleted" || event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      const uid = subscription.metadata.firebaseUid;
      if (uid) {
        const active = ["active", "trialing"].includes(subscription.status);
        await db.collection("users").doc(uid).set({
          plan: active ? (subscription.metadata.planId ?? "free") : "free",
          subscriptionStatus: subscription.status,
          stripeSubscriptionId: subscription.id,
          billingUpdatedAt: new Date().toISOString(),
        }, { merge: true });
      }
    }
    return Response.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
